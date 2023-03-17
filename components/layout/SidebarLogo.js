import { useRouter } from 'next/router';
import { FaBloggerB } from "react-icons/fa";

export default function SidebarLogo() {
    const r = useRouter();

    return(
        <div 
            onClick={() => r.push('/')}
        className="
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            hover:bg-blue-300
            hover:bg-opacity-30
            cursor-pointer
            transition
        ">
            <FaBloggerB size={28} color="#49393B" />
        </div>
    )
}