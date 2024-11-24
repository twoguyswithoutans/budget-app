import { useState } from "react"
import { AddCategoryLimit } from "limits/AddCategoryLimit"
import { AddExceededCategories } from "limits/AddExceededCategories";
import { PresetCategories } from "models/Models"

interface AddLimitOverlayProps {
    isOpen: (value: boolean) => void;
}

export default function AddLimitOverlay({ isOpen }: AddLimitOverlayProps) {
    const [amount, setAmount] = useState<number>();
    const [category, setCategory] = useState<string>("");

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        setAmount(Number(value));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitLimit();
        }
    };

    const checkExceededLimits = () => {
        const limits = JSON.parse(localStorage.getItem('categoryLimit') || '[]');
        const expenses = JSON.parse(localStorage.getItem('expense') || '[]');
        const categorySpent: { [key: string]: number } = {};

        const limitExceeded: string[] = [];

        for(let item of expenses) {
            if(categorySpent[item.category]) {
                categorySpent[item.category] += item.price;
            }
            else {
                categorySpent[item.category] = item.price;
            }
        }

        for(let key of Object.keys(limits)) {
            let limit = limits[key];
            if((categorySpent[limit.category]) >= (limit.limit * 0.8)) {
                if (!limitExceeded.includes(limit.category)) {
                    limitExceeded.push(limit.category);
                }
            }
        }
        return limitExceeded;
    }

    const submitLimit = () => {
        const limit = {
            category: category,
            limit: amount !== undefined ? amount : 0,
        }
        AddCategoryLimit(limit);
        const exceededCategories = checkExceededLimits();
        AddExceededCategories({ category: exceededCategories });
    }

  return (
    <div
        className="fixed top-0 left-0 w-full h-full py-12 flex justify-center items-center bg-black bg-opacity-50 z-50"
        onKeyDown={handleKeyPress}
    >
        <div className="rounded w-[90vw] h-full px-4 md:px-16 pb-16 pt-3 flex flex-col justify-start bg-background shadow-lg">
             <div className="pb-12 flex justify-end text-base font-thin">
                <button className="secondary-foreground" onClick={() => isOpen(false)}>close</button>
            </div>
            <form
                onSubmit={submitLimit}
                className="w-full h-full pt-4 pb-12 flex flex-col justify-between items-center"
            >
                <div className="py-5 text-2xl font-semibold text-content-secondary_foreground">Add a Limit</div>

                <div className="rounded-xl border w-full md:w-1/2 h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
                    <div className="px-5 text-sm font-semibold text-secondary">Amount</div>
                    <span className="px-1 text-black text-xl font-semibold text-content-secondary_foreground">₺</span>
                    <input className="w-full h-full bg-transparent text-sm md:text-base font-semibold focus:outline-none focus:bg-transparent text-content-primary" type="text" placeholder="X,XXX"
                    value={amount !== undefined ? amount.toLocaleString() : ''}
                    onChange={handleAmountChange}
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
