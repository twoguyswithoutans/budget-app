interface OverlayInputProps {
		title?: string;
		currency?: string;
		type: string;
		placeholder?: string;
		value: (string | number);
		handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OverlayInput({title, currency, type, placeholder, value, handleChange}: Readonly<OverlayInputProps>) {
	return (
		<div className="rounded-xl border w-full md:w-1/2 h-16 md:h-24 mb-5 pr-5 md:px-5 flex items-center bg-content-secondary focus-within:ring-2 focus-within:ring-content-secondary ring-offset-2 ring-offset-content">
			{title && <div className="px-5 text-sm font-semibold text-secondary">{title}</div>}
			{currency &&
				<span className="px-1 text-black text-xl font-semibold text-content-secondary_foreground">{currency}</span>
			}
			<input
				className="w-full h-full bg-transparent text-sm md:text-lg font-semibold focus:outline-none focus:bg-transparent text-content-primary" type={type} placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required
			/>
		</div>
	)
}
