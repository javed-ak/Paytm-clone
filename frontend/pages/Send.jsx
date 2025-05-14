import { useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { ToastContainer, toast } from 'react-toastify';

export default function Send() {
    const [paramData] = useSearchParams()
    const id = paramData.get("id");
    const firstName = paramData.get("firstName");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="shadow-lg lg:min-w-lg p-5 lg:p-10 rounded flex flex-col gap-3 border border-gray-200">
                <Header label={"Send Money"}/>
                <div className="flex gap-2 items-center">
                    <Avatar user={firstName} />
                    <div className="font-bold text-xl">{firstName}</div>
                </div>
                <div>
                    <InputBox label={"Amount (in Rs)"} placeholder={'Enter amount'} onChange={e => setAmount(e.target.value)} />
                </div>
                <div>
                    <Button label={"Initiate Transfer"} onClick={async () => {
                        const transfer = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                            to: id,
                            amount: amount
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        toast("Money send successfully")
                        setTimeout(() => {
                            navigate('/dashboard')
                        }, 5000);
                    }}/>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}