import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  let formSingleNote = {};
  // title change
  function NoteAdd() {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      note: "Empty",
    };
    setNotes([newNote, ...notes]);
  }

  function DeleteNote(idToDelete) {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  }

  function FormNote(noteId) {
    formSingleNote = {
      id: noteId,
      title: notes.find((note) => note.id == noteId)?.title || "",
      note: notes.find((note) => note.id == noteId)?.note || "",
    };
    setActiveNote(formSingleNote);
  }

  function EditNote(key, value) {
    const updatedNote = {
      ...activeNote,
      [key]: value,
    };

    setActiveNote({
      ...activeNote,
      [key]: value,
    });

    const newNotes = notes.map((notes) => {
      if (notes.id === activeNote.id) {
        notes.title = updatedNote.title;
        notes.note = updatedNote.note;
      } else {
        return notes;
      }
      return notes;
    });

    setNotes(newNotes);
  }

  function NotesDiv() {
    return notes.map(({ id, title, note }) => (
      <div
        className={`notes ${id === activeNote.id && "active-note"}`}
        onClick={() => FormNote(id)}
      >
        <div className="notes-only">
          <h3>
            {title != ""
              ? title && title.substr(0, 15) + (title.length > 15 ? "..." : "")
              : "Empty"}
          </h3>
          <p>
            {note != ""
              ? note && note.substr(0, 28) + (note.length > 28 ? "..." : "")
              : "Empty"}
          </p>
        </div>
        <button onClick={() => DeleteNote(id)}>Delete</button>
      </div>
    ));
  }

  //Sidebar
  function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebar-title">
          <h2>Notes</h2>
          <button onClick={NoteAdd}>Add</button>
        </div>
        {NotesDiv()}
      </div>
    );
  }

  // Main Bar
  function Mainbar() {
    if (!activeNote) {
      return <div className="mainbar no-active-note">No Active Note</div>;
    } else {
      return (
        <div className="mainbar">
          <form>
            <input
              type="text"
              value={activeNote.title}
              id="note-title"
              onChange={(e) => EditNote("title", e.target.value)}
            ></input>
            <textarea
              type="text"
              value={activeNote.note}
              id="note-content"
              onChange={(e) => EditNote("note", e.target.value)}
              placeholder="Write your note..."
            ></textarea>
          </form>
        </div>
      );
    }
  }

  //Final render
  return (
    <div className="container">
      {Sidebar()}
      {Mainbar()}
    </div>
  );
}

export default App;
