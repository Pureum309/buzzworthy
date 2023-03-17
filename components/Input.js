export default function Input({
    placeholder,
    value,
    type = "text",
    onChange,
    disabled,
    label
}) {
    return (
        <div className="w-full">
            { label && <p className="text-xl text-space-black font-semibold mb-2">{label}</p> }
            <input
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={type}
                className="
                    w-full
                    p-4 
                    text-lg 
                    bg-beige 
                    border-2
                    border-neutral-800 
                    rounded-md
                    outline-none
                    text-space-black
                    focus:border-pink-900
                    focus:border-2
                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                "
            />
        </div>
    )
}