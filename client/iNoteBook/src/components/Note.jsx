import React, { useContext, useEffect } from "react";
import noteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

import "../css/Note.css";

function Note() {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* Note container to show note to the user*/}
      <section className="Note__container">
        <h3>Your Notes</h3>
        <div className="notesItem__container">
          {notes.length === 0
            ? "Note display"
            : notes.map((note, index) => {
                return <NoteItem key={note._id} note={note} />;
              })}
        </div>
      </section>
    </>
  );
}

export default Note;
