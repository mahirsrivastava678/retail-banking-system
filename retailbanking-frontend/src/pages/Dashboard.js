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

  // ✅ PROFILE
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");
  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      getProfile();
    }
  }, [token]);

  // ✅ GET PROFILE
  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/profile/" + accountNumber
      );
      setProfile(res.data);
    } catch {
      alert("Profile load failed");
    }
  };

  // ✅ BALANCE
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

  // ✅ DEPOSIT
  const depositMoney = async () => {
    if (!depositAmount || Number(depositAmount) <= 0)
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

  // ✅ WITHDRAW
  const withdrawMoney = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0)
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

  // ✅ TRANSFER
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

  // ✅ LOAN
  const applyLoan = async () => {
    if (!loanAmount || Number(loanAmount) <= 0)
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

  // ✅ TRANSACTIONS
  const getTransactions = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/transactions/account/" + accountNumber,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTransactions(res.data);
    setShowHistory(true);
  };

  // ✅ UPDATE PROFILE
  const updateProfile = async () => {
    if (!newName && !newPassword)
      return alert("Enter something");

    try {
      await axios.put("http://localhost:8080/api/profile/update", {
        accountNumber,
        name: newName || profile.name,
        email: profile.email,
        password: newPassword
      });

      alert("Profile Updated");

      setEditMode(false);
      setNewName("");
      setNewPassword("");

      getProfile();

    } catch {
      alert("Update Failed");
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "30px" }}>

      {/* PROFILE */}
      <div style={{ background: "#1e3a8a", color: "white", padding: "20px" }}>
        <h2>Welcome {profile.name || "User"}</h2>
        <p>Email: {profile.email || "Not available"}</p>
        <h3>Account: {accountNumber}</h3>

        <button onClick={() => setEditMode(true)}>Edit Profile</button>

        {editMode && (
          <div>
            <input
              placeholder="New Name"
              value={newName}
              onChange={(e)=>setNewName(e.target.value)}
            />
            <input
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />
            <button onClick={updateProfile}>Save</button>
          </div>
        )}
      </div>

      {/* BALANCE */}
      <div>
        <h3>Balance</h3>
        <button onClick={getBalance}>Check Balance</button>
        <h2>{hasCheckedBalance ? balance : ""}</h2>
      </div>

      {/* DEPOSIT */}
      <div>
        <h3>Deposit</h3>
        <input value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)} />
        <button onClick={depositMoney}>Deposit</button>
      </div>

      {/* WITHDRAW */}
      <div>
        <h3>Withdraw</h3>
        <input value={withdrawAmount} onChange={(e)=>setWithdrawAmount(e.target.value)} />
        <button onClick={withdrawMoney}>Withdraw</button>
      </div>

      {/* TRANSFER */}
      <div>
        <h3>Transfer</h3>
        <input placeholder="Receiver" value={toAccount} onChange={(e)=>setToAccount(e.target.value)} />
        <input value={transferAmount} onChange={(e)=>setTransferAmount(e.target.value)} />
        <button onClick={transferMoney}>Transfer</button>
      </div>

      {/* LOAN */}
      <div>
        <h3>Loan</h3>
        <input value={loanAmount} onChange={(e)=>setLoanAmount(e.target.value)} />
        <button onClick={applyLoan}>Apply</button>
        <button onClick={getLoans}>Check Status</button>

        {showLoanTable && (
          <table border="1">
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

      {/* TRANSACTIONS */}
      <div>
        <h3>Transactions</h3>
        <button onClick={getTransactions}>Show</button>

        {showHistory && (
          <table border="1">
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

      <button onClick={logoutUser}>Logout</button>

    </div>
  );
}

export default Dashboard;