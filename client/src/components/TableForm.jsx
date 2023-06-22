import React from 'react'

const TableForm = () => {
    return (
        <div className='w-full overflow-auto'>
            <table className='table'>
                <thead>
                    <tr className='bg-base-200 '>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-base-100 text-sm'>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td className='overflow-auto'>
                            Quality Control Specialist
                        </td>
                        <td>Blue</td>
                        <td>0</td>
                    </tr>
                    <tr className='bg-base-100 text-sm'>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td className='overflow-auto'>
                            Quality Control Specialist
                        </td>
                        <td>Blue</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableForm
