import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

  const [credentials, setCredentials] = useState({email:"",password:""}) //destructuring
  let history=useHistory();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
      //TODO API Call
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}) //adding to database
      });
  
  
      const json = await response.json();
      console.log(json)

      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        history.push("/");
        props.showAlert("LogIn Successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
        // alert("Invalid credentials");
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
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' />
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

export default Login
