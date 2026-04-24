import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const load = (key, fallback) => {
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) : fallback;
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function App() {
  const [income, setIncome] = useState(load("income", { h: 0, w: 0, s: 0 }));
  const [expenses, setExpenses] = useState(load("expenses", 0));
  const [goal, setGoal] = useState(load("goal", 1000000));
  const [history, setHistory] = useState(load("history", []));

  useEffect(() => save("income", income), [income]);
  useEffect(() => save("expenses", expenses), [expenses]);
  useEffect(() => save("goal", goal), [goal]);
  useEffect(() => save("history", history), [history]);

  const totalIncome =
    Number(income.h) + Number(income.w) + Number(income.s);

  const savings = totalIncome - Number(expenses);

  const yearly = savings * 12;

  const monthsToGoal =
    savings > 0 ? Math.ceil(goal / savings) : null;

  const progress = Math.min((yearly / goal) * 100, 100);

  const addSnapshot = () => {
    setHistory([
      ...history,
      { month: history.length + 1, value: savings },
    ]);
  };

  return (
    <div style={{
      fontFamily: "Arial",
      padding: 20,
      background: "#0b1220",
      color: "white",
      minHeight: "100vh"
    }}>
      <h1>💎 V9.1 FINTECH UPGRADE</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>

        {/* INCOME */}
        <div style={{ background: "#121a2b", padding: 15, borderRadius: 12 }}>
          <h3>💰 Доход</h3>

          <input placeholder="муж"
            onChange={(e) => setIncome({ ...income, h: e.target.value })} />

          <input placeholder="жена"
            onChange={(e) => setIncome({ ...income, w: e.target.value })} />

          <input placeholder="USDT"
            onChange={(e) => setIncome({ ...income, s: e.target.value })} />
        </div>

        {/* EXPENSES */}
        <div style={{ background: "#121a2b", padding: 15, borderRadius: 12 }}>
          <h3>💸 Расходы</h3>

          <input type="number"
            onChange={(e) => setExpenses(e.target.value)} />
        </div>

        {/* STATS */}
        <div style={{ background: "#121a2b", padding: 15, borderRadius: 12 }}>
          <h3>📊 Финансы</h3>

          <p>Доход: {totalIncome} ₽</p>
          <p>Сбережения: {savings} ₽</p>
          <p>Год: {yearly} ₽</p>
        </div>

        {/* GOAL */}
        <div style={{ background: "#121a2b", padding: 15, borderRadius: 12 }}>
          <h3>🎯 Цель</h3>

          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <p>{progress.toFixed(1)}% выполнено</p>
          <p>До цели: {monthsToGoal || "-"} мес</p>

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

      </div>

      {/* GRAPH */}
      <div style={{ marginTop: 20, background: "#121a2b", padding: 15, borderRadius: 12 }}>
        <h3>📈 Капитал (история)</h3>

        <button onClick={addSnapshot} style={{
          padding: 10,
          marginBottom: 10
        }}>
          + сохранить месяц
        </button>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4f7cff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
