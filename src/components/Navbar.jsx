import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <nav>
      <div>
        <h3>Task José</h3>
      </div>
      {authenticated == true ? (
        <div>
          <Link to="/home"> Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/profile">Profile</Link>
          <button type="button">Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
