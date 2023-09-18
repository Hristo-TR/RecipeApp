import React,{useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'

export const Auth = () => {
    const [registerOrLogin, setRegisterOrLogin] = useState("register");

    const changeRegisterOrLogin = () =>{
        if (registerOrLogin=="register") {
            setRegisterOrLogin("login")
        } else {
            setRegisterOrLogin("register")
        }
        
    }

    if (registerOrLogin=="register") {
        return <div className="auth">
       <Register/>
       <div className="flex justify-center cursor-pointer text-green-900 pb-52" onClick={changeRegisterOrLogin}>
        <p>
            Already have an account?
        </p>
       </div>
    </div>;
    } else {
        return <div className="auth">
       <Login/>
       <div>
        <p  className="flex justify-center cursor-pointer text-green-900 pb-52" onClick={changeRegisterOrLogin}>
            Don't have an account?
        </p>
       </div>
    </div>;
    }
    
 };
 

 const Login = ()=> {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
 
    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {username, password})
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID)
            navigate("/")
        } catch (err) {
            console.error(err);
        }
    }
 
    return <Form username={ username} setUsername={setUsername} password={password} setPassword={setPassword} label="Log in" onSubmit={onSubmit}/>;

  };

 const Register = ()=> {

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const onSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost:3001/auth/register", {username, password})
        alert("Registration complete!")
    } catch (err) {
        console.error(err);
    }
    }

    return <Form username={ username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>;

 };

 const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
    return <div className="flex flex-col justify-center items-center w-screen pt-32 text-center ">
    <form onSubmit={onSubmit} className="rounded-2xl shadow-2xl p-8">
      <h2 className="font-semibold text-2xl mb-4">{label}</h2>
      <div className="form-group mb-4">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        {label}
      </button>
    </form>
  </div>
};
 