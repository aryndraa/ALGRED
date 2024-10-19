import {Link} from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa6";

export const LinkControlCard = () => {
    return (
        <>
            <div className='bg-white rounded-lg h-full p-5 px-6 md:p-8 md:py-6 flex justify-between items-center shadow-sm'>
                <div>
                    <h2 className='text-xl md:text-2xl font-semibold mb-1 '>Control Overview</h2>
                    <h3 className='text-lg text-gray-500'>Sector Control</h3>
                </div>
                <Link to={"/control"} className='text-xl md:text-3xl p-3  border rounded-full border-neutral-500'>
                    <FaChevronRight/>
                </Link>
            </div>
        </>
    )
}