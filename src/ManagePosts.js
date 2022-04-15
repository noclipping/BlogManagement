import React, { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import { domain } from "./constants";
export default function ManagePosts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch(`${domain}api/posts`)
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
  };
  return (
    <div>
      <br />
      <div>Manage Posts</div>
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
