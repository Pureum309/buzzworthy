import CommentItem from "./CommentItem"

export default function CommentFeed({ comments }) {
    return (
        <>
            {comments?.map((comment) => (
                <CommentItem key={comment.id} data={comment} />
            ))}
        </>
    )
}