import React, { useEffect, useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ComboBox from './ComboBox'
import TableForm from './TableForm'

const Search = (props) => {
    const { items, searchFunction } = props
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [desc, setDesc] = useState(0)
    const [brand, setBrand] = useState(0)
    console.log(props)
    const headerArray = ['Quantity', 'Brand', 'Description', 'price']
    return (
        <div className='w-full'>
            <div className='flex items-center gap-2 border-2 border-white p-2'>
                <div className='w-3/12'>
                    <label
                        className='text-sm font-semibold text-neutral'
                        htmlFor='minPrice'
                    >
                        Min Price
                    </label>
                    <input
                        className={`input-primary input input-sm w-full rounded-sm text-primary `}
                        name='minPrice'
                        type='number'
                        value={minPrice}
                        onChange={(event) => {
                            const value = event.target.value
                            setMinPrice(value)
                            searchFunction(value)
                        }}
                    />
                </div>
                <div className='w-3/12'>
                    <label
                        className='whitespace-nowrap text-sm font-semibold text-neutral'
                        htmlFor='minPrice'
                    >
                        Max Price
                    </label>
                    <input
                        className={`input-primary input input-sm w-full rounded-sm text-primary `}
                        name='maxPrice'
                        type='number'
                        value={maxPrice}
                    />
                </div>
                <div className=''>
                    <label className='text-sm font-semibold text-neutral'>
                        Brand name
                    </label>
                    <ComboBox />
                </div>
            </div>
            {items ? (
                <TableForm body={items.items} header={headerArray} />
            ) : (
                <span className='loading loading-spinner loading-lg'></span>
            )}
        </div>
    )
}

export default Search
