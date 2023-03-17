export default function Button({
    label, 
    secondary, 
    fullWidth, 
    onClick, 
    large, 
    disabled, 
    outline 
}) {
    return(
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-white' : 'bg-pink-700'}
                ${secondary ? 'text-black' : 'text-black'}
                ${secondary ? 'border-black' : 'border-pink-700'}
                ${large ? 'text-xl' : 'text-md'}
                ${large ? 'px-5' : 'px-4'}
                ${large ? 'py-3' : 'py-2'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
            `}
        >
            {label}
        </button>
    )
}