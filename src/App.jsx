import { useState } from "react";

export default function App() {
  const [income, setIncome] = useState({ h: 0, w: 0, s: 0 });
  const [expenses, setExpenses] = useState(0);
  const [goal, setGoal] = useState(1000000);

  const total =
    Number(income.h) + Number(income.w) + Number(income.s);

  const savings = total - Number(expenses);

  const progress = Math.min((savings * 12 / goal) * 100, 100);

  return (
    <div style={{
      fontFamily: "Arial",
      padding: 20,
      background: "#0b1220",
      color: "white",
      minHeight: "100vh"
    }}>
      <h1>🏦 V9 BANK (Clean Setup)</h1>

      <h3>💰 Income</h3>
      <input placeholder="husband"
        onChange={e => setIncome({ ...income, h: e.target.value })} />
      <input placeholder="wife"
        onChange={e => setIncome({ ...income, w: e.target.value })} />
      <input placeholder="USDT"
        onChange={e => setIncome({ ...income, s: e.target.value })} />

      <h3>💸 Expenses</h3>
      <input type="number"
        onChange={e => setExpenses(e.target.value)} />

      <h3>🎯 Goal</h3>
      <input type="number"
        value={goal}
        onChange={e => setGoal(e.target.value)} />

      <hr />

      <h3>📊 Dashboard</h3>
      <p>Total income: {total} ₽</p>
      <p>Savings: {savings} ₽</p>
      <p>Goal progress: {progress.toFixed(1)}%</p>

      <div style={{
        height: 10,
        background: "#1c2a44",
        borderRadius: 10
      }}>
        <div style={{
          width: progress + "%",
          height: 10,
          background: "#4f7cff",
          borderRadius: 10
        }} />
      </div>
    </div>
  );
}
