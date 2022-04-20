import React from "react";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/newpost"> Create Post</Link>
        </li>
        <li>
          <Link to="/manage-posts">Manage Posts</Link>
        </li>
      </ul>
    </div>
  );
}
