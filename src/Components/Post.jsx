import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPost,
  deletePost,
  setEdit,
  updatePost,
} from "../redux/feature/PostSlice";
const Post = () => {
  const [id, setId] = useState();
  const [textBody, sertTextBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  //
  useEffect(() => {
    if (body) {
      sertTextBody(body);
    }
  }, [body]);

  //function
  const handleFatchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please Provide Post Id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  //delete post
  const handleDeleteData = () => {
    dispatch(deletePost({ id: post[0].id }));
    window.alert("post deleted");
  };
  return (
    <>
      <div className=" mt-4 d-flex align-items-center justify-content-center">
        <div className="col-md-8">
          <form action="">
            <div className="mb-3">
              <label className="form-label">Search By ID:</label>
              <input
                type="number"
                className="form-control"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleFatchData}
            >
              Fetch Post
            </button>
            <button
              type="submit"
              onClick={() => navigate("/createpost")}
              className="btn btn-warning ms-4"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            {post.length > 0 && (
              <div className="container">
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <div className="form-floating mt-3">
                          <textarea
                            className="form-control"
                            id="floating"
                            value={textBody}
                            onChange={(e) => sertTextBody(e.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-end justify-content-end mt-3">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            UPDATE
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            onClick={() => {
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                          className="btn btn-primary"
                        >
                          EDIT
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDeleteData}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Post;
