import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';

export const Home = (props) => {
     const {showAlert} = props;
    //  const context = useContext(noteContext);
    //  const {notes,setNotes}=context;//destructring

    return (

        <div>
            {/* <br /> */}
            {/* <h3>Add Note</h3>
        <div className="container my-3">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        */}
            {/* <h3>Your Notes</h3>
        {notes.map((note)=>{ //using map on note
            return note.title;//returing title of notes
        })} */}

            <Notes showAlert={showAlert} />
            {/* //Notes component */}

        </div>
    )
}
