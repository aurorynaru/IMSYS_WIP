import React, { useEffect, useState } from 'react'
import { background } from '../functions/background'

const TableForm = (props) => {
    const header = props.header
    const body = props.body
    const {
        sortPriceFunction,
        sortQuantityFunction,
        sortBrandFunction,
        sortDescFunction,
        searchFunction,
        setTotalQuantity,
        setUnit,
        setDescription,
        setQuantity,
        setUnitPrice,
        setAmount,
        setItemId,
        setClickedItems
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
                const { description, quantity, price, brand, _id } = body

                return (
                    <tr
                        onClick={() => {
                            if (selectedColumn != body._id) {
                                setSelectedColumn(body._id)
                                setUnit('')
                                setDescription(description)
                                setQuantity(0)
                                setUnitPrice(price)
                                setAmount(0)
                                setItemId(_id)
                                setTotalQuantity(quantity)

                                setClickedItems((prev) => {
                                    const obj = {}
                                    const isMatch = prev.find(
                                        (elem) => elem.id === _id
                                    )

                                    if (!isMatch) {
                                        obj.quantity = quantity
                                        obj.id = _id
                                        obj.description = description
                                        obj.price = price

                                        return [...prev, obj]
                                    } else {
                                        return prev
                                    }
                                })
                            } else {
                                setSelectedColumn(null)
                                setDescription('')
                                setUnitPrice(0)
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
                                <td>test tester test</td>
                                <td className='overflow-auto'>
                                    Quality Control test
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
