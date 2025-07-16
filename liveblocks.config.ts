import { LiveMap, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Create Liveblocks client
const client = createClient({
  throttle: 16,
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

// Presence type: synced state per user
type Presence = {
  cursor: { x: number; y: number } | null;
  cursorColor: string | null;
  editingtext: string | null;
};

// Storage type: persisted shared state across users
type Storage = {
  canvasObjects: LiveMap<string, any>;
  userState: LiveObject<Presence>;
};

// Optional metadata for each user (e.g., name, avatar)
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    avatar?: string;
  };
};

// Custom broadcast events
type RoomEvent = {}; // Add custom event types if needed

// Metadata attached to each comment thread
export type ThreadMetadata = {
  resolved: boolean;
  zIndex: number;
  x: number;
  y: number;
  [key: string]: string | number | boolean;
};

// Create Liveblocks room context with your types
const {
  suspense: liveblocks,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client, {
  async resolveUsers({ userIds }) {
    return []; // implement if using mentions/comments
  },
  async resolveMentionSuggestions({ text, roomId }) {
    return []; // implement if using mentions/comments
  },
});
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client, {
  async resolveUsers({ userIds }) {
    // Used only for Comments. Return a list of user information retrieved
    // from `userIds`. This info is used in comments, mentions etc.

    // const usersData = await __fetchUsersFromDB__(userIds);
    //
    // return usersData.map((userData) => ({
    //   name: userData.name,
    //   avatar: userData.avatar.src,
    // }));

    return [];
  },
  async resolveMentionSuggestions({ text, roomId }) {
    // Used only for Comments. Return a list of userIds that match `text`.
    // These userIds are used to create a mention list when typing in the
    // composer.
    //
    // For example when you type "@jo", `text` will be `"jo"`, and
    // you should to return an array with John and Joanna's userIds:
    // ["john@example.com", "joanna@example.com"]

    // const userIds = await __fetchAllUserIdsFromDB__(roomId);
    //
    // Return all userIds if no `text`
    // if (!text) {
    //   return userIds;
    // }
    //
    // Otherwise, filter userIds for the search `text` and return
    // return userIds.filter((userId) =>
    //   userId.toLowerCase().includes(text.toLowerCase())
    // );

    return [];
  },
});