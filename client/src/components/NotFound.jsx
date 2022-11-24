import { Link } from "react-router-dom";

const NotFound = () => {
    return <div className="text-center mt-2">
        <div className="font-extrabold text-[120px]">404</div>
        <div className="text-[30px]">not found.</div>

        <div className="mt-4 hover:underline">
            <Link to="/">
                &lt; back to home.
            </Link>
        </div>
    </div>
}

export default NotFound;