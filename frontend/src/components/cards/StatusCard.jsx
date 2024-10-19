export const StatusCard = (props) => {

    return (
        <>
            <div className="flex flex-col p-4 md:p-0 items-start bg-white rounded-lg md:items-center">
                <h1 className="text-lg md:text-2xl font-medium mb-2 md:mb-5">
                    {props.title}
                </h1>
                <div className="text-start   md:text-center">
                    <h2 className={`text-3xl md:text-5xl font-semibold mb-2 md:mb-5 text-${props.color}`}>
                        {props.value} <span>{props.type}</span>
                    </h2>
                    <p className="text-sm md:text-lg font-medium">
                        Status : <span className={`text-${props.color}`}>{props.status}</span>
                    </p>
                </div>
            </div>
        </>
    )
}