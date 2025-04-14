import React, { useState, useEffect } from "react";
import "./App.css";
import BudgetSection from './components/BudgetSection';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    let parsedExpenses = [];
    try {
      parsedExpenses = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading expenses from localStorage", error);
    }
    return parsedExpenses;
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

 
  const budget = 500; 
  const totalSpent = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const remaining = budget - totalSpent;
  const isOverBudget = remaining < 0;
  const isNearBudget = remaining <= budget * 0.1 && remaining > 0;

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { description, amount, category, date } = formData;

    if (!description || !amount || !category || !date || parseFloat(amount) <= 0) {
      alert("Please fill in all fields with valid data.");
      return;
    }

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

  const filteredExpenses = expenses
    .filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      return a[sortKey].localeCompare(b[sortKey]);
    });

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* Expense Form */}
      <ExpenseForm
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleFormSubmit}
        editingId={editingId}
      />

      {/* Expense Table */}
      <ExpenseTable
        filteredExpenses={filteredExpenses}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
    </div>
  );
}

export default App;
