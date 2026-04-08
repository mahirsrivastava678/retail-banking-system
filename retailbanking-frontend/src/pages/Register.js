import { useState } from "react";
import axios from "axios";

function Register() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    if (!firstName || !lastName || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {

      await axios.post("http://localhost:8080/api/register", {
        firstName,
        lastName,
        email,
        password
      });

      alert("Registration Success");
      window.location.href = "/";

    } catch (error) {
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
          placeholder="First Name"
          value={firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
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
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Register
        </button>

        <br /><br />

        <button
          onClick={()=>window.location.href="/"}
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default Register;