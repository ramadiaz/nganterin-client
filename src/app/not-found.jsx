'use client'

import { Button, Image } from "@nextui-org/react"

const Page = () => {
    return (
        <div className="flex flex-row h-[calc(100vh_-84px)] w-full max-w-4xl mx-auto items-center justify-center text-slate-800 text-opacity-90">
            <div className="w-1/2 space-y-2">
                <h1 className="text-4xl font-bold">Ooops...</h1>
                <h2 className="text-3xl font-thin">Page not found</h2>
                <p className="">
                    The page you are looking for doesn't exist or something went wrong, go back to home page
                </p>
                <Button variant="flat" className="bg-gradient-to-r from-sky-400 to-sky-600 text-white" onClick={() => window.location.replace("/")}>
                    Home
                </Button>
            </div>
            <div className="w-1/2 flex items-center justify-center h-auto">
                <Image
                    src="/images/others/error-404.png"
                    width={400}
                    alt="not-found image"
                    referrerPolicy="no-referrer"
                />
            </div>
        </div>
    )
}

export default Page