import React from "react";
import NavBar from "./NavBar";
import About from "./About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NoteState from "../context/NoteState";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar title={"iNoteBook"} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
