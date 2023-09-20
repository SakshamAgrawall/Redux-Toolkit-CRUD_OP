import React, { useState } from "react";
import { createPost } from "../redux/feature/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { loading, post } = useSelector((state) => ({ ...state.app }));
  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle post function
  const handleCreateData = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  //show created post

  const showCreatedPost = () => {
    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h5 className="card-title">{post[0].title}</h5>
            <p className="card-text">{post[0].body}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h1 className="text-center bg-dark text-white p-2">Create Post</h1>
      <div className="container">
        <form action="">
          <div className="mt-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              className="form-control"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-floating mt-3">
            <textarea
              className="form-control"
              id="floating"
              placeholder="Describe"
              value={body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
            />
            <label htmlFor="floatingTextarea">Enter Description</label>
          </div>
          <div className="d-flex align-items-end justify-content-center m-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              GO HOME
            </button>
            <button className="btn btn-danger ms-4" onClick={handleCreateData}>
              SAVE
            </button>
          </div>
        </form>
        <div>{showPost && <>{showCreatedPost()}</>}</div>
      </div>
    </>
  );
};

export default CreatePost;
