// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
import { LiveMap,LiveObject,createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
const client=createClient({
  publicApiKey:process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
})
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
      cursor: { x: number; y: number } | null;
      cursorColor: string | null;
      editingtext: string | null;
    };
    

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      canvasObject: LiveMap<string, any>;
      userState: LiveObject<{
        cursor: { x: number; y: number } | null;
        cursorColor: string | null;
        editingtext: string | null;
      }>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        // name: string;
        // avatar: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
      // Example has two events, using a union
      // | { type: "PLAY" } 
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}
// declare global {
//   interface Liveblocks {
//     Presence: {
//       cursor: { x: number; y: number } | null;
//       cursorColor: string | null;
//       editingtext: string | null;
//     };

//     Storage: {
//       canvasObject: LiveMap<string, any>;
//       userState: LiveObject<{
//         cursor: { x: number; y: number } | null;
//         cursorColor: string | null;
//         editingtext: string | null;
//       }>;
//     };

//     UserMeta: {
//       id: string;
//       info: {
//         name?: string;
//         avatar?: string;
//       };
//     };

//     RoomEvent: {}; // define if needed
//     ThreadMetadata: {};
//     RoomInfo: {};
//   }
// }
export {};
