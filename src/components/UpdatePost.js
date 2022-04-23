import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "./Modal";
import { useParams, useNavigate } from "react-router-dom";
import { domain } from "../constants";

export default function UpdatePost() {
  const navigate = useNavigate();
  const [modalToggle, setModalToggle] = useState(false);
  const [initialState, setInitialState] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      fetch(`${domain}api/post/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setInitialState(res[0].content);
          setIsEditing(true);
        });
    }
  }, []);
  const editorRef = useRef(null);
  const log = (author, title) => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      console.log("affirm");
      fetch(`${domain}api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: editorRef.current.getContent(),
          author: author,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  useEffect(() => {}, []);
  const showModal = function () {
    setModalToggle(!modalToggle);
  };
  const updatePost = function () {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      fetch(`${domain}api/post/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editorRef.current.getContent(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPostUpdated(true);
          setTimeout(() => {
            navigate("/manage-posts");
          }, 2000);
        });
    }
  };

  return (
    <div>
      <div>
        {postUpdated ? <div className="postUpdated">Post updated!</div> : ""}
      </div>
      <div style={{ backgroundColor: "black" }}>
        {isEditing ? "editing mode" : ""}
      </div>
      <Modal showModal={showModal} modalToggle={modalToggle} submitPost={log} />
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialState}
        apiKey={process.env.REACT_APP_API_KEY}
        init={{
          skin: "oxide-dark",
          content_css: "dark",
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "codesample",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | codesample",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <a className="button1" onClick={showModal}>
        Update Post
      </a>
    </div>
  );
}
