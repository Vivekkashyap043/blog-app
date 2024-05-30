import "./AuthorProfile.css";
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';
import createlogo from '../../assets/createnew.png'


function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
 
  return (
    <div className="author-profile p-3">
    <ul className="nav justify-content-around fs-3 custom-nav">
      <li className="nav-item pt-3">
        <NavLink
          className="nav-link custom-link"
          to={`articles-by-author/${currentUser.username}`}
          activeClassName="active"
          exact // Ensures the exact route is matched
        >
          <p style={{fontSize: 25}}>My Articles</p>
        </NavLink>
      </li>
      <li className="nav-item pt-3">
        <NavLink
          className="nav-link custom-link"
          to="new-article"
          activeClassName="active"
        >
          <p style={{fontSize: 25}}>Create new article</p>
        </NavLink>
      </li>
    </ul>
    <Outlet />
  </div>
  );
}

export default AuthorProfile;
