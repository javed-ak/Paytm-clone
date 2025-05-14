import Avatar from "./Avatar";

export default function Appbar() {
    return (
        <div className="bg-gray-100">
            <div className="container m-auto p-5 flex justify-between">
                <div className="font-bold text-2xl font-[aclonica]">
                    <span className="text-sky-600">Pay</span><span className="text-blue-900">tm</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="font-bold text-md">Hello, Javed</div>
                    <div>
                        <Avatar user={"Javed"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}