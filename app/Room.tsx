"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveMap, LiveObject } from "@liveblocks/client";
// import Loader from "@/components/Loader";
import { Loader } from "lucide-react";
export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey="pk_dev_Ox7pOyp6dJppDJYux6skN7wQYPUzrKZt8aYeIzj6vqtzg2eWiXP0OJIP5eyzIpWq"
    >
      <RoomProvider
        id="my-room"
        initialPresence={{
          cursor: null,
          cursorColor: null,
          editingtext: null,
      }}
    
        initialStorage={() => ({
          canvasObject: new LiveMap(),
          userState: new LiveObject({
            cursor: null,
            cursorColor: null,
            editingtext: null,
          }),
        })}
      >
        <ClientSideSuspense fallback={<Loader/>}>
          {()=>children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
