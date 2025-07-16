"use client";

import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "@liveblocks/react";

import { useCallback, useEffect, useState } from "react";

import {
  CursorMode,
  CursorState,
  Reaction,
  ReactionEvent,
} from "@/types/type";

import LiveCursors from "./cursor/LiveCursors";
import CursorChat from "./cursor/CursorChat";
import ReactionSelector from "./reaction/ReactionButton";
import FlyingReaction from "./reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function Live({ canvasRef }: Props) {
  /* ─────────────────────────────────── Presence & state ─────────────────────────────────── */
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const [reactions, setReactions] = useState<Reaction[]>([]);
  const broadcast = useBroadcastEvent();

  /* ─────────────────────────────────── Helpers ─────────────────────────────────── */
  /** Remove old reactions every second */
  useInterval(() => {
    setReactions((r) => r.filter((rx) => rx.timestamp > Date.now() - 4000));
  }, 1000);

  /** While holding mouse in reaction mode, spam new reactions */
  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      const newReaction = {
        point: { x: cursor.x, y: cursor.y },
        value: cursorState.reaction,
        timestamp: Date.now(),
      };
      setReactions((r) => r.concat(newReaction));
      broadcast({ x: cursor.x, y: cursor.y, value: cursorState.reaction });
    }
  }, 100);

  /* ─────────────────────────────────── Liveblocks event listener ─────────────────────────────────── */
  useEventListener((e) => {
    const { x, y, value } = e.event as ReactionEvent;
    setReactions((r) =>
      r.concat({ point: { x, y }, value, timestamp: Date.now() })
    );
  });

  /* ─────────────────────────────────── Pointer handlers ─────────────────────────────────── */
  const positionFromEvent = (ev: React.PointerEvent) => {
    const rect = ev.currentTarget.getBoundingClientRect();
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (ev: React.PointerEvent) => {
      if (!cursor || cursorState.mode === CursorMode.ReactionSelector) return;
      const { x, y } = positionFromEvent(ev);
      updateMyPresence({ cursor: { x, y } });
    },
    [cursor, cursorState.mode, updateMyPresence]
  );

  const handlePointerDown = useCallback(
    (ev: React.PointerEvent) => {
      const { x, y } = positionFromEvent(ev);
      if (cursorState.mode === CursorMode.Reaction) {
        setCursorState((s) => ({ ...s, isPressed: true }));
      }
      updateMyPresence({ cursor: { x, y } });
    },
    [cursorState.mode, updateMyPresence]
  );

  const handlePointerUp = useCallback(() => {
    if (cursorState.mode === CursorMode.Reaction) {
      setCursorState((s) => ({ ...s, isPressed: false }));
    }
  }, [cursorState.mode]);

  const handlePointerLeave = useCallback(() => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, [updateMyPresence]);
  

  /* ─────────────────────────────────── Key shortcuts ─────────────────────────────────── */
  useEffect(() => {
    
    const onKeyUp = (e: KeyboardEvent) => {
      console.log("Key pressed:", e.key); // debug
      if (e.key === "/") {
        setCursorState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
        updateMyPresence({ cursor: { x: 100, y: 100 } });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") e.preventDefault();
    };
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  /* ─────────────────────────────────── Helpers ─────────────────────────────────── */
  const chooseReaction = useCallback((value: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction: value, isPressed: false });
  }, []);

  /* ─────────────────────────────────── Render ─────────────────────────────────── */
  return (
    <div className="relative w-full h-full">
      {/* Canvas gets all pointer events */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
    
      />

      {/* Overlays – don’t block clicks */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <LiveCursors others={others} />

        {reactions.map((r, i) => (
          <FlyingReaction
            key={`${r.timestamp}-${r.value}-${i}`}
            x={r.point.x}
            y={r.point.y}
            value={r.value}
            timestamp={r.timestamp}
          />
        ))}

        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}

        {cursorState.mode === CursorMode.ReactionSelector && (
          <div className="pointer-events-auto">
            <ReactionSelector setReaction={chooseReaction} />
          </div>
        )}
      </div>
    </div>
  );
}
