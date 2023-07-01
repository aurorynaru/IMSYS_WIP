import React, { useEffect, useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ComboBox from './ComboBox'
import TableForm from './TableForm'
import Pagination from './Pagination'

const Search = (props) => {
    const {
        items,
        searchFunction,
        minPrice,
        maxPrice,
        minFunction,
        maxFunction,
        sortPrice,
        setBrand,
        setDesc,
        sortPriceFunction,
        sortQuantity,
        sortQuantityFunction,
        sortDescFunction,
        sortBrandFunction,
        brandNameSearch,
        setBrandNameSearch,
        descSearch,
        setDescSearch,
        setPage,
        setFieldValue,
        setTotalQuantity
    } = props

    const headerArray = ['Quantity', 'Brand', 'Description', 'Price']

    return (
        <div className='w-full'>
            <div className='flex flex-col items-center gap-2 border-2 border-white p-2'>
                <div className='flex gap-2'>
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
                                minFunction(value)
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
                            onChange={(event) => {
                                const value = event.target.value
                                maxFunction(value)
                            }}
                        />
                    </div>
                    <div className=''>
                        <label className='text-sm font-semibold text-neutral'>
                            Brand name
                        </label>
                        <input
                            className={` input-primary input input-sm w-full rounded-sm text-primary`}
                            value={brandNameSearch}
                            onChange={(event) => {
                                const value = event.target.value
                                setBrandNameSearch(value)
                                setBrand(value)
                            }}
                            id='client'
                            placeholder='Enter client name'
                        ></input>
                    </div>
                </div>
                <div className='w-full'>
                    <label className='text-sm font-semibold text-neutral'>
                        Product description
                    </label>
                    <input
                        className={` input-primary input input-sm w-full rounded-sm text-primary`}
                        value={descSearch}
                        onChange={(event) => {
                            const value = event.target.value
                            setDescSearch(value)

                            setDesc(value)
                        }}
                        id='client'
                        placeholder='Enter Product description'
                    ></input>
                </div>
            </div>

            {items ? (
                <TableForm
                    body={items.items}
                    header={headerArray}
                    sortPrice={sortPrice}
                    sortPriceFunction={sortPriceFunction}
                    sortQuantity={sortQuantity}
                    sortQuantityFunction={sortQuantityFunction}
                    sortDescFunction={sortDescFunction}
                    sortBrandFunction={sortBrandFunction}
                    searchFunction={searchFunction}
                    setFieldValue={setFieldValue}
                    setTotalQuantity={setTotalQuantity}
                />
            ) : (
                <span className='loading loading-spinner loading-lg'></span>
            )}

            {items && (
                <Pagination
                    totalPages={items.totalPages}
                    currentPage={items.currentPage}
                    setPage={setPage}
                />
            )}
        </div>
    )
}

export default Search
