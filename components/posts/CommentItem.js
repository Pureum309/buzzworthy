import { useRouter } from "next/router"
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from "../Avatar";

import { BsArrowReturnRight } from "react-icons/bs";

export default function CommentItem({ data }) {
    const r = useRouter();

    const goToUser = useCallback((e) => {
        e.stopPropagation();

        r.push(`/users/${data.user.id}`)
    },[r, data.user.id])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt])

    return (
        <div
            className="
                bg-pink-200
                border-[2px]
                rounded-xl
                border-neutral-800
                p-5
                m-3
        ">
            <div className="flex flex-row items-start gap-3">
                <BsArrowReturnRight size={20} color="#2A6579" stroke-width={1.5} />
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
                        ">
                            {data.user.name}
                        </p>
                        <span 
                        onClick={goToUser} 
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                            hidden
                            md:block
                        ">
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-800 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}