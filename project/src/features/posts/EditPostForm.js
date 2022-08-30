import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { selectPostById, updatePost, deletePost } from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [formData, setFormData] = useState({
    title: post?.title,
    body: post?.body,
    userId: post?.userId,
  });
  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post)
    return (
      <section>
        <h2>POST NOT FOUND</h2>
      </section>
    );

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave =
    [formData.title, formData.body, formData.userId].every(Boolean) &&
    requestStatus === "idle";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({ ...formData, reactions: post.reactions, id: post.id })
        ).unwrap();
        setFormData({
          title: "",
          body: "",
          userId: "",
        });
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("ERROR WITH EDITING POST", err.message);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClick = () => {
    try {
      dispatch(deletePost({ id: post.id })).unwrap();
      setFormData({
        title: "",
        body: "",
        userId: "",
      });
      navigate(`/`);
    } catch (err) {
      console.log(err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <div>
      <h1>Add a new post</h1>
      <label htmlFor="title">Title:</label>
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="userId">User:</label>
        <select
          name="userId"
          defaultValue={formData.userId}
          onChange={handleChange}
        >
          <option value="">--Choose user--</option>
          {usersOption}
        </select>
        <label htmlFor="body">Content:</label>
        <textarea
          type="text"
          name="body"
          placeholder="Content"
          value={formData.body}
          onChange={handleChange}
        />
        <button disabled={!canSave}>Submit</button>
        <button className="deleteButton" onClick={onDeletePostClick}>
          Delete Post
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
