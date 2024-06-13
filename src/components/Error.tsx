import { PropsWithChildren } from "react"

const Error = ({ children } : PropsWithChildren) => {
    return (
        <div className="bg-red-500 text-white text-center p-2 my-4 rounded-lg font-black uppercase">
            {children}
        </div>
    )
}

export default Error
