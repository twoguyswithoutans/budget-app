import { useEffect, useState } from "react";
import ThemeToggle from "components/theme/themeToggle";
import MobileViewNavbarDropdown from "navbar/MobileViewNavbarDropdown";
import { GetIncome } from "income/Income";

interface NavbarProps {
    openAddExpenseOverlay: () => void;
    openAddLimitOverlay: () => void;
}

const formatCurrency = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
});

export default function Navbar({openAddExpenseOverlay, openAddLimitOverlay}: NavbarProps) {
    const [formattedIncome, setFormattedIncome] = useState<string>("loading...");
    useEffect(() => {
        const income: number = GetIncome();
        setFormattedIncome(formatCurrency.format(income));
    }, []);

    function changeIncome() {
        localStorage.removeItem("income");
        window.location.reload();
    }

    return (
        <div className="rounded-full w-[95vw] h-20 mt-5 px-5 flex justify-between items-center bg-navbar text-navbar-foreground">
            <div className="flex">
                <ThemeToggle />
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <div className="text-sm font-semibold text-navbar-secondary">Monthly Income</div>
                    <div className="flex text-sm md:text-lg font-medium md:font-bold text-navbar-primary">
                        {formattedIncome}
                    </div>
                </div>
            </div>
            <div className="md:hidden pr-5">
                <MobileViewNavbarDropdown openAddLimitOverlay={openAddLimitOverlay} openAddExpenseOverlay={openAddExpenseOverlay} changeIncome={changeIncome} />
            </div>
            <div className="hidden rounded-full w-full h-14 md:flex justify-center items-center bg-navbar-primary text-navbar-secondary_foreground">
                <div className="w-full h-full">
                    <button
                        onClick={()=>openAddLimitOverlay()}
                        className="rounded-full px-8 w-full h-full flex justify-center items-center text-sm font-extrabold bg-background md:hover:bg-foreground md:hover:text-background md:hover:opacity-60 md:active:bg-foreground md:active:text-background md:active:opacity-80 cursor-pointer"
                    >
                        Add Limit
                    </button>
                </div>
                <div className="w-full h-full">
                    <button
                        onClick={()=>openAddExpenseOverlay()}
                        className="rounded-full px-8 w-full h-full flex justify-center items-center text-sm font-extrabold bg-background md:hover:bg-foreground md:hover:text-background md:hover:opacity-60 md:active:bg-foreground md:active:text-background md:active:opacity-80 cursor-pointer"
                    >
                        Add Expense
                    </button>
                </div>
                <div className="w-full h-full">
                    <button
                        onClick={()=>changeIncome()}
                        className="rounded-full px-8 w-full h-full flex justify-center items-center text-sm font-extrabold bg-background md:hover:bg-foreground md:hover:text-background md:hover:opacity-60 md:active:bg-foreground md:active:text-background md:active:opacity-80 cursor-pointer"
                    >
                        Update Income
                    </button>
                </div>
            </div>
        </div>
    )
}