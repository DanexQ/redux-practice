import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostsByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";

const SingleUserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postByUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  const renderedPosts = postByUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  console.log(postByUser);

  return (
    <div>
      <h2>{user?.name}</h2>
      <ul>{renderedPosts}</ul>
    </div>
  );
};

export default SingleUserPage;
