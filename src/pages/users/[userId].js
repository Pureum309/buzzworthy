import { useRouter } from "next/router";
import { ClipLoader } from 'react-spinners';

import Header from "../../../components/Header";
import useUser from "../../../hooks/useUser";
import UserHero from "../../../components/users/UserHero";
import UserBio from "../../../components/users/UserBio";
import PostFeed from "../../../components/posts/PostFeed";

export default function UserView() {
    const r = useRouter();
    const { userId } = r.query;

    const { data: fetchedUser, isLoading } = useUser(userId);

    if (isLoading || !fetchedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId} />
            <UserBio userId={userId}/>
            <PostFeed userId={userId} />
        </>
    )
}