export function TotalExpense() {
    let total = 0;
    const expenses: { price: number }[] = JSON.parse(localStorage.getItem("expense") || "[]");
    total = expenses.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('totalExpense', JSON.stringify(total));
}