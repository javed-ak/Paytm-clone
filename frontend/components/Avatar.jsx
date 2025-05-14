export default function Avatar({user}) {
    const firstLetter = user[0];
    return (
        <div className="p-1 bg-sky-600 text-white h-10 w-10 rounded-full flex justify-center items-center font-medium text-lg">{firstLetter}</div>
    )
}