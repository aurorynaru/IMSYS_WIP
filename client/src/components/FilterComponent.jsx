import React, { useState, useEffect } from 'react'

const FilterComponent = ({ setOverrideUrl, filterNames }) => {
    const [address, setAddress] = useState('')
    const [client, setClient] = useState('')
    const [invoice_number, setInvoice_Number] = useState('')
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState(0)
    const [date_created, setDate_created] = useState(null)
    const [due_date, setDue_date] = useState(null)
    const [status, setStatus] = useState('')
    const [page, setPage] = useState('')
    const [limit, setLimit] = useState('')
    const [sortPageDesc, setSortPageDesc] = useState('')

    const settersMap = {
        address: setAddress,
        client: setClient,
        Invoice_number: setInvoice_Number,
        min_amount: setMinAmount,
        max_amount: setMaxAmount,
        date_created: setDate_created,
        due_date: setDue_date,
        status: setStatus
    }

    const createUlr = () => {
        const queryParameters = {}

        const pageNumber = page
        const pageSize = 10

        if (invoice_number !== '') {
            queryParameters.invoice_number = invoice_number
        }

        if (minAmount !== '') {
            queryParameters.minAmount = minAmount
        }
        if (maxAmount !== '' && maxAmount !== 0) {
            queryParameters.maxAmount = maxAmount
        }

        if (client !== '') {
            queryParameters.client = client
        }
        if (address !== '') {
            queryParameters.address = address
        }

        if (pageNumber) {
            queryParameters.page = pageNumber
        }

        if (pageSize) {
            queryParameters.limit = pageSize
        }

        if (status) {
            queryParameters.status = status
        }

        if (sortPageDesc) {
            queryParameters.sortDesc = sortPageDesc
        }

        if (date_created) {
            queryParameters.date_created = date_created
        }

        if (due_date) {
            queryParameters.due_date = due_date
        }

        const url = new URL('http://localhost:8888/api/searchInvoice/')

        for (const param in queryParameters) {
            url.searchParams.append(param, queryParameters[param])
        }

        setOverrideUrl(url)
    }

    useEffect(() => {
        createUlr()
    }, [
        address,
        client,
        invoice_number,
        minAmount,
        maxAmount,
        date_created,
        due_date,
        status,
        page,
        limit,
        sortPageDesc
    ])
    const element = filterNames.map((name, index) => (
        <div
            key={index}
            className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 '
        >
            {Object.entries(name).map(([key, value]) => {
                const setterFunction = settersMap[key]

                return (
                    <div className='flex flex-col ' key={key}>
                        <label className='mb-1 text-sm '>
                            {key.replace('_', ' ')}
                        </label>
                        <input
                            onChange={(event) => {
                                const newValue = event.target.value
                                const stringConstruct =
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                setterFunction(newValue)
                            }}
                            type={value}
                            className='input-primary input  input-sm  rounded-sm  border text-primary'
                        />
                    </div>
                )
            })}
        </div>
    ))

    return <React.Fragment>{element}</React.Fragment>
}

export default FilterComponent
