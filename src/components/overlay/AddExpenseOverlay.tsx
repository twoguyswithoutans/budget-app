import { useState } from "react"
import { format } from "date-fns"
import { AddExpense } from "expense/Expense"
import { AddExceededCategory } from "limit/ExceededCategory";
import { PresetCategory } from "models/Models";
import Overlay from "./Overlay";
import OverlayInput from "./OverlayInput";
import OverlaySelect from "./OverlaySelect";

interface ExpensePanelProps {
    isOpen: (value: boolean) => void;
}

export default function AddExpenseOverlay({ isOpen }: Readonly<ExpensePanelProps>) {
    const [price, setPrice] = useState<number>();
    const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        const amount = Number(value);
        if (amount > 0) {
            setPrice(amount);
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
            price: price ?? 0,
            date: date ?? format(new Date(), "yyyy-MM-dd"),
            description: description,
            category: category
        }

        AddExpense(expense);
        const exceededCategory = checkExceededLimits();
        AddExceededCategory({ category: exceededCategory });
    }

    return (
        <div onKeyDown={handleKeyPress} role="menu" tabIndex={0}>
            <Overlay isOpen={isOpen} submitFunction={submitExpense} title="Add a Limit">
                <OverlayInput title="Amount" currency="₺" type="text" placeholder="X,XXX" value={price !== undefined ? price.toLocaleString() : ''} handleChange={handleAmountChange} />
                <OverlayInput title="Date" type="date" value={date} handleChange={handleDateChange} />
                <OverlayInput title="Description" type="text" placeholder="write a description..." value={description} handleChange={handleDescriptionChange} />
                <OverlaySelect title="Category" value={category} handleChange={handleCategoryChange} optionTitle="Select a category..." options={PresetCategory} />
            </Overlay>
        </div>
    )
}
