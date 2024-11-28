'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "navbar/Navbar";
import IncomePanel from "components/IncomePanel";
import ExpenseBarChart from "components/ExpenseBarChart";
import CategoryBox from "components/CategoryBox";
import BudgetAlert from "overlay/BudgetAlert";
import AddLimitOverlay from "overlay/AddLimitOverlay";
import AddExpenseOverlay from "overlay/AddExpenseOverlay";
import { GetExpense, SetMonthlyExpense, SetTotalExpense } from "expense/Expense";
import { GetExceededCategory } from "limit/ExceededCategory";
import { GetIncome } from "income/Income";

export default function Home() {
	const [income, setIncome] = useState<boolean>();
	const [expenses, setExpenses] = useState<boolean>();
	const [isAddLimitOpen, setIsAddLimitOpen] = useState(false);
	const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

    const openAddLimitOverlay = () => {
		setIsAddLimitOpen(!isAddLimitOpen);
		setIsAddExpenseOpen(false);
	}
    const openAddExpenseOverlay = () => {
		setIsAddExpenseOpen(!isAddExpenseOpen);
		setIsAddLimitOpen(false);
	}

	useEffect(() => {
		SetMonthlyExpense();
		SetTotalExpense();
	} ,[]);

	useEffect(() => {
		const storedIncome = GetIncome();
		if (storedIncome !== null) { setIncome(false); }
		else { setIncome(true); }
	} ,[]);

	useEffect(() => {
		const storedExpenses = GetExpense();
        if (storedExpenses !== null) { setExpenses(true); }
        else { setExpenses(false); }
	} ,[]);

	useEffect(() => {
		const limit = [];
		const limitExceededCategory = GetExceededCategory();
		limit.push(limitExceededCategory);
		if(limitExceededCategory) {
			if(limit[0]?.length !== 0) { setShowAlert(true); }
			else { setShowAlert(false); }
		}
    }, []);

	return (
		<div className="w-full h-full">
			{income ? (
				<div className="h-dvh flex justify-center items-center">
					<IncomePanel />
				</div>
			) : (
				<div className="w-full h-full flex flex-col justify-start items-center">
					<div>
						{showAlert && (
							<BudgetAlert setShowAlert={setShowAlert} />
						)}
						{isAddLimitOpen && (
							<AddLimitOverlay isOpen={setIsAddLimitOpen} />
						)}
						{isAddExpenseOpen && (
							<AddExpenseOverlay isOpen={setIsAddExpenseOpen} />
						)}
					</div>
					<div>
						<Navbar openAddExpenseOverlay={openAddExpenseOverlay} openAddLimitOverlay={openAddLimitOverlay} />
					</div>
					<div className="w-[90vw] flex justify-center">
						{expenses ? (
							<div className="w-full flex flex-col">
								<div className="w-full flex justify-star text-foreground mt-10">
									<Link
										className="rounded-lg w-full md:w-1/2 p-5 bg-primary hover:opacity-70 active:opacity-90 text-background font-lg font-bold"
										href="/insight"
									>
										Open Insights
									</Link>
								</div>
								<div className="w-full md:w-1/2 h-full py-12 flex justify-center items-center z-20">
									<CategoryBox />
								</div>
								<div className="w-full h-full py-12 flex justify-center items-center z-30">
									<ExpenseBarChart />
								</div>
							</div>
						) : (
							<div className="w-full h-[80vh] flex justify-center items-center">
								<div className="w-full h-full flex justify-center items-center">
									<div className="text-2xl font-bold text-muted">No expenses added yet</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}