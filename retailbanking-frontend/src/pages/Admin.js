import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadUsers();
    loadAccounts();
    loadTransactions();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/users");
    setUsers(res.data);
  };

  const loadAccounts = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/accounts");
    setAccounts(res.data);
  };

  const loadTransactions = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/transactions");
    setTransactions(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete("http://localhost:8080/api/admin/deleteUser/" + id);
    alert("User Deleted");
    loadUsers();
  };

  const logoutAdmin = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const card = {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  };

  const button = {
    padding: "8px 15px",
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

      <div style={{
        ...card,
        background: "#1e3a8a",
        color: "white"
      }}>
        <h2>Admin Panel</h2>
      </div>

      <div style={card}>
        <h3>Users</h3>
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Account Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u,index)=>(
              <tr key={index}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.accountNumber}</td>
                <td>
                  <button style={button} onClick={() => deleteUser(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={card}>
        <h3>Accounts</h3>
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((a,index)=>(
              <tr key={index}>
                <td>{a.accountNumber}</td>
                <td>{a.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={card}>
        <h3>Transactions</h3>
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Account</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t,index)=>(
              <tr key={index}>
                <td>{t.accountNumber}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center" }}>
        <button style={button} onClick={logoutAdmin}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Admin;