import { RecoilRoot } from "recoil";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";

export default function Dashboard() {
    return (
        <div>
            <RecoilRoot>
            <Appbar />
            <Balance balance={'10,000'}/>
            </RecoilRoot>
            <Users />
        </div>
    )
}