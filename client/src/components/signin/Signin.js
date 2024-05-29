import "./Signin.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
    useSelector((state) => state.userAuthoruserAuthorLoginReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function onSignUpFormSubmit(userCred) {
    dispatch(userAuthorLoginThunk(userCred));
  }

  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3 text-dark" style={{fontFamily:"sans-serif", fontWeight:"bolder", marginTop:"10px", fontSize: 40}}>Login</h2>
            </div>
            <div className="card-body">
              {/* invalid cred err */}
              {errorOccurred === true && (
                <p className="text-center" style={{ color: "var(--crimson)" }}>
                  {errMsg}
                </p>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4 d-flex justify-content-center">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType")}
                    />
                    <label htmlFor="author" className="form-check-label">
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label htmlFor="user" className="form-check-label">
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4 ps-4 pe-4">
                  <input
                    type="text"
                    className="form-control"
                    id="username"

                    placeholder="Username"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4 ps-4 pe-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>
                <div className="text-end d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark" style={{width:"60%", marginBottom: "10px" }}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
