import { useSelector } from "react-redux";
import { getPostsError, getPostsStatus, selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import React from "react";

const PostsList = () => {
  const orderedPostsIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return <div>{content}</div>;
};

export default PostsList;
