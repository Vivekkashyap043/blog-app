import React from 'react'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import '../login/Login.css'

function Register() {

  let { register, handleSubmit, formState: { errors }} = useForm();

  const onSignup = (data) => {
    console.log(data); // You can handle form submission here
  }

  return (
    <div className='d-flex align-items-center justify-content-center' style={{minHeight:"81.1vh", background:"#566573"}}>
      <form onSubmit={handleSubmit(onSignup)}>
      <div className="m-5 p-5 w-30 inner">
            <h1 className="text-center text-danger font-weight-bold mb-3">
                Sign up
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
                <p>Already have account? <Link to="/signin">Login</Link></p>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Register
