import { useState, useEffect } from "react"
import { GetExpense, GetTotalExpense } from "expense/Expense";
import { GetExceededCategory } from "limit/ExceededCategory";
import { Category, ExceededCategory, Income } from "models/Models";
import { turkishCurrencyFormat } from "@/util/CurrencyFormat"

export default function CategoryBox() {
    const [iscategory, setCategory] = useState<{ [key: string]: number }>({});
    const [totalExpense, setTotalExpense] = useState<Income>();
    const [limit, setLimit] = useState<string[]>([]);

    useEffect(() => {
        const expenses: Category[] = GetExpense();
        const categoryTotals: { [key: string]: number } = {};

        for(const item of expenses) {
            if(categoryTotals[item.category]) {
                categoryTotals[item.category] += item.price;
            } else {
                categoryTotals[item.category] = item.price;
            }
        }
        setCategory(categoryTotals);
    }, []);

    useEffect(() => {
        const total: Income = GetTotalExpense();
        setTotalExpense(total);
    }, []);

    useEffect(() => {
        const limitExceededCategory: [] = GetExceededCategory();
        setLimit(limitExceededCategory);
    }, [])

    return (
        <div className="rounded-xl w-full h-full border-2 border-secondary">
            <div className="border-b-2 border-secondary">
                {Object.keys(iscategory).map((categoryItem)  => (
                    <div className="my-5 px-5 flex justify-between items-center text-base font-semibold" key={categoryItem}>
                        <div className="flex items-center">
                            <div className="rounded-sm w-[10px] h-[10px] mr-2 border border-secondary-foreground bg-secondary-foreground"></div>
                            <span
                                className={`px-1 text-muted
                                ${limit?.includes(categoryItem) ? "text-red-600 font-black": ""}`}
                            >
                                {categoryItem}:
                            </span>
                        </div>
                        <span className={`text-primary ${limit?.includes(categoryItem) ? "text-red-600 font-black": ""}`}>
                            {turkishCurrencyFormat.format(iscategory[categoryItem]) || "0.00"}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-5 mb-5 px-5 flex justify-between items-center text-base font-semibold">
                <span className="px-1 text-muted">Total Spending: </span>
                <span className="text-primary">{turkishCurrencyFormat.format(Number(totalExpense))}</span>
            </div>
        </div>
    )
}