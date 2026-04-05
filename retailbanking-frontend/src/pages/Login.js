import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if (res.data === "Login Failed") {
        alert("Wrong email or password");
        return;
      }

      localStorage.setItem("token", res.data);

      alert("Login Success");

      window.location.href = "/Dashboard";

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;