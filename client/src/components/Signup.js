import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({email:"",password:"",cpassword:""}) //destructuring
  let history=useHistory();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
      //TODO API Call
      const response = await fetch(`/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password}) //adding to database
      });
  
  
      const json = await response.json(); //receving responose
      console.log(json)

      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        history.push("/");
        props.showAlert("Signup Successfully Account has been Created...", "success");
      } else {
        props.
        // alert("Invalid credentials");
        props.showAlert("Invalid credentials", "danger");
      }

     

  }
  
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}


  return (
    <div className='container my-5'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} name='email' />

      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail2" className="form-label">Full Name</label>
        <input type="name" className="form-control" id="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} name='name' />

      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password'  minLength={5} required/>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" value={credentials.password} onChange={onChange} name='cpassword' minLength={5} required />
      </div>

      {/* <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div> */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default Signup

