import { useState } from "react"
import { AddIncome } from "income/Income"

export default function IncomePanel() {
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
        <div
            onKeyDown={handleKeyPress}
            className="w-full h-full py-20 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
            <form
                onSubmit={submitIncome}
                className="rounded w-[90vw] h-full px-10 md:px-0 flex flex-col justify-start items-center bg-background shadow-lg"
            >
                <div className="mt-10 text-xl md:text-2xl font-black text-center text-content-secondary_foreground">Enter your monthly income to start budgeting!</div>
                <div className="w-full h-dvh mb-10 flex flex-col justify-center items-center">
                    <div className="rounded-xl border w-full md:w-1/2 h-24 mb-5 px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
                        <span className="px-1 text-black text-2xl font-semibold text-content-secondary_foreground">₺</span>
                        <input id="income" className="w-full h-full bg-transparent text-xl font-semibold focus:outline-none focus:bg-transparent text-content-primary" type="text" placeholder="XX,XXX"
                        value={income}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 h-24">
                        <button
                            type="submit"
                            className="w-full h-full py-5 my-5 font-black text-4xl rounded-lg text-center text-background bg-foreground md:hover:opacity-60 md:active:opacity-80"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}