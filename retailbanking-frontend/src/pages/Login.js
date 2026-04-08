import { useState, useEffect } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const loginUser = async () => {

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password
      });

      if (res.data.message === "Login Failed") {
        alert("Wrong email or password");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("accountNumber", res.data.accountNumber);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("email", email);

      alert("Login Success");

      if (email === "admin@gmail.com") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f2f2f2"
    }}>

      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 0 10px gray"
      }}>

        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          onClick={loginUser}
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Login
        </button>

        <br /><br />

        <button
          onClick={()=>window.location.href="/register"}
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Login;