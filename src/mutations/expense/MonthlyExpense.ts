import { parseISO, isSameMonth } from 'date-fns';

export function MonthlyExpense() {
    let total = 0;
    const expenses: { price: number, date: string }[] = JSON.parse(localStorage.getItem("expense") || "[]");
    const currentDate = new Date()

    const monthlyExpenses = expenses.filter(item => {
        const expenseDate = parseISO(item.date);
        return isSameMonth(expenseDate, currentDate);
    });

    total = monthlyExpenses.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('monthlyExpense', JSON.stringify(total));
}