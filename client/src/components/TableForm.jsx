import React, { useEffect, useState } from 'react'

const TableForm = (props) => {
    const [headerArray, setHeader] = useState([])
    const [bodyArray, setBodyArray] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [bodyData, setBodyData] = useState([])

    useEffect(() => {
        if (headerArray.length > 0) {
            const updatedHeaderData = headerArray.map((header) => {
                return <th key={header}>{header}</th>
            })
            setHeaderData(updatedHeaderData)
        }
    }, [headerArray])

    useEffect(() => {
        if (bodyArray.length > 0) {
            const updatedBodyData = bodyArray.map((body) => {
                return (
                    <tr key={body._id} className='bg-base-100 text-sm'>
                        <th>{body.quantity}</th>
                        <td>{body.brand}</td>
                        <td className='overflow-auto'>{body.description}</td>
                        <td>{body.price}</td>
                    </tr>
                )
            })
            setBodyData(updatedBodyData)
        }
    }, [bodyArray])

    useEffect(() => {
        if (props.header != null) {
            setHeader(props.header)
        }

        if (props.body != null && props.body != undefined) {
            setBodyArray(props.body)
        }
    }, [props.header, props.body])
    console.log(bodyArray)
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
