import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {

      await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password
      });

      alert("Registration Success");
      window.location.href = "/";

    } catch {
      alert("Registration Failed");
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

        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

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
          onClick={registerUser}
          style={{ width: "100%", padding: "10px" }}
        >
          Register
        </button>

        <br /><br />

        <button
          onClick={()=>window.location.href="/"}
          style={{ width: "100%", padding: "10px" }}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default Register;