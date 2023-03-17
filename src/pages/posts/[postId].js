import { useRouter } from "next/router";
import { ClipLoader } from 'react-spinners';
import Form from "../../../components/Form";

import Header from "../../../components/Header";
import PostItem from "../../../components/posts/PostItem";

import usePost from "../../../hooks/usePost";
import CommentFeed from "../../../components/posts/CommentFeed";

export default function PostView() {
    const r = useRouter();
    const { postId } = r.query;

    const { data: fetchedPost, isLoading } = usePost(postId);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label="Posts" />
            <PostItem data={fetchedPost} />
            <Form
                postId={postId}
                isComment
                placeholder="Reply on the post"
            />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    )
}
