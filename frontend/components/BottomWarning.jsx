import { Link } from "react-router-dom";

export default function BottomWarning({text, linkText, to}) {
    return (
        <div className="flex gap-1 my-2 text-sm justify-center">
            <div>{text}</div>
            <Link to={to} className="underline text-sky-600">{linkText}</Link>
        </div>
    )
}