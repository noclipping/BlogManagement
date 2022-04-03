import React from "react";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/BlogManagement/"> Create Post</Link>
        </li>
        <li>
          <Link to="/BlogManagement/manage-posts">Manage Posts</Link>
        </li>
      </ul>
    </div>
  );
}
