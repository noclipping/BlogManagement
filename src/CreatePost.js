import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "./components/Modal";
import { useParams } from "react-router-dom";
export default function CreatePost() {
  const [modalToggle, setModalToggle] = useState(false);
  const [initialState, setInitialState] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      fetch(`http://localhost:3000/api/post/${params.id}`)
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
      fetch("http://localhost:3000/api/post/create", {
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
      fetch(`http://localhost:3000/api/post/update/${params.id}`, {
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
        });
    }
  };

  return (
    <div>
      <div>{params.id}</div>
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
      {!isEditing ? (
        <a className="button1" onClick={showModal}>
          Create Post
        </a>
      ) : (
        <a className="button1" onClick={updatePost}>
          Update Post
        </a>
      )}
      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
}
