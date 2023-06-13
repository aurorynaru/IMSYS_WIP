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

const ClientRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [resError, setResError] = useState('')

    const initialValues = {
        name: '',
        credit_limit: '',
        terms: '',
        address: '',
        tin: ''
    }

    const Schema = yup.object().shape({
        name: yup.string().min(2).required('required'),
        credit_limit: yup.string().required('Credit limit is required'),
        terms: yup.number().min(1).required('required'),
        address: yup
            .string()
            .min(2, 'address must be at least 5 characters.')
            .required('required'),
        tin: yup
            .string()
            .min(15, 'Tin number must be at least 12 numbers.')
            .max(15, 'Tin number must be at max 12 numbers.')
            .required('Tin number is required')
    })

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

    const handleSubmit = async (values, onSubmitProps) => {
        console.log(values)
    }

    return (
        <div>
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
                        className='mx-auto my-5 flex w-1/3 flex-col gap-1 rounded-md border-[2px] border-gray-600 bg-secondary pt-5 shadow-lg'
                    >
                        <div className='flex flex-col gap-3 px-2  '>
                            <div className='flex flex-col gap-1 text-black'>
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
                                    className='tooltip flex items-center text-left text-sm font-semibold text-neutral'
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
                            <div className='flex flex-col gap-1 text-black'>
                                <label
                                    className='text-sm font-semibold text-neutral'
                                    htmlFor='credit_limit'
                                >
                                    Client Address
                                </label>

                                <textarea
                                    className={`input-primary input input-sm h-20 rounded-sm text-primary ${
                                        errors.address && touched.address
                                            ? ' border-red-500 focus:ring-red-500'
                                            : ''
                                    } `}
                                    value={values.address}
                                    onChange={handleChange}
                                    id='address'
                                    placeholder='Client Address'
                                    onBlur={handleBlur}
                                ></textarea>
                                {errorText(errors.address, touched.address)}
                            </div>
                        </div>
                        <p
                            className={`w-full text-center text-sm text-red-500 ${
                                resError ? '' : 'invisible'
                            }`}
                        >
                            {resError ? resError : 'error'}
                        </p>
                        {console.log(errors)}
                        <button
                            className='btn2 relative overflow-hidden rounded-bl-md rounded-br-md border-opacity-50  py-4 font-semibold uppercase leading-none tracking-wider '
                            type='submit'
                        >
                            <span className='absolute inset-0 bg-neutral '></span>
                            <span className='absolute inset-0 flex items-center  justify-center text-primary'>
                                Register Client
                            </span>
                            Register Client
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ClientRegister
