import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState("");
  const [hasCheckedBalance, setHasCheckedBalance] = useState(false);

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [loans, setLoans] = useState([]);

  const [showHistory, setShowHistory] = useState(false);
  const [showLoanTable, setShowLoanTable] = useState(false);

  const token = localStorage.getItem("token");
  const accountNumber = localStorage.getItem("accountNumber");
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  // BALANCE
  const getBalance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/balance/" + accountNumber,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(res.data);
      setHasCheckedBalance(true);
    } catch {
      alert("Balance load failed");
    }
  };

  // DEPOSIT
  const depositMoney = async () => {
    if (!depositAmount || depositAmount <= 0)
      return alert("Enter valid amount");

    await axios.put(
      "http://localhost:8080/api/deposit/" + accountNumber + "/" + depositAmount,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Deposit Success");
    setDepositAmount("");
    if (hasCheckedBalance) getBalance();
  };

  // WITHDRAW
  const withdrawMoney = async () => {
    if (!withdrawAmount || withdrawAmount <= 0)
      return alert("Enter valid amount");

    if (Number(withdrawAmount) > Number(balance))
      return alert("Insufficient balance");

    await axios.put(
      "http://localhost:8080/api/withdraw/" + accountNumber + "/" + withdrawAmount,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Withdraw Success");
    setWithdrawAmount("");
    if (hasCheckedBalance) getBalance();
  };

  // TRANSFER
  const transferMoney = async () => {
    if (!transferAmount || !toAccount)
      return alert("Enter details");

    if (Number(transferAmount) > Number(balance))
      return alert("Insufficient balance");

    await axios.put(
      "http://localhost:8080/api/transfer/" +
        accountNumber + "/" + toAccount + "/" + transferAmount,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Transfer Success");
    setTransferAmount("");
    setToAccount("");
    if (hasCheckedBalance) getBalance();
  };

  // LOAN
  const applyLoan = async () => {
    if (!loanAmount || loanAmount <= 0)
      return alert("Enter valid loan amount");

    await axios.post("http://localhost:8080/api/loan/apply", {
      accountNumber,
      amount: loanAmount
    });

    alert("Loan Applied");
    setLoanAmount("");
  };

  const getLoans = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/loan/" + accountNumber
    );
    setLoans(res.data);
    setShowLoanTable(true);
  };

  // TRANSACTIONS
  const getTransactions = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/transactions/account/" + accountNumber,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTransactions(res.data);
    setShowHistory(true);
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
    marginTop: "10px"
  };

  const button = {
    marginTop: "10px",
    padding: "10px",
    cursor: "pointer"
  };

  return (
    <div style={{ padding: "30px" }}>

      {/* PROFILE */}
      <div style={{ ...card, background: "#1e3a8a", color: "white" }}>
        <h2>Welcome {userName}</h2>
        <p>Email: {email}</p>
        <h3>Account: {accountNumber}</h3>
      </div>

      {/* FEATURES */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px"
      }}>

        <div style={card}>
          <h3>Balance</h3>
          <button onClick={getBalance}>Check</button>
          <h2>{hasCheckedBalance ? balance : ""}</h2>
        </div>

        <div style={card}>
          <h3>Deposit</h3>
          <input style={input} value={depositAmount} onChange={e=>setDepositAmount(e.target.value)} />
          <button onClick={depositMoney}>Deposit</button>
        </div>

        <div style={card}>
          <h3>Withdraw</h3>
          <input style={input} value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} />
          <button onClick={withdrawMoney}>Withdraw</button>
        </div>

        <div style={card}>
          <h3>Transfer</h3>
          <input style={input} placeholder="Receiver Account" value={toAccount} onChange={e=>setToAccount(e.target.value)} />
          <input style={input} value={transferAmount} onChange={e=>setTransferAmount(e.target.value)} />
          <button onClick={transferMoney}>Transfer</button>
        </div>

        <div style={card}>
          <h3>Loan</h3>
          <input style={input} value={loanAmount} onChange={e=>setLoanAmount(e.target.value)} />
          <button onClick={applyLoan}>Apply</button>
          <button onClick={getLoans}>Status</button>

          {showLoanTable && (
            <table border="1" style={{ marginTop: "10px", width: "100%" }}>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((l,i)=>(
                  <tr key={i}>
                    <td>{l.amount}</td>
                    <td>{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* TRANSACTIONS */}
      <div style={{ ...card, marginTop: "20px" }}>
        <h3>Transactions</h3>
        <button onClick={getTransactions}>Show</button>

        {showHistory && (
          <table border="1" style={{ marginTop: "10px", width: "100%" }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t,i)=>(
                <tr key={i}>
                  <td>{t.type}</td>
                  <td>{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={logoutUser}>Logout</button>
      </div>

    </div>
  );
}

export default Dashboard;