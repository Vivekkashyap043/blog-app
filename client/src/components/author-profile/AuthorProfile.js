import "./AuthorProfile.css";
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';
import createlogo from '../../assets/createnew.png'


function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
 
  return (
    <div className="author-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item pt-3">
          <NavLink
            className="nav-link"
            to={`articles-by-author/${currentUser.username}`}
            style={{ color: "black", textDecoration: "underline" }}
          >
            My Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="new-article"
            style={{ color: "var(--dark-green)" }}
          >
            <div className="d-flex pt-3" style={{textDecoration:"underline", color:"black"}}>
            <img src={createlogo} alt="" style={{width: 35, height:35}}/>
            <p style={{ color: "black", fontSize:25 }}>Create new article</p>
            </div>
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
