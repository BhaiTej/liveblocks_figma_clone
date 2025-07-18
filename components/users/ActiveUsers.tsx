"use client";

import { useMemo } from "react";

import { generateRandomName } from "@/lib/utils";
import { useOthers,useSelf } from "@liveblocks/react";

import Avatar from "./Avatar";
import styles from './index.module.css'

// const ActiveUsers = () => {
//   /**
//    * useOthers returns the list of other users in the room.
//    *
//    * useOthers: https://liveblocks.io/docs/api-reference/liveblocks-react#useOthers
//    */
//   const others = useOthers();

//   /**
//    * useSelf returns the current user details in the room
//    *
//    * useSelf: https://liveblocks.io/docs/api-reference/liveblocks-react#useSelf
//    */
//   const currentUser = useSelf();

//   // memoize the result of this function so that it doesn't change on every render but only when there are new users joining the room
//   const memoizedUsers = useMemo(() => {
//     const hasMoreUsers = others.length > 2;

//     return (
//       <div className='flex items-center justify-center gap-1'>
//         {currentUser && (
//           <Avatar name='You' otherStyles='border-[3px] border-primary-green' />
//         )}

//         {others.slice(0, 2).map(({ connectionId }) => (
//           <Avatar
//             key={connectionId}
//             name={generateRandomName()}
//             otherStyles='-ml-3'
//           />
//         ))}

//         {hasMoreUsers && (
//           <div className='z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black'>
//             +{others.length - 2}
//           </div>
//         )}
//       </div>
//     );
//   }, [others.length]);

//   return memoizedUsers;
// };
const ActiveUsers=()=> {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 2;
  const memoizedUsers=useMemo(()=>{
    return(
      <main className="flex w-full select-none place-content-center place-items-center gap-1 py-2 ">
      <div className="flex pl-3">
        {currentUser && (
          // <div className="relative ml-8 first:ml-0">
            <Avatar name="You" otherStyles='border-[3px] border-primary-green' />
          // </div>
        )}
        {users.slice(0, 2).map(({ connectionId}) => {
          return (
            <Avatar key={connectionId}  name={generateRandomName()} otherStyles='
            -ml-3' />
          );
        })}

        {hasMoreUsers && <div className={styles.more}>+{users.length - 2}</div>}

        
      </div>
    </main>
    )
  },[users.length])
  return memoizedUsers;
}
export default ActiveUsers;
