import { GetExceededCategory } from "limit/ExceededCategory";
import { ExceededCategory } from "models/Models";

interface BudgetAlertProps {
    setShowAlert: (value: boolean) => void;
}

export default function BudgetAlert({ setShowAlert }: BudgetAlertProps) {
    const limits: ExceededCategory[] = GetExceededCategory() || [];
    const limited = limits.flatMap(category => category);
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
            <div className="rounded w-[90vw] px-5 md:px-16 pb-16 md:pb-16 pt-3 flex flex-col justify-start bg-background shadow-lg">
                <div className="pb-12 flex justify-end text-sm font-black">
                    <button className="secondary-foreground" onClick={() => setShowAlert(false)}>Close</button>
                </div>
                <div className="h-full px-2 flex flex-col">
                    <div className="pb-4 text-foreground text-lg md:text-2xl font-semibold md:font-bold">You have exceeded 80% of the limit for the following category/categories:</div>
                    <div className="w-full flex flex-row justify-start">
                        {limited.map((limit, index) => (
                            <div key={index} className="w-fit flex">
                                <span className="pr-2 md:pr-4 flex text-red-600 underline text-base md:text-2xl font-medium md:font-bold">
                                    {limit.toString()}
                                    {index < limited.length - 1 ? "," : ""}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
