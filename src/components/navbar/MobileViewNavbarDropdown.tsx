import { useState } from "react";

interface MobileViewNavbarDropdownProps {
    openAddLimitOverlay: () => void;
    openAddExpenseOverlay: () => void;
    changeIncome: () => void;
}

export default function MobileViewNavbarDropdown({openAddLimitOverlay, openAddExpenseOverlay, changeIncome}: MobileViewNavbarDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => { setIsOpen(!isOpen) }

    return (
        <div className="flex justify-end w-fit">
            <div>
                <button
                    onClick={toggleDropdown}
                >
                    <svg
                        className="size-6 stroke-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M0 0h24v24H0z" stroke="none" />
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <div className="w-screen p-0 m-0 absolute left-0 top-[14vh] h-5 z-30">

                <div className={`bg-background text-foreground flex-col items-center w-full overflow-hidden transition-max-height duration-500 ease-in-out
                    ${isOpen ? 'max-h-screen' : 'max-h-0'}
                    `}
                >
                    <div className="w-full h-full">
                        <button
                            onClick={()=>openAddLimitOverlay()}
                            className="rounded-full px-8 py-5 w-full h-full flex justify-center items-center text-sm font-extrabold cursor-pointer"
                        >
                            Add Limit
                        </button>
                    </div>
                    <div className="w-full h-full">
                        <button
                            onClick={()=>openAddExpenseOverlay()}
                            className="rounded-full px-8 py-5 w-full h-full flex justify-center items-center text-sm font-extrabold cursor-pointer"
                        >
                            Add Expense
                        </button>
                    </div>
                    <div className="w-full h-full">
                        <button
                            onClick={()=>changeIncome()}
                            className="rounded-full px-8 py-5 w-full h-full flex justify-center items-center text-sm font-extrabold cursor-pointer"
                        >
                            Update Income
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

