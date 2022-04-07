import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Modal from "./components/Modal";
export default function CreatePost() {
  const [modalToggle, setModalToggle] = useState(false);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "?",
          content: editorRef.current.getContent(),
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

  return (
    <div>
      <Modal showModal={showModal} modalToggle={modalToggle} />
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      <p>TEST</p>
      <button onClick={showModal}>Create Post</button>
      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
}
