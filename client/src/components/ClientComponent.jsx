import React, { useState, useEffect } from 'react'

const ClientComponent = ({ setRes, res, query, setInvoiceData }) => {
    const [isLoadingClient, setIsLoadingClient] = useState(false)

    const handleSearchClient = async () => {
        if (query) {
            const newQuery = query.replace(/\s/g, '')
            if (newQuery.length > 0) {
                const response = await fetch(
                    `http://localhost:8888/api/client/${query}`,
                    {
                        method: 'GET'
                    }
                )

                const newSearch = await response.json()

                setRes(newSearch)
                setIsLoadingClient(false)
            }
        } else {
            setRes([])
            setIsLoadingClient(false)
        }
    }

    useEffect(() => {
        handleSearchClient()
    }, [query])

    const element = res.length > 0 && (
        <div className='max-w-3/4 top-50 absolute z-40 flex h-fit  max-h-[180px]  w-4/12 flex-col items-center  overflow-auto rounded-md  border-2  bg-base-300 p-2 shadow-lg'>
            {res.map((elem) => {
                if (elem) {
                    return (
                        <div
                            onClick={() => {
                                setInvoiceData(elem.invoice)
                            }}
                            className='flex h-fit min-h-fit w-full  cursor-pointer items-center justify-between rounded-md p-1 text-sm font-medium text-primary hover:bg-neutral hover:text-accent'
                            key={elem.id}
                        >
                            <p>{elem.name}</p>
                        </div>
                    )
                }
            })}
        </div>
    )

    return <React.Fragment>{element} </React.Fragment>
}

export default ClientComponent
