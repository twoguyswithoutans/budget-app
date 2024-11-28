import React, { useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts";
import { GetExpense } from "expense/Expense";
import { parseISO, getMonth, getYear } from 'date-fns';

const formatCurrency = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
});

export default function ExpenseBarChart() {
    const [view, setView] = useState("monthly");
    const expenses = GetExpense().sort((a: { date: string; }, b: { date: string; }) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

    const aggregatedExpenses = expenses.reduce((acc: { [x: string]: { date: string; price: number; }; }, expense: { date: string; price: number; }) => {
        const date = parseISO(expense.date);
        const key = view === "monthly" ? `${getMonth(date) + 1}/${getYear(date)}` : `${getYear(date)}`;
        if (!acc[key]) {
            acc[key] = { date: key, price: 0 };
        }
        acc[key].price += expense.price;
        return acc;
    }, {});

    const formattedExpenses = Object.values(aggregatedExpenses);

    return (
        <div className="rounded-lg w-full h-full p-10 flex flex-col border border-secondary">
            <div className="my-12 flex justify-end">
                <button
                    className="rounded py-2 px-4 text-background font-bold bg-foreground md:hover:opacity-60 md:active:opacity-80"
                    onClick={() => setView(view === "monthly" ? "yearly" : "monthly")}>
                    {view === "monthly" ? "Show Yearly View" : "Show Monthly View"}
                </button>
            </div>
            <ResponsiveContainer width="100%" minHeight={500}>
                <BarChart data={formattedExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        stroke="var(--secondary-foreground)"
                    />
                    <YAxis
                        tickFormatter={tick => formatCurrency.format(tick)}
                        stroke="var(--secondary-foreground)"
                    />
                    <Tooltip
                        cursor={{fill: "var(--secondary)"}}
                        formatter={value => formatCurrency.format(value as number)} 
                        contentStyle={{ backgroundColor: "var(--background)", color: "var(--foreground)", borderColor: "var(--background)"}}
                        itemStyle={{ color: "var(--foreground)" }}
                    />
                    <Bar dataKey="price" name="Spendings" className="stroke-secondary-foreground fill-secondary-foreground"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
