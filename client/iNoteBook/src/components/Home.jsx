import React from "react";
import AddNote from "./AddNote";
import "../css/Home.css"
import Note from "./Note";

function Home() {
  return (
    <section>
      <div className="notesForm__container">
        <AddNote />
        <Note/>
      </div>
    </section>
  );
}

export default Home;
