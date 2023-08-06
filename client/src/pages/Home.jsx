import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import FilterComponent from '../components/FilterComponent'
import TableComponent from '../components/TableComponent'
import Pagination from '../components/Pagination'
import { ipAddress } from '../functions/ip'
const Home = () => {
    const dispatch = useDispatch()
    const invoice = useSelector((state) => state.invoice)
    const [overrideUrl, setOverrideUrl] = useState({})
    const [page, setPage] = useState(1)
    const [overrideRes, setOverrideRes] = useState(null)

    const handleSearch = async () => {
        const queryParameters = {}

        if (page) {
            queryParameters.page = page
        }

        const url = new URL(overrideUrl)

        for (const param in queryParameters) {
            url.searchParams.append(param, queryParameters[param])
        }

        try {
            const response = await fetch(url, {
                method: 'GET'
            })
            if (response.ok) {
                const newSearch = await response.json()
                setOverrideRes(newSearch)
            } else {
                console.error('Error:', response.status)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [overrideUrl, page])

    console.log(overrideRes)

    return (
        <main className='min-h-screen'>
            <Navbar />
            <div className='w-full px-5'>
                <div className='mx-auto mt-4 w-fit rounded border-2 bg-base-200 p-2 pb-3'>
                    <FilterComponent
                        setOverrideUrl={setOverrideUrl}
                        filterNames={[
                            {
                                address: 'string',
                                Invoice_number: 'number',
                                min_amount: 'number',
                                max_amount: 'number',
                                client: 'string',
                                status: 'string',
                                date_created: 'date',
                                due_date: 'date'
                            }
                        ]}
                    />
                    {overrideRes && (
                        <TableComponent
                            data={overrideRes.invoices}
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
                    )}

                    {overrideRes && (
                        <Pagination
                            totalPages={overrideRes.totalPages}
                            currentPage={overrideRes.currentPage}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}
export default Home
