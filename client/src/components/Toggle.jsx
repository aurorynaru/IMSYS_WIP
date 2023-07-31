import React from 'react'

const Toggle = ({ label, func, toggleTo }) => {
    return (
        <div className='flex max-w-[100px] flex-col'>
            <label className='label cursor-pointer text-start '>{label}</label>
            <input
                type='checkbox'
                className='toggle'
                checked
                onChange={() => {
                    func(toggleTo)
                }}
            />
        </div>
    )
}

export default Toggle
