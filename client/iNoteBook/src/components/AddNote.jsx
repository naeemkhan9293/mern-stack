import React, { useState, useContext } from "react";
import "../css/AddNote.css";
import NoteContext from "../context/NoteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form>
        <div className="heading__container"></div>
        <div className="textarea__container">
          <h3 className="textform__heading">Enter the description below </h3>
          <input
            type="text"
            name="title"
            onChange={onChange}
            className="note__titile"
            placeholder="Enter title here"
          />
          <h3 className="textform__heading">Enter description below </h3>
          <textarea
            cols="30"
            rows="10"
            name="description"
            placeholder="Enter Description Here"
            onChange={onChange}
          ></textarea>
        </div>
      </form>
      <div className="btn__conatiner">
        <button className="btn" onClick={handleClick}>
          Add Note
        </button>
      </div>
    </>
  );
}

export default AddNote;
