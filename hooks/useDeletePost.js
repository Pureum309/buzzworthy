import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useDeletePost = ({ postId, userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const isDeleted = useMemo(() => {
    const list = fetchedPost?.deleted || false;

    return list;
  }, [fetchedPost, currentUser]);

  const toggleDelete = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isDeleted) {
        request = () => axios.delete('/api/delete', { data: { postId } });
      } else {
        request = () => axios.post('/api/delete', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Delete Succeed');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isDeleted, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);

  return {
    isDeleted,
    toggleDelete,
  };
};

export default useDeletePost;
