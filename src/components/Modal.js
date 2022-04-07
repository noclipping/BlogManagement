import React, { useEffect } from "react";

export default function Modal(props) {
  return (
    <div
      id="myModal"
      class="modal"
      style={{ display: `${props.modalToggle ? "block" : "none"}` }}
    >
      <div class="modal-content">
        <span class="close" onClick={props.showModal}>
          &times;
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
}
