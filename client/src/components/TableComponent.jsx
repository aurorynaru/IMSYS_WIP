import React, { useEffect, useState } from 'react'
import { background } from '../functions/background'

const TableComponent = ({ data, header, page, setInvoiceData }) => {
    const [body, setBody] = useState([])

    useEffect(() => {
        if (page === 'invoice') {
            setBody((prev) => {
                const element = data.map((elem, index) => {
                    const {
                        status,
                        address,
                        clientName,
                        invoice_number,
                        date_created,
                        due_date,
                        totalAmountDue,
                        _id
                    } = elem
                    return (
                        <tr
                            key={_id}
                            className={`${background(
                                index
                            )}cursor-pointer text-sm`}
                        >
                            <th>{status}</th>
                            <td>{invoice_number}</td>
                            <td>{clientName}</td>
                            <td className='overflow-auto'>{address}</td>
                            <td>{totalAmountDue}</td>
                            <td>{date_created.split('T')[0]}</td>
                            <td>{due_date.split('T')[0]}</td>
                        </tr>
                    )
                })

                return element
            })
        }

        if (page === 'client') {
            setBody((prev) => {
                const element = data.map((elem, index) => {
                    const {
                        name,
                        address,
                        credit_limit,
                        credit_used,
                        terms,
                        tin,
                        id
                    } = elem

                    return (
                        <tr
                            onClick={() => {
                                setInvoiceData(elem.invoice)
                            }}
                            key={id}
                            className={`${background(
                                index
                            )}cursor-pointer text-sm hover:bg-neutral`}
                        >
                            <td>{name}</td>
                            <td>{credit_limit}</td>
                            <td>{credit_used}</td>
                            <td className='flex flex-col overflow-auto whitespace-pre-line'>
                                {address.map((elem, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={`${background(
                                                index - 1
                                            )}  border-2 border-base-200`}
                                        >
                                            {elem.address}
                                        </span>
                                    )
                                })}
                            </td>
                            <td>{terms}</td>
                            <td>{tin}</td>
                        </tr>
                    )
                })

                return element
            })
        }
    }, [data])

    return (
        <div className='sat'>
            <div className='max-h-[640px] min-h-[440px] w-full overflow-auto'>
                <table className='table'>
                    <thead>
                        <tr className=' bg-base-200'>
                            {header &&
                                header.map((elem, index) => {
                                    return (
                                        <th
                                            className='cursor-pointer text-primary '
                                            key={index}
                                        >
                                            {elem}
                                        </th>
                                    )
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {body.length > 0 ? (
                            body
                        ) : (
                            <tr className='bg-base-100 text-sm'></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableComponent
