export default function InputBox({type, label, placeholder, onChange}) {
    return (
        <div className="my-2">
            <div className="font-medium text-sm mb-1">{label}</div>
            <input onChange={onChange} type={type} placeholder={placeholder} className="border border-gray-200 rounded w-full p-2 text-sm"/>
        </div>
    )
}