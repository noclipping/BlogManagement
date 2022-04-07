import React, { useEffect, useState } from "react";

export default function PostCard(props) {
  const post = props.post;
  const [checked, setChecked] = useState(props.checked);
  useEffect(() => {}, []);

  function updatePublished() {
    setChecked(!checked);
    fetch("http://localhost:3000/api/post/publish", {
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
  const theStyle = {
    content: "",
    backgroundImage: 'url("https://i.imgur.com/nhX3VEW.jpeg")',
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
      class="post-backdrop"
      style={{
        // backgroundImage: `url("https://i.imgur.com/nhX3VEW.jpeg")`,
        // opacity: "0.5",
        position: "relative",
      }}
    >
      <div style={theStyle}></div>
      <p style={{ display: "inline", position: "relative" }}>Publish : </p>
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={() => updatePublished()}
        />
        <span className="slider round"></span>
      </label>
      <span style={{ position: "relative" }}>
        {post.title}
        {post.content}
      </span>
    </div>
  );
}
