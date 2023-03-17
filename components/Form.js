import { useCallback, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

import useCurrentUser from "../hooks/useCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import usePosts from "../hooks/usePosts";
import usePost from "../hooks/usePost";
import useRegisterModal from "../hooks/useRegisterModal"
import Avatar from "./Avatar";
import Button from "./Button";


export default function Form({
    placeholder, isComment, postId
}) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId);

    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

            await axios.post(url, { body });

            toast.success('Your posts created');
            
            setBody('');
            mutatePosts();
            mutatePost();

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false)
        }
    },[mutatePosts, body, isComment, postId, mutatePost]);

    return (
        <div className="bg-blue-900 border-neutral-800 px-5 py-5 m-3 mt-10 mb-5 rounded-xl">
            { currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser?.id} />
                    </div>
                    <div  className="w-full">
                        <textarea
                             disabled={isLoading}
                             onChange={(e) => setBody(e.target.value)}
                             value={body}
                             className="
                               disabled:opacity-80
                               peer
                               resize-none 
                               mt-3 
                               w-full 
                               bg-blue-900 
                               ring-0 
                               outline-none 
                               text-[20px] 
                               placeholder-black 
                               text-black
                             "
                             placeholder={placeholder}
                        >
                        </textarea>
                        <hr 
                            className="
                            opacity-0 
                            peer-focus:opacity-100 
                            h-[1px] 
                            w-full 
                            border-neutral-300 
                            transition"
                        />
                        <div className="mt-4 flex flex-row justify-end">
                            <Button 
                                disabled={isLoading || !body} 
                                onClick={onSubmit} 
                                label="Post"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 className="text-black text-2xl text-center mb-4 font-bold">Welcome to Buzzworthy!</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button 
                            label="Login" 
                            onClick={loginModal.onOpen} 
                        />
                        <Button 
                            label="Register" 
                            onClick={registerModal.onOpen} 
                            secondary 
                        />
                    </div>
                </div>
            )}
        </div>
    )
}