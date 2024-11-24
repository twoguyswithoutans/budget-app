import { useState, useEffect } from "react"
import { ExceededCategories } from "models/Models";

const formatCurrency = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
});

export default function CategoryBox() {
    const [categories, setCategories] = useState<{ [key: string]: number }>({});
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [limit, setLimit] = useState<string[]>([]);

    useEffect(() => {
        const categoryTotals: { [key: string]: number } = {};
        const expenses: { category: string, price: number }[] = JSON.parse(localStorage.getItem("expense") || "[]");
        const total: number = JSON.parse(localStorage.getItem("totalExpense") || "0");
        const limitExceededCategories: ExceededCategories[] = JSON.parse(localStorage.getItem("exceededCategories") || "[]");

        for(const item of expenses) {
            if(categoryTotals[item.category]) {
                categoryTotals[item.category] += item.price;
            } else {
                categoryTotals[item.category] = item.price;
            }
        }

        setLimit(limitExceededCategories.flatMap(category => category.category));
        setTotalExpense(total);
        setCategories(categoryTotals);
    }, []);

    return (
        <div className="rounded-xl w-full h-full border-2 border-secondary">
            <div className="border-b-2 border-secondary">
                {Object.keys(categories).map(categoryItem => (
                    <div className="my-5 px-5 flex justify-between items-center text-base font-semibold" key={categoryItem}>
                        <div className="flex items-center">
                            <div className="rounded-sm w-[10px] h-[10px] mr-2 border border-secondary-foreground bg-secondary-foreground"></div>
                            <span
                                className={`px-1 text-muted
                                ${limit.includes(categoryItem) ? "text-red-600 font-black": ""}`}
                            >
                                {categoryItem}:
                            </span>
                        </div>
                        <span className={`text-primary ${limit.includes(categoryItem) ? "text-red-600 font-black": ""}`}>
                            {formatCurrency.format(categories[categoryItem]) || "0.00"}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-5 mb-5 px-5 flex justify-between items-center text-base font-semibold">
                <span className="px-1 text-muted">Total Spending: </span>
                <span className="text-primary">{formatCurrency.format(totalExpense) || "0.00"}</span>
            </div>
        </div>
    )
}