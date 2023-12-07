import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
///////////////////////////////////////////////////////////////////////////////////////////
    // Get all notes
    const getNotes = async () =>{
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MGE4NzNmYThjMGY4YjUzNjU2Y2ZkIn0sImlhdCI6MTcwMTg4MTk3MX0.sjtsXs3ltYgbAOaVYA5OPojG4ArsdkKp_fcCcXueD6A"
        }
        });
        const json = await response.json()
        setNotes(json)
    }
//////////////////////////////////////////////////////////////////////////////////////////////   
    // Add a note
      const addNote = async (title, description, tag) =>{
        
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MGE4NzNmYThjMGY4YjUzNjU2Y2ZkIn0sImlhdCI6MTcwMTg4MTk3MX0.sjtsXs3ltYgbAOaVYA5OPojG4ArsdkKp_fcCcXueD6A"
          },
             body: JSON.stringify({title, description, tag})
          });

          const note = await response.json();
          setNotes(notes.concat(note))
      }
////////////////////////////////////////////////////////////////////////////////////////////
      // Delete a note
      const deleteNote = async (id) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MGE4NzNmYThjMGY4YjUzNjU2Y2ZkIn0sImlhdCI6MTcwMTg4MTk3MX0.sjtsXs3ltYgbAOaVYA5OPojG4ArsdkKp_fcCcXueD6A"
          },

          });
          const json = await response.json();
          const newNotes = notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)
      }
///////////////////////////////////////////////////////////////////////////////////////////
      // Edit a note
      const editNote = async (id, title, description, tag) =>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MGE4NzNmYThjMGY4YjUzNjU2Y2ZkIn0sImlhdCI6MTcwMTg4MTk3MX0.sjtsXs3ltYgbAOaVYA5OPojG4ArsdkKp_fcCcXueD6A"
          },
             body: JSON.stringify({title, description, tag})
          });

             const json = await response.json();

        // Logic to edit in client side
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            notes[index].title = title;
            notes[index].description = description;
            notes[index].tag = tag;
            break;
          }  
        }
        setNotes(notes);
      } 
    return(
       <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}> 
        {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState
