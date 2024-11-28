import { Transaction } from "models/Models";
import { parseISO, isSameMonth } from "date-fns";

export function AddExpense({ price, date, description, category}: Transaction) {
    const transaction = {
        price: price,
        date: date,
        description: description || '',
        category: category
    }

    const setTransaction = JSON.parse(localStorage.getItem('expense') || '[]');
    setTransaction.push(transaction);
    localStorage.setItem('expense', JSON.stringify(setTransaction));
    window.location.reload();
}

export function GetExpense() {
    const expense = localStorage.getItem('expense');
    if(expense) {
        const parsedExpense = JSON.parse(expense);
        return parsedExpense;
    }
    return null;
}

export function SetMonthlyExpense() {
    let total = 0;
    const expenses: Transaction[] = GetExpense() || [];
    const currentDate = new Date();

    const monthlyExpense = expenses.filter(item => {
        const expenseDate = parseISO(item.date);
        return isSameMonth(expenseDate, currentDate);
    });

    total = monthlyExpense.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('monthlyExpense', JSON.stringify(total));
}

export function GetMonthlyExpense() {
    const monthlyExpense = localStorage.getItem('monthlyExpense');
    if(monthlyExpense) {
        const parsedMonthlyExpense = JSON.parse(monthlyExpense);
        return parsedMonthlyExpense;
    }
    return null;
}

export function SetTotalExpense() {
    let totalExpense = 0;
    const expenses: Transaction[] = GetExpense() || [];
    totalExpense = expenses.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('totalExpense', JSON.stringify(totalExpense));
}

export function GetTotalExpense() {
    const totalExpense = localStorage.getItem('totalExpense');
    if(totalExpense) {
        const parsedTotalExpense = JSON.parse(totalExpense);
        return parsedTotalExpense;
    }
    return null;
}