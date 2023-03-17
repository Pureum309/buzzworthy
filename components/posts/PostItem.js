import { useRouter } from "next/router"
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from 'date-fns';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { FaTrash } from "react-icons/fa";

import useCurrentUser from "../../hooks/useCurrentUser";
import useLoginModal from "../../hooks/useLoginModal";
import Avatar from '../Avatar';
import useLike from "../../hooks/useLike";
import useDeletePost from "../../hooks/useDeletePost";

export default function PostItem({ data, userId }) {
    const r = useRouter();
    const loginModal = useLoginModal();
  
    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
    const { isDeleted, toggleDelete } = useDeletePost({ postId: data.id, userId });
  
    const isMyPost = (data.user.id === currentUser?.id) || false;

    const goToUser = useCallback((e) => {
      e.stopPropagation();

      r.push(`/users/${data.user.id}`)
    }, [r, data.user.id]);
  
    const goToPost = useCallback(() => {
      r.push(`/posts/${data.id}`);
    }, [r, data.id]);
    
    const onLike = useCallback((e) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        toggleLike()
    },[loginModal, currentUser, toggleLike])

    const onDelete = useCallback((e) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        toggleDelete()
    },[loginModal, currentUser, toggleDelete])

    const createdAt = useMemo(() => {
        if(!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt])

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart
      

    return ( !isDeleted &&
        <div 
            onClick={goToPost}
            className="
            cursor-pointer  
            bg-pink-100

            border-[2px]
            border-neutral-800
            rounded-xl
            p-5
            m-3 
            
            hover:bg-neutral-100 
            transition
        ">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p
                            onClick={goToUser} 
                            className="
                                text-white
                                font-semibold
                                cursor-pointer
                                hover:underline
                            "
                        >{data.user.name}</p>
                        <span 
                            onClick={goToUser} 
                            className="
                              text-neutral-500
                              cursor-pointer
                              hover:underline
                              hidden
                              md:block
                        ">
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div 
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-blue-800
                        ">
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comments?.length || 0}
                            </p>
                        </div>
                        <div 
                            onClick={onLike}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-red-500
                        ">
                            <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
                            <p>
                                {data.likedIds.length}
                            </p>
                        </div>
                        <div 
                            onClick={onDelete}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-blue-800
                        ">
                            {isMyPost && 
                            <FaTrash size={20} />
                            }
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}
