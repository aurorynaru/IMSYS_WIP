import React, { useEffect, useState } from 'react'
import { background } from '../functions/background'

const Table = (props) => {
    const [headerArray, setHeader] = useState([
        'Quantity',
        'Unit',
        'Description',
        'Unit Price',
        'Amount'
    ])
    const [bodyArray, setBodyArray] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [bodyData, setBodyData] = useState([])
    const [selectedColumn, setSelectedColumn] = useState(null)
    const body = props.selectedItems

    const {
        setSelectedItems,
        setFieldValue,
        unit,
        description,
        quantity,
        unitPrice,
        amount
    } = props

    useEffect(() => {
        if (headerArray.length > 0) {
            const updatedHeaderData = headerArray.map((header) => {
                if (header === 'Quantity') {
                    return (
                        <th
                            className='cursor-pointer text-center text-primary'
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }

                if (header === 'Unit') {
                    return (
                        <th
                            className='cursor-pointer text-center text-primary'
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }

                if (header === 'Description') {
                    return (
                        <th
                            className='cursor-pointer text-center text-primary'
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }

                if (header === 'Unit Price') {
                    return (
                        <th
                            className='cursor-pointer text-center text-primary'
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }
                if (header === 'Amount') {
                    return (
                        <th
                            className='cursor-pointer text-center text-primary'
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }
            })
            setHeaderData(updatedHeaderData)
        }
    }, [headerArray])

    useEffect(() => {
        if (bodyArray.length > 0) {
            const updatedBodyData = bodyArray.map((body, index) => {
                const {
                    description,
                    quantity,
                    price,
                    unit,
                    unitPrice,
                    amount
                } = body

                return (
                    <tr
                        onClick={() => {
                            if (selectedColumn != body._id) {
                                setSelectedColumn(body._id)
                            } else {
                                setSelectedColumn(null)
                            }
                        }}
                        key={description}
                        className={` ${
                            selectedColumn === body._id && 'bg-neutral'
                        } ${background(index)}
                       cursor-pointer text-sm`}
                    >
                        <th className=' pl-0 pr-0  text-center'>{quantity}</th>
                        <td className='text-center'>{unit}</td>
                        <td className='overflow-auto'>{description}</td>
                        <td className='text-center'>{unitPrice}</td>
                        <td className='text-center'>{amount}</td>
                    </tr>
                )
            })

            setBodyData(updatedBodyData)
        }
    }, [bodyArray])

    useEffect(() => {
        if (body != null && body != undefined) {
            setBodyArray(body)
        }
    }, [body])

    return (
        <div className='sat'>
            <div className='sat bg-neutral p-2'>
                <p className='font-bold text-primary'>Items table</p>
            </div>
            {bodyData.length > 0 ? (
                <div className='sat'>
                    <div className='w-full overflow-auto'>
                        <table className='table'>
                            <thead>
                                <tr className=' bg-base-200'>
                                    {headerData ? headerData : <th>yp</th>}
                                </tr>
                            </thead>
                            <tbody>{bodyData}</tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className='flex w-full items-center justify-center bg-base-200 p-2'>
                    <p className='font-bold text-primary'>Please add items</p>
                </div>
            )}
        </div>
    )
}

export default Table
