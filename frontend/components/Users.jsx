import { useEffect, useState } from "react"
import InputBox from "./InputBox"
import Avatar from "./Avatar"
import Button from "./Button"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const getData = setTimeout(async () => {
            await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(res => {
                setUsers(res.data.user)
            })
        }, 500);
        return () => clearTimeout(getData);
    }, [filter])

    return (
        <div className="m-4 p-5 shadow-md rounded flex flex-col gap-2">
            <div className="font-bold text-lg">Users</div>
            <div>
                <InputBox onChange={e => setFilter(e.target.value)} type={'text'} placeholder={'Search users...'}/>
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user}/>)}
            </div>
        </div>
    )
}

function User ({user}) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between py-2" >
            <div className="flex items-center gap-3">
                <div>
                    <Avatar user={user.firstName} />
                </div>
                <div className="">
                    <div>{user.firstName} {user.lastName}</div>
                </div>
            </div>
            <div>
                <Button label={"Send Money"} onClick={() => {
                    navigate(`/send?id=${user._id}&firstName=${user.firstName}`)
                }}/>
            </div>
        </div>
    )
}