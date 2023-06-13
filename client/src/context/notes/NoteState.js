import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  //try hardcode 
  // const noteIntial = [

  //   {
  //     "_id": "645b7df82ecd6cb8dc341f7ab",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "Updated Title11",
  //     "description": "Updated Dec11s ",
  //     "tag": "Update",
  //     "date": "2023-05-10T11:20:24.237Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6451b7e562ecd6cb8dc34f7b2",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "My Title2",
  //     "description": "My Decs2 ",
  //     "tag": "personalmalmla nahi",
  //     "date": "2023-05-10T11:21:58.902Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "645b71e562ecd6cb8dc34f7b2",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "My Title2",
  //     "description": "My Decs2 ",
  //     "tag": "personalmalmla nahi",
  //     "date": "2023-05-10T11:21:58.902Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "645b7e562e1cd6cb8dc34f7b2",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "My Title2",
  //     "description": "My Decs2 ",
  //     "tag": "personalmalmla nahi",
  //     "date": "2023-05-10T11:21:58.902Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "645b7e5612ecd6cb8dc34f7b2",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "My Title2",
  //     "description": "My Decs2 ",
  //     "tag": "personalmalmla nahi",
  //     "date": "2023-05-10T11:21:58.902Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "645b7e1562ecd6cb8dc34f7b2",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "My Title2",
  //     "description": "My Decs2 ",
  //     "tag": "personalmalmla nahi",
  //     "date": "2023-05-10T11:21:58.902Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "64611dac030b3c9d7d5cbce9c",
  //     "user": "645b66f82ccd1dcf819c04eb",
  //     "title": "Title ahe bhava",
  //     "description": "Description ahe bhava ",
  //     "tag": "bhava",
  //     "date": "2023-05-15T07:09:52.167Z",
  //     "__v": 0
  //   }

  // ]

  // const [notes, setNotes] = useState(noteIntial);


  const host = "http://localhost:5000"
  const noteIntial = []
  const [notes, setNotes] = useState(noteIntial);

  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjY2ZjgyY2NkMWRjZjgxOWMwNGViIn0sImlhdCI6MTY4MzcxMTczNn0.FwmfdcaEQQc5gT2cM1zyp5blrrR9OonXJBCMWcwTUAY"
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjY2ZjgyY2NkMWRjZjgxOWMwNGViIn0sImlhdCI6MTY4MzcxMTczNn0.FwmfdcaEQQc5gT2cM1zyp5blrrR9OonXJBCMWcwTUAY"
      },
      body: JSON.stringify({ title, description, tag }) //adding to database
    });


    // const json = await response.json();
    // console.log(json)

    // //On user side only
    // console.log("adding a new note")
    // const note = {
    //   "_id": "64611dac030b3c9d7d5cbce9c",
    //   "user": "645b66f82ccd1dcf819c04eb",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-05-15T07:09:52.167Z",
    //   "__v": 0
    // };

    //taking from that user only
    const note = await response.json();
    setNotes(notes.concat(note))
  }


  //Delete Note
  const deleteNote = async (id) => {
    // //TODO API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjY2ZjgyY2NkMWRjZjgxOWMwNGViIn0sImlhdCI6MTY4MzcxMTczNn0.FwmfdcaEQQc5gT2cM1zyp5blrrR9OonXJBCMWcwTUAY"
      }
    });
    const json = response.json();
    console.log(json);

    //On user side only
    console.log("Deleting a note with id=" + id)


    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //Update OR Edit Note
  const editNote = async (id, title, description, tag) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YjY2ZjgyY2NkMWRjZjgxOWMwNGViIn0sImlhdCI6MTY4MzcxMTczNn0.FwmfdcaEQQc5gT2cM1zyp5blrrR9OonXJBCMWcwTUAY"
      },
      body: JSON.stringify({ title, description, tag }) //Editing to database
    });

    const json = await response.json();
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))  //creating copy to edit

    //Logic to edit in the client side
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
      }

    }

    setNotes(newNote) //assiging new note to orginal database 


  }


  // const s1 = {
  //     "name": "Harry",
  //     "class": "5b"
  // }
  // const [state, setState] = useState(s1);

  // const update = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name": "Larry",
  //             "class": "10b"
  //         })
  //     }, 1000);
  // }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;