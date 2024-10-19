import { Fetching } from "../../api/BlynkApi"

export const OptimalPh = (props) => {

    const {optimalPH} = Fetching();
    console.log(optimalPH)

    return (
        <>
            <div className="flex flex-col p-4 md:p-0 items-start bg-white rounded-lg md:items-center">
                <h1 className="text-lg md:text-2xl font-medium mb-2 md:mb-5">
                    pH Level
                </h1>
                <div className="text-start   md:text-center">
                    <h2 className={`text-3xl md:text-5xl font-semibold mb-2 md:mb-5 ${
                        optimalPH === 1 ? "text-secondary" : "text-alert"
                    }`}>
                        <span>{optimalPH === 1 ? ">" : "<"}</span>
                        9 <span>pH</span>
                    </h2>
                    <p className="text-sm md:text-lg flex gap-2 font-medium">
                        Status : 
                        <span className={`${
                            optimalPH === 1 ? "text-secondary" : "text-alert"
                        }`}>
                            {optimalPH === 1? "Optimal" : "Not Optimal"}
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}