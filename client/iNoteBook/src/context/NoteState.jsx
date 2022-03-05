import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);
  const [modal, setModal] = useState("block");

  const modalFunction = () => {
    modal === "block" ? setModal("none") : setModal("block");
  };

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    setNotes(notes.concat({ title, description, tag }));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // Api call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // Handle note on client side
    const newNote = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNote);
  };

  // ________________________________
  // Add a Note
  const editNote = async (id, title, description, tag) => {
    // Api call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // console.log({ id,title, description, tag });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        modal,
        modalFunction,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
