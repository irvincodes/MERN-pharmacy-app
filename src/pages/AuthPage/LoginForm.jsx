import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const HOME_PAGES = {
  Consumer: () => {
    return "/";
  },
  Admin: () => {
    return "/users";
  },
  Pharmacist: () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.accountId;
    return `/pharmacists/${id}`;
  },
};
const LoginForm = ({ setUser }) => {
  const [loginAttempt, setLoginAttempt] = useState({
    userId: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginAttempt),
      });
      const data = await response.json();
      console.log(data)
      localStorage.setItem("token", data);
      const decodedUser = jwt_decode(data);
      setUser(decodedUser);
      console.log(HOME_PAGES[decodedUser.accountType]());
      navigate(HOME_PAGES[decodedUser.accountType]());
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setLoginAttempt({
      ...loginAttempt,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
    <div>    
    <input
          name="userId"
          placeholder="Email or User ID"
          value={loginAttempt.userId}
          onChange={handleChange}
          className="border border-wPurple-50 rounded py-1 px-14 mt-3 text-center"
        />
    </div>
    <div>
        <input
          name="password"
          placeholder="Password"
          value={loginAttempt.password}
          onChange={handleChange}
          className="border border-wPurple-50 rounded py-1 px-14 my-5 text-center"
          hidden={true} 
        />
     </div>
     <div>
      <button className="bg-wAqua text-white rounded-md px-5 py-2 w-full">Login</button>
      </div>
    </form>
  );
};
export default LoginForm;