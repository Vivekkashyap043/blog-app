import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';


function AuthorProfile() {
  
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
 
  return (
    <div className="author-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`articles-by-author/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            <button className="btn btn-outline-secondary ms-5" style={{minWidth:"150px", minHeight:"40px", fontSize:"25px"}}>Articles</button>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="new-article"
            style={{ color: "var(--dark-green)" }}
          >
            <button className="btn btn-outline-secondary me-5" style={{minWidth:"150px", minHeight:"40px", fontSize:"25px"}}>Add new article</button>
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;