import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const getBalance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/balance/123456789",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBalance(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const depositMoney = async () => {
    try {
      await axios.put(
        "http://localhost:8080/api/deposit/123456789/" + amount,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Deposit Success");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={getBalance}>Check Balance</button>
      <h3>{balance}</h3>

      <input
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={depositMoney}>Deposit</button>
    </div>
  );
}

export default Dashboard;