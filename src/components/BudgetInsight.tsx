'use client';
import { useEffect, useState } from 'react';
import { turkishCurrencyFormat } from "@/util/CurrencyFormat"
import { GetExpense, GetMonthlyExpense, GetTotalExpense } from "expense/Expense"
import { GetExceededCategory } from "limit/ExceededCategory"
import { GetCategoryLimit } from "limit/CategoryLimit"
import { GetIncome } from "income/Income"
import { parseISO, format } from 'date-fns';
import Link from 'next/link';

export default function DownloadPDFButton() {
    const [income, setIncome] = useState('');
    const [monthlyExpense, setMonthlyExpense] = useState('');
    const [totalExpense, setTotalExpense] = useState('');
    const [categoryLimit, setCategoryLimit] = useState<{ category: string; limit: number }[]>([]);
    const [exceededCategory, setExceededCategory] = useState<[]>([]);
    const [expenses, setExpenses] = useState<{ date: string; price: number; description: string; category: string; }[]>([]);

    const [isCategoryLimit, setIsCategoryLimit] = useState<boolean>(false)
    const [isExceededCategory, setIsExceededCategory] = useState<boolean>(false)
    const isCategoryLimitEmpty: number = categoryLimit?.length
    const isExceededCategoryEmpty: number = exceededCategory?.length

    const tableTitleStyle: string = "gap-4 bg-primary p-2 text-background font-bold"
    const tableItemStyle: string = "gap-4 p-2 border-b border-foreground hover:bg-foreground hover:text-background"

    const dateNow = format(new Date(), "dd-MM-yyyy");

    useEffect(() => {
        setIncome(GetIncome());
        setMonthlyExpense(GetMonthlyExpense());
        setTotalExpense(GetTotalExpense());
        setCategoryLimit(GetCategoryLimit());
        setExceededCategory(GetExceededCategory());
        setExpenses(GetExpense().sort((a: { date: string; }, b: { date: string; }) => parseISO(a.date).getTime() - parseISO(b.date).getTime()));
    }, []);

    useEffect(() => {
        if(isCategoryLimitEmpty > 0) {
            setIsCategoryLimit(true)
        }
    }, [isCategoryLimitEmpty]);

    useEffect(() => {
        if(isExceededCategoryEmpty > 0) {
            setIsExceededCategory(true)
        }
    }, [exceededCategory, isExceededCategoryEmpty]);

    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = `Budget Insights Report - ${dateNow}`;
        window.print();
        document.title = originalTitle;
    };

    return (
        <div className="w-full flex flex-col justify-center text-foreground">
            <div className="w-full px-4 md:px-20 my-3 print:hidden">
                <Link
                    href="/"
                    className="font-bold text-sm"
                >
                    {'<'} Home
                </Link>
            </div>
            <div className="w-full h-full py-14 px-4 md:px-20 flex flex-col">
                <div className="text-4xl font-bold">Budget Insights</div>
                <div className="flex justify-end mt-10">
                    <button 
                        className="rounded-lg w-full md:w-fit px-10 py-3 flex justify-center items-center font-bold text-lg print:hidden text-background bg-foreground hover:opacity-70 active:opacity-90"
                        onClick={handlePrint}
                    >
                        Print
                    </button>
                </div>
                <div className="w-full flex flex-col">
                    <div className="py-10 flex flex-col md:flex-row">
                        <div className="w-full my-0 md:mx-4">
                            <div className="rounded w-full md:w-full my-4 p-4 flex flex-col justify-center items-center text-background bg-foreground border border-foreground">
                                <div className="text-lg font-semibold text-center">Monthly Income:</div>
                                <div className="text-xl font-black">{turkishCurrencyFormat.format(Number(income))}</div>
                            </div>
                            <div className="rounded w-full md:w-full my-4 p-4 flex flex-col justify-center items-center text-background bg-foreground border border-foreground">
                                <div className="text-lg font-semibold text-center">This Month&apos;s Spendings:</div>
                                <div className="text-xl font-black">{turkishCurrencyFormat.format(Number(monthlyExpense))}</div>
                            </div>
                        </div>

                        <div className="w-full my-0 md:mx-4">
                            <div className="rounded w-full md:w-full mb-4 md:my-4 p-4 flex flex-col justify-center items-center text-background bg-foreground border border-foreground">
                                <div className="text-lg font-semibold text-center">Total Recorded Spendings:</div>
                                <div className="text-xl font-black">{turkishCurrencyFormat.format(Number(totalExpense))}</div>
                            </div>
                            <div className="rounded w-full md:w-full my-4 p-4 flex flex-col justify-center items-center text-background bg-foreground border border-foreground">
                                <div className="text-lg font-semibold text-center">Number of Category Limit(s):</div>
                                <div className="text-xl font-black">{categoryLimit.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isCategoryLimit && (
                        <div className="mb-20">
                            <div className="mb-10">
                                <div className="font-bold text-lg mb-2">Category Limit(s)</div>
                                <div className={`grid grid-cols-1 md:grid-cols-3 ${tableTitleStyle}`}>
                                    <div>#</div>
                                    <div>Category</div>
                                    <div>Limit</div>
                                </div>
                                {categoryLimit.map((limit, index) => (
                                    <div key={index} className={`grid grid-cols-1 md:grid-cols-3 ${tableItemStyle}`}>
                                        <div>{index + 1}</div>
                                        <div>{limit.category}</div>
                                        <div>{turkishCurrencyFormat.format(limit.limit)}</div>
                                    </div>
                                ))}
                            </div>
                            {
                                isExceededCategory && (
                                    <div className="text-foreground">
                                        <div className="font-bold text-lg mb-2">Limit Exceeded Category(ies)</div>
                                        <div className={`grid grid-cols-1 md:grid-cols-2 ${tableTitleStyle}`}>
                                            <div>#</div>
                                            <div>Category</div>
                                        </div>
                                        {exceededCategory.map((item, index) => (
                                            <div key={index} className={`grid grid-cols-1 md:grid-cols-2 ${tableItemStyle}`}>
                                                <div>{index + 1}</div>
                                                <div>{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                <div>
                    <div className="flex flex-col">
                    <div className="font-bold text-lg mb-2">All Expense(s)</div>
                        <div className={`grid grid-cols-1 md:grid-cols-5 ${tableTitleStyle}`}>
                            <div>#</div>
                            <div>Date
                                <div>(yyyy-mm-dd)</div>
                            </div>
                            <div>Price</div>
                            <div>Description</div>
                            <div>Category</div>
                        </div>
                        {expenses.map((expense, index) => (
                            <div key={index} className={`grid grid-cols-1 md:grid-cols-5 ${tableItemStyle}`}>
                                <div>{index + 1}</div>
                                <div>{expense.date}</div>
                                <div>{turkishCurrencyFormat.format(expense.price)}</div>
                                <div>{expense.description}</div>
                                <div>{expense.category}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}