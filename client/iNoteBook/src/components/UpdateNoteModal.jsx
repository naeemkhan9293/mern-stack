import React, { useContext, useState } from "react";
import "../css/UpdateNoteModal.css";
import noteContext from "../context/NoteContext";

function UpdateNoteModal(props) {
  const context = useContext(noteContext);
  const { editNote, modal, modalFunction } = context;
  const { note } = props;
  const [newnote, setNewNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, newnote.title, newnote.description, newnote.tag);
    modalFunction();
  };

  const onChangeHandler = (e) => {
    setNewNote({ ...newnote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="modal"
        style={modal === "block" ? { display: "none" } : { display: "block" }}
      >
        <div className="modal__content">
          <form>
            <label htmlFor="tile">Title</label>
            <input
              type="text"
              value={newnote.title}
              name="title"
              onChange={onChangeHandler}
            />
            <label htmlFor="tile">Description</label>
            <input
              type="text"
              value={newnote.description}
              name="description"
              onChange={onChangeHandler}
            />
            <label htmlFor="tile">Tag</label>
            <input
              type="text"
              value={newnote.tag}
              name="tag"
              onChange={onChangeHandler}
            />
          </form>
          <button type="submit" className="update__note" onClick={handleClick}>
            Update Note
          </button>
          <button
            className="update__note close__btn"
            onClick={() => {
              modalFunction();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateNoteModal;
