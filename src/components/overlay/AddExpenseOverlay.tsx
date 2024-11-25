import { useState } from "react"
import { AddExpense } from "expense/AddExpense"
import { format } from "date-fns"
import { AddExceededCategories } from "limits/AddExceededCategories";
import { PresetCategories } from "models/Models";

interface ExpensePanelProps {
    isOpen: (value: boolean) => void;
}

export default function AddExpenseOverlay({ isOpen }: ExpensePanelProps) {
    const [price, setAmount] = useState<number>();
    const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        const amount = Number(value);
        if (amount > 0) {
            setAmount(amount);
        }
    };
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value.toLowerCase());
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitExpense();
        }
    };

    const checkExceededLimits = () => {
        const limits = JSON.parse(localStorage.getItem('categoryLimit') || '[]');
        const expenses = JSON.parse(localStorage.getItem('expense') || '[]');
        const categorySpent: { [key: string]: number } = {};

        const limitExceeded: string[] = [];

        for(const item of expenses) {
            if(categorySpent[item.category]) {
                categorySpent[item.category] += item.price;
            }
            else {
                categorySpent[item.category] = item.price;
            }
        }

        for(const key of Object.keys(limits)) {
            const limit = limits[key];
            if((categorySpent[limit.category]) >= (limit.limit * 0.8)) {
                if (!limitExceeded.includes(limit.category)) {
                    limitExceeded.push(limit.category);
                }
            }
        }
        return limitExceeded;
    }

    const submitExpense = () => {
        if (price === undefined || price <= 0) { return }
        const expense = {
            price: price !== undefined ? price : 0,
            date: date !== undefined ? date : format(new Date(), "yyyy-MM-dd"),
            description: description,
            category: category
        }

        AddExpense(expense);
        const exceededCategories = checkExceededLimits();
        AddExceededCategories({ category: exceededCategories });
    }

    return (
        <div
            onKeyDown={handleKeyPress}
            className="fixed top-0 left-0 w-full h-full py-5 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
            <div className="rounded w-[90vw] h-full px-4 md:px-16 pb-16 pt-3 flex flex-col justify-start bg-background shadow-lg">
                <div className="pb-4 flex justify-end text-base font-thin">
                    <button className="secondary-foreground" onClick={() => isOpen(false)}>close</button>
                </div>
                <form
                    onSubmit={submitExpense}
                    className="w-full h-full pt-4 pb-12 flex flex-col justify-start items-center"
                >
                    <div className="pb-5 text-2xl font-semibold text-content-secondary_foreground">Add a transaction</div>

                    <div className="rounded-xl border w-full md:w-1/2 h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
                        <div className="px-5 text-sm font-semibold text-secondary">Price</div>
                        <span className="px-1 text-black text-xl font-semibold text-content-secondary_foreground">₺</span>
                        <input className="w-full h-full bg-transparent text-sm md:text-base font-semibold focus:outline-none focus:bg-transparent text-content-primary" type="text" placeholder="X,XXX"
                        value={price !== undefined ? price.toLocaleString() : ''}
                        onChange={handleAmountChange}
                        required
                        />
                    </div>
                    <div className="rounded-xl border w-full md:w-1/2 h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
                        <div className="px-5 text-sm font-semibold text-secondary">Date</div>
                        <input className="w-full h-full bg-transparent text-sm md:text-base font-semibold focus:outline-none focus:bg-transparent text-content-primary" type="date"
                        value={date}
                        onChange={handleDateChange}
                        />
                    </div>
                    <div className="rounded-xl border w-full md:w-1/2 h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
                        <div className="px-5 text-sm font-semibold text-secondary">Description</div>
                        <input
                            className="w-full h-full bg-transparent text-sm md:text-base font-semibold focus:outline-none focus:bg-transparent text-content-primary"
                            type="text" placeholder="write a description..."
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </div>
                    <div className="rounded-xl border w-full md:w-1/2 h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
                        <div className="px-5 text-sm font-semibold text-secondary">Category</div>
                        <select
                            required
                            value={category}
                            onChange={handleCategoryChange}
                            className="rounded-xl w-full h-full flex items-center text-sm md:text-base font-semibold bg-content-secondary focus:outline-none focus:bg-transparent text-content-primary"
                        >
                            <option value="" disabled>Select a category...</option>
                            {Object.keys(PresetCategories).map((category: string) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full md:w-1/2 h-24">
                        <button
                            type="submit"
                            className="w-full h-full py-5 my-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-black text-4xl rounded-lg text-center shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
