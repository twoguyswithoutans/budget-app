import { Income } from "models/Models";

export function AddIncome({ amount }: Income) {
    localStorage.setItem('income', JSON.stringify(amount));
    window.location.reload();
}

export function GetIncome() {
    const income = localStorage.getItem('income');
    if(income) {
        const parsedIncome = JSON.parse(income);
        return parsedIncome;
    }
    return null;
}