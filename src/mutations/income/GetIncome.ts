export function GetIncome() {
    const income = localStorage.getItem('income');
    if(income) {
        const parsedIncome = JSON.parse(income);
        return parsedIncome;
    }
    return null;
}