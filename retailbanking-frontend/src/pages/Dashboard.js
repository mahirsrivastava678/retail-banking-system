import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [transactions, setTransactions] = useState([]);

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
      getBalance();

    } catch (error) {
      alert("Deposit Failed");
    }
  };

  const withdrawMoney = async () => {
    try {
      await axios.put(
        "http://localhost:8080/api/withdraw/123456789/" + amount,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Withdraw Success");
      getBalance();

    } catch (error) {
      alert("Insufficient Balance");
    }
  };

  const transferMoney = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api/transfer/123456789/" + toAccount + "/" + amount,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data);
      getBalance();

    } catch (error) {
      alert("Transfer Failed");
    }
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/transactions/account/123456789",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
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
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
      />

      <br /><br />

      <button onClick={depositMoney}>Deposit</button>

      <br /><br />

      <button onClick={withdrawMoney}>Withdraw</button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter account number"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
      />

      <br /><br />

      <button onClick={transferMoney}>Transfer</button>

      <br /><br />

      <button onClick={getTransactions}>Transaction History</button>

      <br /><br />

      {transactions.map((t, index) => (
        <div key={index}>
          Account: {t.accountNumber} | Type: {t.type} | Amount: {t.amount}
        </div>
      ))}

      <br /><br />

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Dashboard;