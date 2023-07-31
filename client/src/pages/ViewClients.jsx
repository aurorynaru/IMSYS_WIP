import React, { useState, useEffect } from 'react'
import ClientComponent from '../components/ClientComponent'
import Navbar from '../components/Navbar'
import TableComponent from '../components/TableComponent'

const ViewClients = () => {
    const [res, setRes] = useState([])
    const [query, setQuery] = useState('')
    const [invoiceData, setInvoiceData] = useState([])
    const [invoiceDataRes, setInvoiceDataRes] = useState([])

    const handleSubmit = async () => {
        const response = await fetch(`${ipAddress}/api/invoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoiceData)
        })

        const responseData = await response.json()
        if (responseData.error) {
            console.log('error')
        }

        if (responseData) {
            setInvoiceDataRes(responseData)
        }
    }

    useEffect(() => {
        if (invoiceData.length > 0) {
            handleSubmit()
        }
    }, [invoiceData])

    return (
        <main className='min-h-screen'>
            <Navbar />
            <div className='w-full px-5'>
                <div className=' mt-4 w-fit rounded border-2 bg-base-200 '>
                    <input
                        className='input-primary input input-sm rounded-sm text-primary '
                        onChange={(event) => {
                            const value = event.target.value

                            setQuery(value)
                        }}
                    ></input>

                    {/* {res && (
                        <ClientComponent
                            setRes={setRes}
                            setInvoiceData={setInvoiceData}
                            query={query}
                            res={res}
                        />
                    )} */}
                </div>
                <div className='mt-5 flex flex-col gap-4 '>
                    <div className='border-2  border-base-200'>
                        <TableComponent
                            setInvoiceData={setInvoiceData}
                            data={res}
                            header={[
                                'name',
                                'credit_limit',
                                'credit_used',
                                'address',
                                'terms',
                                'tin'
                            ]}
                            page={'client'}
                        />
                    </div>

                    {invoiceDataRes && (
                        <div className='border-2  border-base-200'>
                            <TableComponent
                                data={invoiceDataRes}
                                header={[
                                    'Status',
                                    'Invoice Number',
                                    'Client',
                                    'address',
                                    'Total Amount',
                                    'Date created',
                                    'Due Date'
                                ]}
                                page={'invoice'}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ViewClients
