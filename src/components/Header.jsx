import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./User.jsx";

import { useSocket } from "../contexts/SocketIOContext.jsx";

export function Header() {
  const [token, setToken] = useAuth();

  const { socket } = useSocket();
  const handleLogout = () => {
    socket.disconnect();
    setToken(null);
  };

  if (token) {
    const { sub } = jwtDecode(token);
    return (
      <div>
        <h1>Welcome to My Recipe Blog!</h1>
        Username: <User id={sub} />
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to My Recipe Blog!</h1>
      <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}
