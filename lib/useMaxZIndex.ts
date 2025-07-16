import { useMemo } from "react";
import { useThreads } from "@/liveblocks.config";

// Returns the highest z-index of all threads
export const useMaxZIndex = () => {
  const { threads } = useThreads();

  return useMemo(() => {
    if (!threads) return 0; // Handle undefined case

    let max = 0;

    for (const thread of threads) {
      const zIndex = (thread.metadata as any)?.zIndex;

      if (typeof zIndex === "number" && zIndex > max) {
        max = zIndex;
      }
    }

    return max;
  }, [threads]);
};
