export default function Button({label, onClick}) {
    return (
        <button onClick={onClick} className="bg-sky-600 w-full text-white py-2 px-5 rounded-lg hover:scale-105 transition-all">{label}</button>
    )
}