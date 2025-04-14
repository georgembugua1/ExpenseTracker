import React from 'react';

function ExpenseTable({ filteredExpenses, handleEdit, handleDelete, searchTerm, setSearchTerm, sortKey, setSortKey }) {
  return (
    <div>
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
          <option value="date">Date</option>
        </select>
      </div>

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
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;

