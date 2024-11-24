import { Transaction } from "models/Models";

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
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
}