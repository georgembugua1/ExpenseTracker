import React from 'react';

function BudgetSection({ budget, totalSpent, remaining, isOverBudget, isNearBudget }) {
  return (
    <div className="budget-section">
      <label htmlFor="budget">Set Budget:</label>
      <p>{`Budget: $${budget.toFixed(2)}`}</p>
      <p>Total Spent: ${totalSpent.toFixed(2)}</p>
      <p
        className={`budget-warning ${isOverBudget ? "over-budget" : isNearBudget ? "near-budget" : "under-budget"}`}
      >
        {isOverBudget
          ? "You have exceeded your budget!"
          : isNearBudget
          ? "You're near your budget limit!"
          : `Remaining Budget: $${remaining.toFixed(2)}`}
      </p>
    </div>
  );
}

export default BudgetSection;

