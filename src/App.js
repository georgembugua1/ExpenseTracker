import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const totalSpent = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const remaining = budget - totalSpent;
  const isOverBudget = remaining < 0;
  const isNearBudget = remaining <= budget * 0.1 && remaining > 0;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { description, amount, category, date } = formData;

    if (!description || !amount || !category || !date) return;

    const updatedExpense = { ...formData, id: editingId ?? Date.now() };

    setExpenses((prev) =>
      editingId !== null
        ? prev.map((item) => (item.id === editingId ? updatedExpense : item))
        : [...prev, updatedExpense]
    );

    setEditingId(null);
    setFormData({ description: "", amount: "", category: "", date: "" });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const item = expenses.find((expense) => expense.id === id);
    if (item) {
      setFormData(item);
      setEditingId(id);
    }
  };

  const handleBudgetInput = (e) => {
    setBudget(Number(e.target.value));
  };

  const filteredExpenses = expenses
    .filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* Budget Section */}
      <div className="budget-section">
        <label htmlFor="budget">Set Budget:</label>
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={handleBudgetInput}
          placeholder="Enter your monthly budget"
        />
        <p>Total Spent: ${totalSpent.toFixed(2)}</p>
        <p
          style={{
            color: isOverBudget ? "red" : isNearBudget ? "orange" : "green",
          }}
        >
          {isOverBudget
            ? "You have exceeded your budget!
            : isNearBudget
            ? "You're ar your budget limit!"
            : `Remaining Budget: $${remaining.toFixed(2)}`}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="expense-form">
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInput}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInput}
          required
        />
        <input
          name="category" 
          placeholder="Category"
          value={formData.category}
          onChange={handleInput}
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInput}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Expense</button>
      </form>

      {/* Filters */}
      <div className="controls">
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="">Sort by</option>
          <option value="description">Description</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Expense Table */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount ($)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <body>
          {filteredExpenses.length ? (
            filteredExpenses.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No expenses found
              </td>
            </tr>
          )}
        </body>
      </table>
    </div>
  );
}

export default App;
