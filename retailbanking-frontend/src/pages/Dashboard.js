import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const token = localStorage.getItem("token");
  const accountNumber = localStorage.getItem("accountNumber");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  const getBalance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/balance/" + accountNumber,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBalance(res.data);
    } catch {
      alert("Balance load failed");
    }
  };

  const depositMoney = async () => {
    if (!depositAmount || depositAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8080/api/deposit/" + accountNumber + "/" + depositAmount,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Deposit Success");
      setDepositAmount("");
      getBalance();
    } catch {
      alert("Deposit Failed");
    }
  };

  const withdrawMoney = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (Number(withdrawAmount) > Number(balance)) {
      alert("Insufficient balance");
      return;
    }

    try {
      await axios.put(
        "http://localhost:8080/api/withdraw/" + accountNumber + "/" + withdrawAmount,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Withdraw Success");
      setWithdrawAmount("");
      getBalance();
    } catch {
      alert("Withdraw Failed");
    }
  };

  const transferMoney = async () => {
    if (!toAccount || !transferAmount || transferAmount <= 0) {
      alert("Enter valid details");
      return;
    }

    if (toAccount === accountNumber) {
      alert("Cannot transfer to same account");
      return;
    }

    if (Number(transferAmount) > Number(balance)) {
      alert("Insufficient balance");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:8080/api/transfer/" +
          accountNumber + "/" + toAccount + "/" + transferAmount,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert(res.data);
      setTransferAmount("");
      setToAccount("");
      getBalance();
    } catch {
      alert("Transfer Failed");
    }
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/transactions/account/" + accountNumber,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTransactions(res.data);
      setShowHistory(true);
    } catch {
      alert("Transaction load failed");
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const card = {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  };

  const input = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  };

  const button = {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #dfe9f3, #ffffff)",
      minHeight: "100vh",
      padding: "30px"
    }}>

      <div style={{ ...card, marginBottom: "20px", background: "#1e3a8a", color: "white" }}>
        <h2>Welcome {userName}</h2>
        <h3>Account Number: {accountNumber}</h3>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
      }}>

        <div style={card}>
          <h3>Balance</h3>
          <button style={button} onClick={getBalance}>Check Balance</button>
          <h2>{balance}</h2>
        </div>

        <div style={card}>
          <h3>Deposit</h3>
          <input
            style={input}
            placeholder="Enter amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <button style={button} onClick={depositMoney}>Deposit</button>
        </div>

        <div style={card}>
          <h3>Withdraw</h3>
          <input
            style={input}
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button style={button} onClick={withdrawMoney}>Withdraw</button>
        </div>

        <div style={card}>
          <h3>Transfer</h3>
          <input
            style={input}
            placeholder="Receiver Account"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          />
          <input
            style={input}
            placeholder="Enter amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <button style={button} onClick={transferMoney}>Transfer</button>
        </div>
      </div>

      <div style={{ ...card, marginTop: "20px" }}>
        <h3>Transaction History</h3>
        <button style={button} onClick={getTransactions}>Show Transactions</button>

        {showHistory && (
          <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
            <thead>
              <tr>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={index}>
                  <td>{t.accountNumber}</td>
                  <td>{t.type}</td>
                  <td>{t.amount}</td>
                  <td>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button style={button} onClick={logoutUser}>Logout</button>
      </div>

    </div>
  );
}

export default Dashboard;