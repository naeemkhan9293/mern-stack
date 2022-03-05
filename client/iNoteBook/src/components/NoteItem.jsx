import React, { useContext } from "react/cjs/react.development";
import noteContext from "../context/NoteContext";
import "../css/NoteItem.css";
import UpdateNoteModal from "./UpdateNoteModal";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote,modalFunction } = context;

  const { note } = props;
  return (
    <>
      <UpdateNoteModal note={note} />
      <div className="notes__container">
        <div className="notes__info">
          <h4>{note.title}</h4>
          <p>{note.description}</p>
        </div>
        <div className="btn__container">
          <button
            onClick={() => {
              modalFunction();
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteNote(note._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
