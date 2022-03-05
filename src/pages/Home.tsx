import { useEffect, useState } from "react"
import Donut from "../components/Donut"
import Logo from "../components/Logo"
import Print from "../components/Print"
import Wave2 from "../components/Wave2"
import useInterval from "../hooks/useInterval"


export default () => {
    const [humidity, setHumidity] = useState(Math.random() * 100)
    useInterval(() => {
        setHumidity(Math.random() * 70+30)
    }, 2000)

    return (
        <>
            <div className="bg-slate-50 pt-3">
                <div className="container">
                    <nav className="p-2 flex items-center justify-between">
                        <Logo></Logo>
                        <div className="flex items-center justify-between">
                            <a href="/login" className="button-r group flex items-center rounded-md border border-slate-500 text-slate-500 hover:border-slate-400 hover:text-slate-400 text-sm font-medium px-4 py-2 shadow-sm mx-5">
                                Login
                            </a>
                            <a href="/signup" className="hover:bg-slate-700 button-r group flex items-center rounded-md bg-slate-800 text-white text-sm font-medium pl-3.5 pr-6 py-2.5 shadow-sm">
                                <svg width="20" height="20" fill="currentColor" className="mr-1" aria-hidden="true">
                                    <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                                </svg>
                                Signup
                            </a>
                        </div>
                    </nav>
                    <div className="px-5 relative z-10 mt-24 text-slate-700">
                        <div className="md-container text-center">
                            <div className="text-5xl font-extrabold">
                                API service for your projects
                            </div>
                            <div className="mt-6 text-xl text-slate-500">
                                Connect to your IOT projects realtime, With our API and websocket <br />
                                make your projects online Now, for Free.
                            </div>
                            <div className="flex justify-center mt-12">
                                <a href="/signup" className="hover:bg-slate-700 button-r group flex items-center rounded-md bg-slate-800 text-white text-sm font-medium pl-3.5 pr-6 py-3 shadow-sm">
                                    <svg width="20" height="20" fill="currentColor" className="mr-1" aria-hidden="true">
                                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                                    </svg>
                                    Signup
                                </a>
                                <a href="/APIs" className="button-x group flex items-center rounded-md border hover:border-slate-400 hover:text-slate-400 border-slate-500 text-slate-500 text-sm font-medium px-6 py-2 shadow-sm ml-7">
                                    APIs Docs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center -mt-12">
                    <div className="absolute w-full h-full">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0" />
                                </pattern>
                                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <rect width="80" height="80" fill="url(#smallGrid)" />
                                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="0.2" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                    <div className="absolute w-full h-2/3 bg-gradient-to-b from-slate-50 to-transparent"></div>
                    <div className="absolute w-1/2 h-1/2 bg-gradient-to-b from-slate-50 via-slate-50 to-transparent rounded-full"></div>
                    <div className="wave wave1 relative"></div>
                </div>
            </div>
            <div className="relative">
                <div className="absolute w-full h-full">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" strokeWidth="0" />
                            </pattern>
                            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                <rect width="80" height="80" fill="url(#smallGrid)" />
                                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="0.2" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                {/* <div className="absolute w-full h-full bg-gradient-to-t from-white via-transparent to-transparent"></div> */}
                <Wave2></Wave2>
            </div>
            <div className="container">
                <div className="w-72 my-10 mx-auto">
                    <Donut data={[
                        {
                            label: 'Data',
                            value: humidity,
                            color: 'DeepSkyBlue'
                        },
                        {
                            label: 'Data',
                            value: 100-humidity,
                            color: 'transparent'
                        },
                    ]} config={{ label: false }}></Donut>
                </div>
            </div>
            <footer>
                <div className='text-xs text-center'>©{`2022${(new Date()).getFullYear() != 2022 ? '-' + new Date().getFullYear() : ''}`} boon4681, Passwich Thongruang</div>
            </footer>
        </>
    )
}