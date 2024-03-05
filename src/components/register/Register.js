import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import '../login/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  let { register, handleSubmit, formState: { errors }} = useForm();
  let navigate = useNavigate()
  let [err, setErr] = useState('')

  const onLogin = async (userObj) => {
    if (userObj.userType === "user") {
      let res = await axios.post('http://localhost:4000/user-api/user', userObj)
      if (res.data.message === "user created") {
        navigate('/login')
      } else {
        setErr(res.data.message)
      }
    } else {
      let res = await axios.post('http://localhost:4000/author-api/author', userObj)
      if (res.data.message === "Author created") {
        navigate('/login')
      } else {
        setErr(res.data.message)
      }
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight:"81.1vh", background:"#566573"}}>
      <form onSubmit={handleSubmit(onLogin)}>
      <div className="m-5 p-5 w-30 inner">
            <h1 className="text-center text-danger font-weight-bold mb-3">
                Register
            </h1>
            {
              err.length!==0&& <p className='text-danger text-center'>{err}</p>
            }
            <div className="d-flex justify-content-center">
              <div className='user'>
              <input type="radio" className='user' name="userType" id="userType" value="author" {...register("userType", { required: true })}/>
                <label>Author</label>
              </div>
              <div className='user'>
              <input type="radio" className='user' name="userType" id="userType" value="user" {...register("userType", { required: true })}/>
                <label>User</label>
              </div>
            </div>
            {errors.usertype?.type === "required" && (
                      <p className="text-danger">User type is required</p>
                    )}
            <div className="row  username">
                <div className="col">
                    <input type="text" placeholder="Username" className="input1"  {...register("username", { required: true })}/>
                </div>
            </div>
            {errors.username?.type === "required" && (
                      <p className="text-danger">Username is required</p>
                    )}
            <div className="row  password">
                <div className="col">
                    <input type="password" placeholder='Password' className="input1"  {...register("password", { required: true, minLength: 6 })}/>
                </div>
            </div>
            {errors.password?.type === "required" && (
                      <p className="text-danger">Password is required</p>
                    )}
            {errors.password?.type === "minLength" && (
                      <p className="text-danger">Password length must be  greater than 8</p>
                    )}
              <div className="row  password">
                <div className="col">
                    <input type="email" placeholder='Email' className="input1"  {...register("email", { required: true })}/>
                </div>
            </div>
            {errors.email?.type === "required" && (
                      <p className="text-danger">Email is required</p>
                    )}
            <div className="row ">
                <div className="col ms-4 ps-4 mt-2">
                    <button className='btn btn-success' style={{width: 160}}> Register</button>
                </div>
            </div>
            <div className="row p-3">
                <p>Already have account? <Link to="/login">Login</Link></p>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Register
