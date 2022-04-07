import React, { useEffect, useState } from "react";

export default function Modal(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: `${props.modalToggle ? "block" : "none"}` }}
    >
      <div
        className="modal-content"
        style={{ maxWidth: "20%", minWidth: "300px" }}
      >
        <div>
          <h1 style={{ border: "1px solid white", marginLeft: "20px" }}>
            Complete Post
            <span className="close" onClick={props.showModal}>
              &times;
            </span>
          </h1>
          <form>
            <label>Title</label>
            <br />
            <input
              id="title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <br />
            <label>Author</label>
            <br />
            <input
              id="author"
              name="author"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </form>
          <br />
          <a
            className="button1"
            onClick={(e) => props.submitPost(author, title)}
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
}
