import { useState } from 'react';
import './App.css';

function App() {

  const [noteTitle, setNoteTitle] = useState("Untitled Note")
  const [noteContent, setNoteContent] = useState("Empty")

  // title change
    function TitleChange(e){
      setNoteTitle(e.target.value)
    }
  
  // Content Change
    function ContentChange(f){
      setNoteContent(f.target.value)
    }

  //Sidebar
  function Sidebar() {
    //adding condition for empty note title
    let localNoteTitle
    if (noteTitle == "")
      localNoteTitle = "Untitled Note";
    else 
      localNoteTitle = noteTitle;

    // adding condition for empty note content
    let localNoteContent
    if (noteContent == "")
      localNoteContent = "Empty";
    else 
      localNoteContent = noteContent;

    return <div className="sidebar">
      <div className='notes'>
        <h3>{localNoteTitle}</h3>
        <p>{localNoteContent}</p>
      </div>
    </div>
  }

  // Main Bar
  function Mainbar() {
    return <form>
      <input type='text' value={noteTitle} id='note-title' onChange={TitleChange}></input> 
      <input type='text' value={noteContent} id='note-content' onChange={ContentChange} placeholder='Write your note...'></input>
    </form>
  }

  //Final render
  return (<div className='container'>
    {Sidebar()}
    {Mainbar()}
  </div>
  );
}

export default App;
