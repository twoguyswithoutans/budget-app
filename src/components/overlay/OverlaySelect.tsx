interface OverlaySelectProps {
    title: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    optionTitle: string;
    options: { [key: string]: string };
}

export default function OverlaySelect({title, value, handleChange, optionTitle, options}: Readonly<OverlaySelectProps>) {
  return (
    <div className="rounded-xl border w-full md:w-1/2 h-16 md:h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
        <div className="px-5 text-sm font-semibold text-secondary">{title}</div>
        <select
            required
            value={value}
            onChange={handleChange}
            className="rounded-xl w-full h-full flex items-center text-sm md:text-base font-semibold bg-content-secondary focus:outline-none focus:bg-transparent text-content-primary"
        >
            <option value="" disabled>{optionTitle}</option>
            {Object.keys(options).map((item: string) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
  )
}
