// import { useState } from "react"
// import { format } from "date-fns"

interface OverlayProps {
    isOpen?: (value: boolean) => void;
    submitFunction?: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Overlay({ isOpen, submitFunction, title, children }: Readonly<OverlayProps>) {
    return (
        <div className="fixed top-0 left-0 w-full h-full py-0 md:py-14 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="rounded w-[90vw] h-full px-4 md:px-16 pb-10 pt-3 flex flex-col justify-start bg-background shadow-lg">
                {isOpen && <div className="pb-4 flex justify-end text-base font-black">
                    <button className="secondary-foreground" onClick={() => isOpen(false)}>close</button>
                </div>}
                <form
                    onSubmit={submitFunction}
                    className="overflow-scroll w-full h-full flex flex-col justify-between items-center"
                >
                    <div className="pb-12 flex justify-center text-2xl font-semibold text-content-secondary_foreground">{title}</div>
                    
                    <div className="sm-landscape w-full h-full flex flex-col justify-center items-center">
                        <div className="flex flex-col items-center w-full">
                            {children}
                        </div>    

                        {submitFunction && <div className="flex justify-center w-full md:w-1/2 h-16 md:h-24">
                            <button
                                type="submit"
                                className="w-full h-full py-5 font-black text-2xl rounded-lg text-center text-background bg-foreground md:hover:opacity-60 md:active:opacity-80"
                            >
                                Submit
                            </button>
                        </div>}
                    </div>
                </form>
            </div>
        </div>
    )
}
