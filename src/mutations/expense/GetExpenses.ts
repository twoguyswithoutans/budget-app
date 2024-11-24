export function GetExpense() {
    const expense = localStorage.getItem('expense');
    if(expense) {
        const parsedExpense = JSON.parse(expense);
        return parsedExpense;
    }
    return null;
}