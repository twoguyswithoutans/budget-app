import { useState } from "react"
import { AddCategoryLimit } from "limit/CategoryLimit"
import { AddExceededCategory } from "limit/ExceededCategory";
import { PresetCategory } from "models/Models"
import Overlay from "./Overlay";
import OverlayInput from "./OverlayInput";
import OverlaySelect from "./OverlaySelect";

interface AddLimitOverlayProps {
    isOpen: (value: boolean) => void;
}

export default function AddLimitOverlay({ isOpen }: Readonly<AddLimitOverlayProps>) {
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

    const submitLimit = () => {
        const limit = {
            category: category,
            limit: amount ?? 0,
        }
        AddCategoryLimit(limit);
        const exceededCategory = checkExceededLimits();
        AddExceededCategory({ category: exceededCategory });
    }

  return (
    <div onKeyDown={handleKeyPress} role="menu" tabIndex={0}>
        <Overlay isOpen={isOpen} submitFunction={submitLimit} title="Add a Limit">
            <OverlayInput title="Amount" currency="₺" type="text" placeholder="X,XXX" value={amount !== undefined ? amount.toLocaleString() : ''} handleChange={handleAmountChange} />
            <OverlaySelect title="Category" value={category} handleChange={handleCategoryChange} optionTitle="Select a category..." options={PresetCategory} />
        </Overlay>
    </div>
  )
}
