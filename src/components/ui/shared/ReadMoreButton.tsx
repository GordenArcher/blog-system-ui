import { Link } from 'react-router-dom'

interface Props {
    to: string;
    text: string;
    bg?: string;
    cl?: string;
}

const ReadMoreButton = ({ to, text, cl, bg }: Props) => {
    return (
        <Link to={to} className={`px-6 py-3 rounded duration-150 ease-linear border font-semibold border-[#7C4EE4] ${bg? bg : "bg-white"} ${cl ? cl : "text-[#7C4EE4]"} font-sans text-[16px]`}>{text || "Read more"}</Link>
    )
}

export default ReadMoreButton