import { useState } from "react"
import { AddIncome } from "income/Income"
import Overlay from "./Overlay";
import OverlayInput from "./OverlayInput";

export default function IncomeOverlay() {
    const [income, setIncome] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        setIncome(value.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitIncome();
        }
    };

    const submitIncome = () => {
        const incomeValue = Number(income.replace(/[₺,]/g, ''));
        AddIncome({ amount: incomeValue });
    }

    return (
        <div onKeyDown={handleKeyPress} role="menu" tabIndex={0}>
            <Overlay submitFunction={submitIncome} title="Enter your monthly income to start budgeting!">
                <OverlayInput currency="₺" type="text" placeholder="X,XXX" value={income} handleChange={handleChange} />
            </Overlay>
        </div>
    )
}