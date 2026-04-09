import { useState } from "react";
import axios from "axios";

function Loan() {

  const [amount, setAmount] = useState("");

  const applyLoan = async () => {

    const accountNumber = localStorage.getItem("accountNumber");

    await axios.post("http://localhost:8080/api/loan/apply", {
      accountNumber,
      amount
    });

    alert("Loan Applied Successfully");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Loan Apply</h2>

      <input
        placeholder="Enter Loan Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <button onClick={applyLoan}>
        Apply Loan
      </button>
    </div>
  );
}

export default Loan;