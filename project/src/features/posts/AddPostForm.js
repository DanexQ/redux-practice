import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import React from "react";

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const canSave = formData.title && formData.content && formData.userId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(addPost(formData.title, formData.content, formData.userId));
      setFormData({
        title: "",
        content: "",
        userId: "",
      });
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
        <label htmlFor="content">Content:</label>
        <textarea
          type="text"
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        />
        <button disabled={!canSave}>Submit</button>
      </form>
    </div>
  );
};

export default AddPostForm;
