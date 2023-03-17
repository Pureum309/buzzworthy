import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useUser from "../hooks/useUser"

export default function Avatar({ userId, isLarge, hasBorder }) {
    const r = useRouter();
    const { data: fetchedUser } = useUser(userId);

    const onClick = useCallback((e) => {
        e.stopPropagation();

        const url = `/users/${userId}`;
        
        r.push(url);

    }, [r, userId])

    return (
         <div
            className={`
                ${hasBorder ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                rounded-full 
                hover:opacity-90 
                transition 
                cursor-pointer
                relative
            `}>
            <Image
                fill
                style={{
                objectFit: 'cover',
                borderRadius: '100%'
                }}ß
                alt="Avatar"
                onClick={onClick}
                src={fetchedUser?.profileImage || '/images/placeholder.jpeg'}
            />
        </div>
    )
}