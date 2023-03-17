import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function Header({
    label,
    showBackArrow
}) {
    const r = useRouter();

    const handleBack = useCallback(() => {
        r.back();
    },[r])
 
        return (
            <>
                <div className="border-b-[1px] border-neutral-800 p-5">
                    <div className="flex flex-row items-center gap-2">
                        {showBackArrow && (
                            <BiArrowBack 
                                onClick={handleBack} 
                                color="#1EA0AE" 
                                size={25}
                                stroke-width={1} 
                                className="
                                cursor-pointer 
                                hover:opacity-70 
                                transition
                            "/>
                        )}
                    <h1 className="text-blue-800 text-xl font-semibold">
                        {label}
                    </h1>
                    </div>
                </div>
            </>
    )
}
