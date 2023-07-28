import React, { useEffect, useState } from 'react'
import { background } from '../functions/background'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'

const Table = (props) => {
    const [headerArray, setHeader] = useState([
        'Quantity',
        'Unit',
        'Description',
        'Unit Price',
        'Amount',
        'Buttons',
        'Delete'
    ])
    const [bodyArray, setBodyArray] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [bodyData, setBodyData] = useState([])
    const [selectedColumn, setSelectedColumn] = useState(null)
    const body = props.selectedItems

    const {
        clickedItems,
        setTotalQuantity,
        setSelectedItems,
        creditUsed,
        setCreditUsed,
        setTotalAmount,
        setUnit,
        setDescription,
        setQuantity,
        setUnitPrice,
        setAmount
    } = props

    const deleteItem = (index) => {
        setSelectedItems((prev) => {
            const newArr = prev.filter((elem, arrIndex) => {
                if (index != arrIndex) {
                    return elem
                } else {
                    const credit = creditUsed - elem.amount
                    setCreditUsed(credit)
                    setTotalAmount((prev) => prev - elem.amount)
                }
            })

            return newArr
        })
    }
    //EDIT HERE
    const editItem = (index) => {
        const { amount, description, quantity, unit, unitPrice } = body[index]

        setUnit(unit)
        setDescription(description)
        setQuantity(quantity)
        setUnitPrice(unitPrice)
        setAmount(amount)
        deleteItem(index)
    }

    useEffect(() => {
        if (headerArray.length > 0) {
            const updatedHeaderData = headerArray.map((header, index) => {
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
                if (header === 'Buttons') {
                    return (
                        <th
                            className='cursor-pointer text-center text-primary'
                            key={index}
                        >
                            {' '}
                        </th>
                    )
                }
            })
            setHeaderData(updatedHeaderData)
        }
    }, [headerArray, bodyArray])

    useEffect(() => {
        if (bodyArray.length >= 0) {
            const updatedBodyData = bodyArray.map((body, index) => {
                const { description, quantity, unit, unitPrice, amount } = body

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
                            selectedColumn === body._id && 'w-fit bg-neutral'
                        } ${background(index)}
                       cursor-pointer text-sm`}
                    >
                        <th className=' pl-0 pr-0  text-center'>{quantity}</th>
                        <td className='text-center'>{unit}</td>
                        <td className='overflow-auto'>{description}</td>
                        <td className='text-center'>{unitPrice}</td>
                        <td className='text-center'>{amount}</td>
                        <td
                            className='tooltip tooltip-top ml-1 before:text-xs'
                            data-tip='Edit'
                            onClick={() => {
                                editItem(index)
                            }}
                        >
                            <PencilSquareIcon className='h-5 w-5   text-neutral transition-transform duration-300 hover:-translate-y-1' />
                        </td>
                        <td
                            onClick={() => {
                                deleteItem(index)
                            }}
                            className='tooltip tooltip-top ml-1 before:text-xs'
                            data-tip='Delete'
                        >
                            <TrashIcon className='h-5 w-5   text-error transition-transform duration-300 hover:-translate-y-1' />
                        </td>
                    </tr>
                )
            })

            setBodyData(updatedBodyData)
        }
    }, [bodyArray, bodyArray])

    useEffect(() => {
        if (body != null && body != undefined) {
            setBodyArray(body)
        }
    }, [body])

    return (
        <div>
            <div className='bg-neutral p-2'>
                <p className='font-bold text-primary'>Items table</p>
            </div>
            {bodyData.length > 0 ? (
                <div className='w-full overflow-auto'>
                    <table className='table'>
                        <thead>
                            <tr className='w-full bg-base-200'>
                                {headerData ? headerData : <th>yp</th>}
                            </tr>
                        </thead>
                        <tbody>{bodyData}</tbody>
                    </table>
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
