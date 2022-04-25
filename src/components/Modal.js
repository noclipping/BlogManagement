import React, { useEffect, useState } from 'react'
import { domain } from '../constants'
export default function Modal(props) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [imgURL, setimgURL] = useState('')
    const [errors, setErrors] = useState('')
    const [description, setDescription] = useState('')
    function submitAndValidateInfo() {
        if (!title.length > 0) {
            setErrors('Title empty!')
        } else if (!author.length > 0) {
            setErrors('Author is empty!')
        } else {
            setErrors('')
            // THIS IS WHERE THE SUBMISSION HAPPENS
            props.submitPost(author, title, imgURL, description)
        }
    }
    return (
        <div
            id="myModal"
            className="modal"
            style={{ display: `${props.modalToggle ? 'block' : 'none'}` }}
        >
            <div
                className="modal-content"
                style={{ maxWidth: '20%', minWidth: '300px' }}
            >
                <div>
                    <h1
                        style={{
                            border: '1px solid white',
                            marginLeft: '20px',
                        }}
                    >
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
                                setTitle(e.target.value)
                            }}
                        ></input>
                        <br />
                        <label>Author</label>
                        <br />
                        <input
                            id="author"
                            name="author"
                            onChange={(e) => {
                                setAuthor(e.target.value)
                            }}
                        />
                        <br />
                        <label>Description</label>
                        <br />
                        <input
                            id="description"
                            name="description"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                        <br />
                        <label>Image URL (optional)</label>
                        <br />
                        <input
                            id="imgURL"
                            name="imgURL"
                            onChange={(e) => {
                                setimgURL(e.target.value)
                            }}
                        />
                    </form>
                    <br />

                    <div style={{ color: 'red' }}>{errors ? errors : ''}</div>
                    <a
                        className="button1"
                        onClick={(e) => submitAndValidateInfo()}
                    >
                        Submit
                    </a>
                </div>
            </div>
        </div>
    )
}
