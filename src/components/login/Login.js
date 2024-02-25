import React from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import './Login.css'

function Login() {

  let { register, handleSubmit, formState: { errors }} = useForm();

  const onSignin = (data) => {
    console.log(data); // You can handle form submission here
  }

  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight:"81.1vh", background:"#566573"}}>
      <form onSubmit={handleSubmit(onSignin)}>
      <div className="m-5 p-5 w-30 inner">
            <h1 className="text-center text-danger font-weight-bold mb-3">
                Sign in
            </h1>
            <div className="d-flex justify-content-center">
              <div className='user'>
              <input type="radio" className='user' name="usertype" id="usertype" value="author" {...register("usertype", { required: true })}/>
                <label>Author</label>
              </div>
              <div className='user'>
              <input type="radio" className='user' name="usertype" id="usertype" value="user" {...register("usertype", { required: true })}/>
                <label>User</label>
              </div>
              <div className='user'>
              <input type="radio" className='user' name="usertype" id="usertype" value="admin" {...register("usertype", { required: true })}/>
                <label>Admin</label>
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
                    <input type="password" placeholder='Password' className="input1"  {...register("password", { required: true })}/>
                </div>
            </div>
            {errors.password?.type === "required" && (
                      <p className="text-danger">Password is required</p>
                    )}
            <div className="row ">
                <div className="col ms-4 ps-4 mt-2">
                    <button className='btn btn-success' style={{width: 160}}> Login</button>
                </div>
            </div>
            <div className="row p-3">
                <p>Don't have account? <Link to="/signin">Register</Link></p>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Login
