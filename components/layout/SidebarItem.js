import { useRouter } from "next/router";
import { useCallback } from "react"
import useCurrentUser from "../../hooks/useCurrentUser";

import useLoginModal from '../../hooks/useLoginModal'

export default function SidebarItem({
    label,
    href,
    icon: Icon,
    onClick,
    auth
}) {

    const { data: currentUser } = useCurrentUser();
    const r = useRouter();
    const loginModal = useLoginModal();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        }
        if (auth && !currentUser) {
            loginModal.onOpen();
        }else if (href) {
            r.push(href)
        }
    }, [r, href, auth, loginModal, onClick, currentUser]);

    return(
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="
               relative
               rounded-full 
               h-14
               w-14
               flex
               items-center
               justify-center 
               p-4
               hover:bg-slate-300 
               hover:bg-opacity-30 
               cursor-pointer 
               lg:hidden
            ">
                <Icon size={28} color="#49393B" />
            </div>
            <div className="
                relative
                hidden 
                lg:flex 
                items-row 
                gap-4 
                p-4 
                rounded-full 
                hover:bg-slate-300 
                hover:bg-opacity-30 
                cursor-pointer
                items-center
            ">
                <Icon size={28} color="#49393B" />
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    )
}
