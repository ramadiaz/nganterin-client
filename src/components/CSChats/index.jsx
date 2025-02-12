const CSChats = ({ data }) => {
    if (data.is_cs_chat) {
        return (
            <div className="mb-2 py-2 px-4 bg-gradient-to-r from-sky-500 to-sky-700 rounded-e-lg rounded-b-lg w-max">
                <p>

                    {data.message}
                </p>
                <p className={`text-2xs opacity-80`}>
                    {data.humanized_created_at}
                </p>
            </div>
        )
    } else {
        return (
            <div className="flex justify-end w-full">
                <div className="mb-2 py-2 px-4 bg-gradient-to-r from-sky-500 to-sky-700 rounded-s-lg rounded-b-lg w-max">
                    <p>
                        {data.message}
                    </p>
                    <p className={`text-2xs opacity-80`}>
                        {data.humanized_created_at}
                    </p>
                </div>
            </div>
        )
    }
}

export default CSChats