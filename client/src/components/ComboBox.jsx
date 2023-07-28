import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'

const ComboBox = ({ array, setFieldValue }) => {
    const dataArray = array.map((elem) => {
        const newObj = {}
        for (const key in elem) {
            if (key != 'id') {
                newObj.name = elem[key]
            } else if (key === 'id') {
                newObj.id = elem[key]
            }
        }
        return newObj
    })

    const [selected, setSelected] = useState(dataArray[0])

    return (
        <div className=' z-40 w-full  '>
            <Listbox value={selected} onChange={setSelected}>
                <div className='relative'>
                    <Listbox.Button className='relative w-full cursor-default rounded-md rounded-t-none bg-base-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                        <span className='block truncate'>{selected.name}</span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <ChevronUpDownIcon
                                className='h-5 w-5 text-primary'
                                aria-hidden='true'
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-sm border-2 border-neutral bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {dataArray.map((elem, index) => (
                                <Listbox.Option
                                    key={index}
                                    onClick={() => {
                                        setFieldValue('address', '')
                                        setFieldValue('address', elem.name)
                                    }}
                                    className={({ active }) =>
                                        `relative min-w-full cursor-default select-none px-2 py-2 ${
                                            active
                                                ? 'bg-neutral text-primary'
                                                : 'text-primary'
                                        }`
                                    }
                                    value={elem}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block px-2 text-sm ${
                                                    selected
                                                        ? 'bg-neutral font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {elem.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default ComboBox
