import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <div className="relative flex items-center gap-2.5 px-3">
            <Link to={"/"}>
                <h3 className="font-black text-violet-800 text-3xl">JournIQ</h3>
            </Link>
            
        </div>
    )
}

export default Logo