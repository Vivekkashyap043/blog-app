import "./UserProfile.css";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <>
     <NavLink to='articles' className=' nav-link mt-4' style={{textAlign:"center", fontSize: 60}}><u>Articles</u></NavLink>
      <Outlet />
    </>
  );
} 

export default UserProfile;
