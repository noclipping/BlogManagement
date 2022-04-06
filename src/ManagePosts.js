import React, { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

export default function ManagePosts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      });
  }, []);
  const comps = posts
    ? posts.map((post) => {
        return <PostCard post={post} key={post._id} checked={post.published} />;
      })
    : "";

  //   const comps = posts
  //     ? posts.map((post) => {
  //         return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
  //       })
  //     : "";
  //   return (
  return (
    <div>
      <br />
      <div>Manage Posts</div>
      <br /> <hr /> <br />
      {comps}
    </div>
  );
}
