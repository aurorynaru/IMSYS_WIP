import React, { useEffect, useState } from 'react'
import { background } from '../functions/background'

const TableForm = (props) => {
    const header = props.header
    const body = props.body
    const {
        sortPrice,
        sortPriceFunction,
        sortQuantityFunction,
        sortBrandFunction,
        sortDescFunction,
        searchFunction,
        setFieldValue,
        setTotalQuantity
    } = props
    const [headerArray, setHeader] = useState([])
    const [bodyArray, setBodyArray] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [bodyData, setBodyData] = useState([])

    const [selectedColumn, setSelectedColumn] = useState(null)

    const resetFunction = (functionName) => {
        const functionArray = [
            sortQuantityFunction,
            sortPriceFunction,
            sortBrandFunction,
            sortDescFunction
        ]
        functionArray.forEach((func) => {
            if (func != functionName) {
                func('')
            }
        })

        searchFunction()
    }

    useEffect(() => {
        if (headerArray.length > 0) {
            const updatedHeaderData = headerArray.map((header) => {
                if (header === 'Price') {
                    return (
                        <th
                            className='cursor-pointer text-primary '
                            onClick={() => {
                                resetFunction(sortPriceFunction)
                                sortPriceFunction((prev) =>
                                    prev === 'desc' ? 'asc' : 'desc'
                                )
                            }}
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }

                if (header === 'Quantity') {
                    return (
                        <th
                            className='cursor-pointer text-primary '
                            onClick={() => {
                                resetFunction(sortQuantityFunction)
                                sortQuantityFunction((prev) =>
                                    prev === 'desc' ? 'asc' : 'desc'
                                )
                            }}
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }

                if (header === 'Brand') {
                    return (
                        <th
                            className='cursor-pointer text-primary '
                            onClick={() => {
                                resetFunction(sortBrandFunction)
                                sortBrandFunction((prev) =>
                                    prev === 'desc' ? 'asc' : 'desc'
                                )
                            }}
                            key={header}
                        >
                            {header}
                        </th>
                    )
                }

                if (header === 'Description') {
                    return (
                        <th
                            className='cursor-pointer text-primary '
                            onClick={() => {
                                resetFunction(sortDescFunction)
                                sortDescFunction((prev) =>
                                    prev === 'desc' ? 'asc' : 'desc'
                                )
                            }}
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
                const { description, quantity, price, brand } = body

                return (
                    <tr
                        onClick={() => {
                            if (selectedColumn != body._id) {
                                setSelectedColumn(body._id)
                                setFieldValue('description', description)
                                setFieldValue('unitPrice', price)
                                setFieldValue('quantity', 0)
                                setFieldValue('unit', '')
                                setFieldValue('amount', 0)
                                setTotalQuantity(quantity)
                            } else {
                                setSelectedColumn(null)
                                setFieldValue('description', '')
                                setFieldValue('unitPrice', 0)
                            }
                        }}
                        key={body._id}
                        className={` ${
                            selectedColumn === body._id && 'bg-neutral'
                        } ${background(index)}
                       cursor-pointer text-sm`}
                    >
                        <th>{quantity}</th>
                        <td>{brand}</td>
                        <td className='overflow-auto'>{description}</td>
                        <td>{price}</td>
                    </tr>
                )
            })
            setBodyData(updatedBodyData)
        }
    }, [bodyArray, selectedColumn])

    useEffect(() => {
        if (header != null) {
            setHeader(header)
        }

        if (body != null && body != undefined) {
            setBodyArray(body)
        }
    }, [header, body])

    return (
        <div className='sat'>
            <div className='w-full overflow-auto'>
                <table className='table'>
                    <thead>
                        <tr className=' bg-base-200'>
                            {headerData ? headerData : <th>yp</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyData.length > 0 ? (
                            bodyData
                        ) : (
                            <tr className='bg-base-100 text-sm'>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td className='overflow-auto'>
                                    Quality Control Specialist
                                </td>
                                <td>Blue</td>
                                <td>0</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableForm
