import React, { useState, useEffect } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { tailWindCss } from '../tailwindcss'
import { textBlack } from '../tailwindcss'
import { errorText } from '../functions/errorText.jsx'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { generateCustomID } from '../functions/randomID'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Alert from '../components/Alert'
import { background } from '../functions/background'
import { v4 as uuidv4 } from 'uuid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { ipAddress } from '../functions/ip'
const initialValues = {
    name: '',
    credit_limit: '',
    terms: '',
    address: '',
    tin: '',
    multipleAddressValidation: false
}

const Schema = yup.object().shape({
    name: yup.string().min(2).required('required'),
    credit_limit: yup.string().required('Credit limit is required'),
    terms: yup.number().min(1).required('required'),
    address: yup
        .string()
        .when(
            'multipleAddressValidation',
            (multipleAddressValidation, schema) => {
                if (!multipleAddressValidation[0]) {
                    return schema
                        .min(5, '5 minimum characters required')
                        .required('required')
                } else {
                    return schema
                }
            }
        ),

    tin: yup
        .string()
        .min(15, 'Tin number must be at least 12 numbers.')
        .max(15, 'Tin number must be at max 12 numbers.')
        .required('Tin number is required')
})

const ClientRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [resError, setResError] = useState('')
    const [successAlert, setSuccessAlert] = useState(false)
    const [multipleAddress, setMultipleAddress] = useState([])
    const [isMultipleAddress, setIsMultipleAddress] = useState(false)

    const formatNumber = (value) => {
        value = value.replace(/\D/g, '') // Remove any non-digit characters

        if (value.length > 12) {
            value = value.slice(0, 12) // Limit the input to 12 digits
        }

        let formattedValue = ''
        let groupCount = Math.ceil(value.length / 3)

        for (let i = 0; i < groupCount; i++) {
            let startIndex = i * 3
            let endIndex = startIndex + 3
            let chunk = value.slice(startIndex, endIndex)

            if (i > 0) {
                formattedValue += '-'
            }

            formattedValue += chunk
        }

        return formattedValue
    }

    const formatCreditLimit = (value) => {
        value = value.replace(/\D/g, '') // Remove any non-digit characters

        if (value.length > 0) {
            value = value.slice(0, 12) // Limit the input to 12 digits
        }

        const formattedValue = Number(value).toLocaleString() // Convert to number and format

        return formattedValue
    }

    const deleteAddress = (index) => {
        setMultipleAddress((prev) => {
            const arr = prev.filter((elem, prevIndex) => {
                if (index != prevIndex) {
                    return elem
                }
            })

            return arr
        })
    }

    const handleSubmit = async (values, onSubmitProps) => {
        if (isMultipleAddress) {
            values.multipleAddress = multipleAddress
        } else {
            values.singleAddress = [{ address: values.address, id: uuidv4() }]
        }

        const savedClientResponse = await fetch(
            `${ipAddress}/register/client`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
        )

        const savedClient = await savedClientResponse.json()
        if (savedClient.error) {
            setResError(savedClient.error)
        }

        if (savedClient) {
            if (!savedClient.error) {
                setSuccessAlert(true)
                onSubmitProps.resetForm()
                setTimeout(() => {
                    setSuccessAlert(false)
                }, 3000)
                multipleAddress([])
                setIsMultipleAddress(false)
            }
        }
    }

    return (
        <div className='relative'>
            <Navbar />
            <Formik
                initialValues={initialValues}
                validationSchema={Schema}
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                    setFieldValue,
                    handleBlur
                }) => (
                    <Form
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        className='mx-auto my-5 flex w-1/3 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-3 shadow-lg'
                    >
                        <div className='flex flex-col gap-3 px-2  '>
                            <h1 className='text-lg font-medium '>
                                Register Client
                            </h1>
                            <div className='flex flex-col gap-1 '>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='name'
                                >
                                    Client name
                                </label>

                                <input
                                    className={` input-primary input input-sm rounded-sm text-primary ${
                                        errors.name && touched.name
                                            ? ` border-red-500 focus:ring-red-500`
                                            : ''
                                    }`}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id='name'
                                    placeholder='Client name'
                                ></input>
                                {errorText(errors.name, touched.name)}
                            </div>

                            <div className='flex flex-col gap-1 text-black'>
                                <label
                                    className='tooltip z-30 flex items-center text-left text-sm font-semibold text-neutral'
                                    htmlFor='terms'
                                >
                                    Client Terms
                                    <span
                                        className='tooltip  tooltip-right ml-1'
                                        data-tip='amount in days'
                                    >
                                        <ExclamationCircleIcon className='h-5 w-5 text-neutral' />
                                    </span>
                                </label>

                                <Field
                                    className={`input-primary input input-sm rounded-sm text-primary ${
                                        errors.terms && touched.terms
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    name='terms'
                                    type='number'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.terms}
                                />

                                {errorText(errors.terms, touched.terms)}
                            </div>

                            <div className='flex flex-col gap-1 text-black'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='credit_limit'
                                >
                                    Credit Limit
                                </label>

                                <Field
                                    className={`input-primary input input-sm rounded-sm text-primary ${
                                        errors.credit_limit &&
                                        touched.credit_limit
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    name='credit_limit'
                                    type='text'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formatCreditLimit(
                                        values.credit_limit
                                    )}
                                />
                                {errorText(
                                    errors.credit_limit,
                                    touched.credit_limit
                                )}
                            </div>
                            <div className='flex flex-col gap-1 text-black'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='credit_limit'
                                >
                                    Tin number
                                </label>
                                <Field
                                    className={`input-primary input input-sm rounded-sm text-primary ${
                                        errors.tin && touched.tin
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    name='tin'
                                    type='text'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formatNumber(values.tin)}
                                />
                                {errorText(errors.tin, touched.tin)}
                            </div>
                            <div
                                className={` ${
                                    isMultipleAddress &&
                                    multipleAddress.length > 0
                                        ? 'max-h-[300px] overflow-auto rounded-md border-[1px] border-neutral p-1 '
                                        : ''
                                }`}
                            >
                                {isMultipleAddress &&
                                multipleAddress.length > 0 ? (
                                    <div className='bg-neutral px-1'>
                                        <label className='text-primary'>
                                            Address List:
                                        </label>
                                    </div>
                                ) : (
                                    ''
                                )}

                                {isMultipleAddress && multipleAddress.length > 0
                                    ? multipleAddress.map((address, index) => {
                                          return (
                                              <div
                                                  key={address.id}
                                                  className={`flex items-center justify-between ${background(
                                                      index
                                                  )}`}
                                              >
                                                  <p
                                                      className={` whitespace-nowrap px-1 py-1 text-sm   `}
                                                  >
                                                      {`${index + 1}. ${
                                                          address.address
                                                      }`}
                                                  </p>
                                                  <button
                                                      onClick={() => {
                                                          deleteAddress(index)
                                                      }}
                                                  >
                                                      <TrashIcon className='h-5 w-5   text-error transition-transform duration-300 hover:-translate-y-1' />
                                                  </button>
                                              </div>
                                          )
                                      })
                                    : null}
                            </div>

                            <div className='flex flex-col gap-1 text-black'>
                                <div className='flex items-center justify-between'>
                                    <label
                                        className='min-h-[24px] text-sm font-semibold text-neutral'
                                        htmlFor='credit_limit'
                                    >
                                        Client Address
                                    </label>

                                    {isMultipleAddress && (
                                        <button
                                            onClick={() => {
                                                if (values.address != '') {
                                                    setMultipleAddress(
                                                        (prev) => {
                                                            const isMatch =
                                                                prev.find(
                                                                    (elem) =>
                                                                        elem.address ===
                                                                        values.address
                                                                )
                                                            if (!isMatch) {
                                                                const array = [
                                                                    {
                                                                        id: uuidv4(),
                                                                        address:
                                                                            values.address
                                                                    }
                                                                ]

                                                                return [
                                                                    ...prev,
                                                                    ...array
                                                                ]
                                                            } else {
                                                                console.log(
                                                                    'duplicate'
                                                                )
                                                                return prev
                                                            }
                                                        }
                                                    )
                                                    setFieldValue('address', '')
                                                }
                                            }}
                                            type='button'
                                        >
                                            <span className='flex cursor-pointer items-center text-xs font-medium text-primary'>
                                                Add address
                                                <PlusCircleIcon className='h-6 w-6 text-neutral' />
                                            </span>
                                        </button>
                                    )}
                                </div>

                                <textarea
                                    className={`input-primary input input-sm h-20 rounded-sm leading-relaxed text-primary ${
                                        errors.address && touched.address
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    type='text'
                                    value={values.address}
                                    onChange={handleChange}
                                    name='address'
                                    id='address'
                                    placeholder='Client Address'
                                    onBlur={handleBlur}
                                ></textarea>
                                {errors.address && touched.address
                                    ? errorText(errors.address, touched.address)
                                    : null}
                                <div className='flex'>
                                    <label className='label cursor-pointer'>
                                        <span className='label-text'>
                                            Client multiple address
                                        </span>
                                        <Field
                                            onChange={() => {
                                                setIsMultipleAddress(
                                                    (prev) => !prev
                                                )
                                                setFieldValue(
                                                    'multipleAddressValidation',
                                                    !values.multipleAddressValidation
                                                )
                                            }}
                                            name='multipleAddressValidation'
                                            type='checkbox'
                                            checked={
                                                isMultipleAddress
                                                    ? 'checked'
                                                    : ''
                                            }
                                            className='checkbox checkbox-sm mx-2'
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <p
                            className={`w-full text-center text-sm text-red-500 ${
                                resError ? '' : 'invisible'
                            }`}
                        >
                            {resError ? resError : 'error'}
                        </p>

                        <button
                            className='btn2 relative overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider '
                            type='submit'
                        >
                            <span className='absolute inset-0 bg-neutral'></span>
                            <span className='absolute inset-0 flex  items-center justify-center  text-primary'>
                                Register Client
                            </span>
                            Register Client
                        </button>
                    </Form>
                )}
            </Formik>
            {successAlert && <Alert text='Client saved!' />}
        </div>
    )
}

export default ClientRegister
