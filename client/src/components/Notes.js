import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';



const Notes = (props) => {
    
    let history=useHistory();
    const {showAlert} = props;

    const context = useContext(noteContext);

    // const { notes, setNotes } = context;
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes() //not null then only show notes else login first
        } else {
            history.push("/login")
        }
   
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null) //for edit model
    const refClose = useRef(null) //click close button of edit model on update note button
    const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" });


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        // console.log("Updting the note...", note)
        // e.preventDefault();  //TO STOP REload
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Succesfully...", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }


    return (
        <>
            <AddNote showAlert={showAlert} />
            {/* <div className='row my-3'>
                <h3>Your Notes</h3>
                {notes.map((note) => { //using map on note
                    return <Noteitem key={note._id} note={note} />; //returing title of notes
                })}
            </div> */}

            {/* <!-- Button trigger modal --> */}
           
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                
                          

                            
                        </div>
                        <div className="modal-body">
                            {/* form body  */}

                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}  />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Upate Note</button> */}
                            </form>


                        </div>
                      

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>


                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h3>Your Notes</h3>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => { //using map on note
                    return <Noteitem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />; //returing title of notes
                })}
            </div>



        </>
    )
}

export default Notes



// import React, { useContext, useEffect, useRef, useState } from 'react'
// import noteContext from "../context/notes/noteContext"
// import Noteitem from './Noteitem';
// import AddNote from './AddNote';

// const Notes = () => {
//     const context = useContext(noteContext);
//     const { notes, getNotes } = context;
//     useEffect(() => {
//         getNotes()
//         // eslint-disable-next-line
//     }, [])
//     const ref = useRef(null)
//     const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

//     const updateNote = (currentNote) => {
//         ref.current.click();
//         setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
//     }

//     const handleClick = (e) => {
//         console.log("Updating the note...", note)
//         e.preventDefault();
//     }

//     const onChange = (e) => {
//         setNote({ ...note, [e.target.name]: e.target.value })
//     }

//     return (
//         <>
//             <AddNote />
//             <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button>
//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form className="my-3">
//                                 <div className="mb-3">
//                                     <label htmlFor="title" className="form-label">Title</label>
//                                     <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="description" className="form-label">Description</label>
//                                     <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="tag" className="form-label">Tag</label>
//                                     <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
//                                 </div>

//                             </form>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row my-3">
//                 <h2>You Notes</h2>
//                 {notes.map((note) => {
//                     return <Noteitem key={note._id} updateNote={updateNote} note={note} />
//                 })}
//             </div>
//         </>
//     )
// }

// export default Notes