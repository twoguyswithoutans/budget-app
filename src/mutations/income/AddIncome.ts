import { Income } from "models/Models";

export function AddIncome({ amount }: Income) {
    localStorage.setItem('income', JSON.stringify(amount));
    window.location.reload();
}