export default function Balance({balance}) {
    return (
        <div className="m-4 p-5 shadow-md rounded flex gap-2">
            <div className="font-bold text-lg">
                Your Balance:
            </div>
            <div className="font-medium text-lg">
                Rs {balance}
            </div>
        </div>
    )
}