import { FaArrowRight } from "react-icons/fa";

export const ArcticleCard = (props) => {
    return (
        <>
            <div className='p-4 bg-white rounded-lg flex flex-col justify-between gap-5 '>
                <div >
                    <div className='mb-4 max-h-52 h-52'>
                        <img src={props.img} alt="" className='w-full rounded-lg h-full object-cover' />
                    </div>
                    <div className="flex flex-col justify-between ">
                        <div >
                            <p>
                                {props.date}
                            </p>
                            <h2 className='text-lg font-semibold '>  
                                {props.title}
                            </h2>
                        </div>
                    </div>
                </div>
                <a
                 href={props.link}
                 className='flex text-primary items-center gap-2 font-medium'
                >
                    Read More <FaArrowRight />
                </a>
            </div>
        </>
    )
}

export const DailyNewsCard = (props) => {
    return ( 
        <>
            <div className='flex gap-8 p-6 rounded-lg bg-white'>
                <div className='flex-1 max-w-[50%]'>
                    <img src={props.img} alt="" className='w-full' />
                </div>
                <div className='flex-1'>
                    <p className='text-lg mb-2'>
                        {props.date}
                    </p>
                    <h2 className='text-4xl font-semibold leading-[1.4] mb-8'>  
                        {props.title}
                    </h2>
                    <a
                     href={props.link}
                     className='flex text-secondary items-center gap-2 font-medium text-lg'
                    >
                        Read More <FaArrowRight />
                    </a>
                </div>
            </div>
        </>
    )
}
