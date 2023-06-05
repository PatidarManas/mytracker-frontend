import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import right from "../right.jpg";
import "./Home.scss";
import axios from "axios";

const Home = () => {
  const url = "https://mttracker.onrender.com";
  const history = useNavigate();
  const [username, setusername] = useState("");
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");
  function gotologin() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "grid";
  }
  function gotosignup() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "grid";
  }
  async function login() {
      try {
          await axios
        .post(`${url}/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
            // console.log(res.data)
            history("/details", { state: { user: res.data } });
        });
    } catch (error) {
      alert(error);
    }
}
async function register() {
      console.log("reached");
    try {
      await axios
        .post(`${url}/register`, {
          username: user,
          name: name,
          password: pass,
        })
        .then((res) => {
          alert("Successfully Registered Please login");
          gotologin();
        });
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="main">
      <div className="loginbox" id="login">
        <div className="left">
          <h1>Login</h1>
          <h3>Welcome, Login to your Account And Manage your Finances</h3>
          {/* <form action=""> */}
          <div className="form">
            <div className="box">
              <div className="text">Userame</div>
              <input
                type="text"
                onChange={(e) => setusername(e.target.value)}
                placeholder="Enter Username"
              />
            </div>
            <div className="box">
              <div className="text">Password</div>
              <input
                type="text"
                placeholder="Enter Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="text2">
              Don't have a account <a onClick={gotosignup}>Create account</a>
            </div>
            <button onClick={login} type="submit">
              Login
            </button>
            </div>
          {/* </form> */}
        </div>
        <div className="right">
          <button>X</button>
          <img src={right} alt="" />
        </div>
      </div>
      <div className="signupbox" id="signup">
        <div className="left">
          <h1>Signup </h1>
          <h3>Welcome, Create your Account And Manage your Finances</h3>
          {/* <form action=""> */}
          <div className="form">
            <div className="box">
              <div className="text">Name</div>
              <input
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="box">
              <div className="text">Username</div>
              <input
                type="text"
                placeholder="Enter a Username"
                onChange={(e) => setuser(e.target.value)}
              />
            </div>
            <div className="box">
              <div className="text">Password</div>
              <input
                type="text"
                placeholder="Create Password"
                onChange={(e) => setpass(e.target.value)}
              />
            </div>
            <div className="text2">
              Already have a account <a onClick={gotologin}>Login</a>
            </div>
            <button onClick={register}>Signup</button>

            {/* </form> */}
          </div>
        </div>
        <div className="right">
          <button >X</button>
          <img src={right} alt="" />
        </div>
      </div>
      {/* <div className="scroll">Scroll Down</div> */}
    </div>
  );
};

export default Home;
