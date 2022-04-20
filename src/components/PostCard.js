import { findByLabelText } from "@testing-library/react";
import { hover } from "@testing-library/user-event/dist/hover";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { domain } from "../constants";
export default function PostCard(props) {
  const post = props.post;
  const [checked, setChecked] = useState(props.checked);
  useEffect(() => {}, []);

  function updatePublished() {
    setChecked(!checked);
    fetch(`${domain}api/post/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post._id,
        published: !checked,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }
  function deletePost() {
    fetch(`${domain}api/post/delete/${post._id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        props.deletePost(post._id);
      });
  }
  const theStyle = {
    content: "",
    display: "flex",
    justifyContent: "space-between",
    backgroundImage: `url(${post.imgURL})`,
    backgroundSize: "cover",
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    opacity: 0.35,
  };
  return (
    <div
      key={post._id}
      className="post-backdrop"
      style={{
        // backgroundImage: `url("https://i.imgur.com/nhX3VEW.jpeg")`,
        // opacity: "0.5",
        position: "relative",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div style={theStyle}></div>
      {/* <p style={{ display: "inline", position: "relative" }}>Publish : </p> */}
      <div style={{ position: "relative" }}>
        Publish:
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => updatePublished()}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <span style={{ position: "relative" }}>{post.title}</span>

      <div>
        <button
          onClick={(e) => {
            deletePost();
          }}
          style={{
            position: "relative",
            height: "fill",
            backgroundColor: "red",
            textDecoration: "none",
            border: "none",
            height: "30px",
            border: "solid 1px white",
            cursor: "pointer",
            color: "white",
            borderRadius: "5px",
            marginRight: "20px",
          }}
        >
          DELETE
        </button>
        <Link
          to={`/${post._id}`}
          style={{
            position: "relative",
            height: "fill",
            backgroundColor: "green",
            textDecoration: "none",
            border: "none",
            height: "30px",
            border: "solid 1px white",
            cursor: "pointer",
            color: "white",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          EDIT
        </Link>
      </div>
    </div>
  );
}
