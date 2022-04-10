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
  const deletePost = function (id) {
    setPosts((prev) => {
      const newArry = prev.filter((e) => (e._id === id ? false : true));
      return newArry;
    });
    console.log(posts);
  };
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
      <button onClick={deletePost}>press</button>
      <br /> <hr /> <br />
      {posts
        ? posts.map((post) => {
            return (
              <PostCard
                deletePost={deletePost}
                post={post}
                key={post._id}
                checked={post.published}
              />
            );
          })
        : ""}
    </div>
  );
}
