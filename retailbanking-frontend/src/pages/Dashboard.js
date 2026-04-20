import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const [balance, setBalance] = useState("");
  const [hasCheckedBalance, setHasCheckedBalance] = useState(false);

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // PROFILE
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");
  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      loadProfile();
    }
  }, []);

  // LOAD PROFILE
  const loadProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/profile/" + accountNumber
      );

      setNewName(res.data.name);
      setNewEmail(res.data.email);

      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("email", res.data.email);

    } catch {
      alert("Profile load failed");
    }
  };

  // BALANCE
  const getBalance = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/balance/" + accountNumber,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBalance(res.data);
    setHasCheckedBalance(true);
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

    setWithdrawAmount("");
    if (hasCheckedBalance) getBalance();
  };

  // UPDATE PROFILE
  const updateProfile = async () => {
    if (!newName || !newEmail)
      return alert("Name and email required");

    try {
      const res = await axios.put(
        "http://localhost:8080/api/profile/update",
        {
          accountNumber,
          name: newName,
          email: newEmail,
          password: newPassword
        }
      );

      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("email", res.data.email);

      alert("Profile Updated");
      setEditMode(false);

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
        {!editMode ? (
          <>
            <h2>Welcome {newName}</h2>
            <p>Email: {newEmail}</p>
            <h3>Account: {accountNumber}</h3>
            <button onClick={()=>setEditMode(true)}>Edit Profile</button>
          </>
        ) : (
          <>
            <input placeholder="Name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
            <input placeholder="Email" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />

            <button onClick={updateProfile}>Save</button>
            <button onClick={()=>setEditMode(false)}>Cancel</button>
          </>
        )}
      </div>

      {/* BALANCE */}
      <button onClick={getBalance}>Check Balance</button>
      <h2>{hasCheckedBalance ? balance : ""}</h2>

      <button onClick={logoutUser}>Logout</button>

    </div>
  );
}

export default Dashboard;