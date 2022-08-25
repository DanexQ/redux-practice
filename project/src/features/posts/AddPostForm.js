import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addPost } from "./postsSlice";
import React from "react";

export const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitForm = () => {
    if (formData.title && formData.content) {
      addPost({
        id: nanoid(),
        title: formData.title,
        content: formData.content,
      });
      setFormData({
        title: "",
        content: "",
      });
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
