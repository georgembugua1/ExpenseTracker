import React from 'react';

function ExpenseForm({ formData, setFormData, handleFormSubmit, editingId }) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
  );
}

export default ExpenseForm;

