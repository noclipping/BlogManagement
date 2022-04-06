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

  return (
    <div
      key={post._id}
      class="post-backdrop"
      style={{ backgroundImage: `url("https://i.imgur.com/nhX3VEW.jpeg")` }}
    >
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={() => updatePublished()}
        />
        <span className="slider round"></span>
      </label>
      {post.title}
      {post.content}
    </div>
  );
}
