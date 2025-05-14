import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex justify-center items-center">
                    <div className="shadow-lg max-w-lg p-5 lg:p-10 rounded">
                        <div>
                            <Header label={"Login"} />
                            <SubHeading text={"Enter your details to login"} />
                            <div className="my-5">
                                <InputBox type={'email'} label={'Email'} placeholder={'john.duo@example.com'} onChange={e => setUsername(e.target.value)}/>
                                <InputBox type={'password'} label={'Password'} placeholder={'Your Password'} onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <Button label={'Login'} onClick={ async () => {
                                const user = await axios.post('http://localhost:3000/api/v1/user/signin', {
                                    username,
                                    password
                                })
                                localStorage.setItem('token', user.data.token);
                                navigate('/dashboard');
                            }}/>
                            <BottomWarning text={"Don't have an account?"} linkText={'Sign Up'} to={'/signup'}/>
                        </div>
                    </div>
                </div>
    )
}