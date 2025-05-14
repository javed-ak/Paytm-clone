import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="shadow-lg max-w-lg p-5 lg:p-10 rounded">
                <div>
                    <Header label={"Sign Up"} />
                    <SubHeading text={"Enter your details to create an account"} />
                    <div className="my-5">
                        <InputBox onChange={e => setFirstName(e.target.value)} type={'text'} label={'First Name'} placeholder={'John'}/>
                        <InputBox onChange={e => setLastName(e.target.value)} type={'text'} label={'Last Name'} placeholder={'Duo'}/>
                        <InputBox onChange={e => setUsername(e.target.value)} type={'email'} label={'Email'} placeholder={'john.duo@example.com'}/>
                        <InputBox onChange={e => setPassword(e.target.value)} type={'password'} label={'Password'} placeholder={'Your Password'}/>
                    </div>
                    <Button label={'Sign Up'} onClick={ async() => {
                        const userData = await axios.post('http://localhost:3000/api/v1/user/signup', {
                            firstName,
                            lastName,
                            username,
                            password
                        })
                        localStorage.setItem('token', userData.data.token)
                        navigate('/dashbaord')
                    }}/>
                    <BottomWarning text={'Already have an account?'} linkText={'Sign in'} to={'/signin'}/>
                </div>
            </div>
        </div>
    )
}