import { Notif } from "./Notif"
import {Profile} from "./Profile"
import {CheckStatus} from './../../../api/BlynkApi'

export const Header = () => {
    return ( 
        <>
            <div className="m-4 my-4 md:ml-72 md:px-6 md:py-2 flex justify-between items-center">
                <div className="flex gap-1 md:gap-4 items-start md:items-center flex-col md:flex-row">
                    <h1 className="text-lg md:text-3xl font-medium md:font-light">Welcome, <span>P'didy</span>!</h1>
                    <CheckStatus />
                </div>
                <div className="flex items-center gap-3 md:gap-5">
                    <Notif/>
                    <Profile/>
                </div>
            </div>
        </>
    )
}