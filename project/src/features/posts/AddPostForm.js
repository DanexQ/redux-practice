import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canSave =
    [formData.title, formData.body, formData.userId].every(Boolean) &&
    addRequestStatus === "idle";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost(formData)).unwrap();
        setFormData({
          title: "",
          body: "",
          userId: "",
        });
        navigate("/");
      } catch (err) {
        console.log("Error with saving the post", err.message);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
        <select name="userId" value={formData.userId} onChange={handleChange}>
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
      </form>
    </div>
  );
};

export default AddPostForm;
