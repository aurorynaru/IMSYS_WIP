import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import CustomInput from "../components/CustomInput"
import CustomSelect from "../components/CustomSelect"
import CustomText from "../components/CustomText"
import CustomTextBox from '../components/CustomTextBox'
const Invoice = () => {
    


    const [selectedTags, setSelectedTags] = useState([])
    const [inputTag, setInputTag] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    const handleTagSelection = (tag, valuesTag, setFieldValue) => {
       
        setSelectedTags(tag)
           console.log(selectedTags)
        setFieldValue('client', tag)
        setInputTag('')
    }

    const clientArray=[
        {
        name:"KFC",
        address:"54 dona francesca st",
        terms:"30",
        credit_limit:"5000000",
        tin:"232-434-950-000"
    
    }
]
    
    const initialValues = {
        invoice_number: "",
        client: '',
        address: '',
        items: [],
        date_created: "",
        terms: '',
        recipient: '',
        vatable_sales: '',
        vat: '',
        total_sales_vat_inclusive: '',
        less_vat: '',
        net_vat: '',
        total_amount_due:"",
        user_id:"",
        status:""
    }
    
    const Schema = yup.object().shape({
        invoice_number: yup.number().min(4).required('required'),
        client: yup.string().min(3).max(100).required('required'),
        address: yup.string(),
        date_created: yup.date().required('required'),
        terms: yup.number(),
        recipient: yup.string().required('required'),
        vatable_sales: yup.number().positive('Number must be positive'),
        vat: yup
            .number()
            .min(7)
            .positive('Number must be positive')
            .required('required'),
        total_sales_vat_inclusive: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        less_vat: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        net_vat: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        total_amount_due: yup
            .number()
            .min(2)
            .positive('Number must be positive')
            .required('required'),
        user_id:"",
        status:""
    })

    const handleSubmit =(values)=>{
        console.log(values)
    }

    return (
        <>
        <Navbar />
        <div>
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
                        className='flex flex-col gap-5 pt-5  mt-10 w-1/3 mx-auto shadow-lg rounded-md bg-neutral-800 min-w-[550px]'
                        onSubmit={handleSubmit}
                    >
                        <div className='px-2 gap-4 flex flex-col'>
                    
                            <CustomInput
                                label='Client name'
                                type='text'
                                placeholder='client name '
                                value={inputTag}
                                onChange={(e) => {
                                    setInputTag(e.target.value)
                                }}
                            />
                            <div className='flex gap-2 overflow-x-auto relative'>
                                {selectedTags.map((tag) => {
                                    console.log("tag",tag)
                                    return (
                                    <span
                                        key={tag}
                                        className=' flex text-xs p-1 bg-blue-light text-dark hover:bg-white-blue rounded-md cursor-pointer'
                                        onClick={(e) =>
                                            handleTagSelection(tag)
                                        }
                                    >
                                        {tag}
                                        <XMarkIcon className='pl-[3px] pb-[3px] w-3 h-3 ' />
                                    </span>)}
                                )}
                            </div>
                            <div className='relative top-[-35px] '>
                                {inputTag ? (
                                    <div className='flex flex-col justify-center overflow-y-scroll  max-h-[200px] w-auto h-auto absolute bg-neutral-900 '>
                                        {clientArray
                                            .filter((tag) =>{
                                               
                                                return  tag.name.includes(inputTag)
                                            }
                                               
                                            )
                                            .map((tag) => {
                                                console.log(tag)
                                                return (
                                                    <div
                                                        key={tag.name}
                                                        className='flex items-center cursor-pointer my-[4px]  w-44'
                                                        onClick={() => {
                                                            handleTagSelection(
                                                                tag.name,
                                                                values.tags.name,
                                                                setFieldValue
                                                            )
                                                        }}
                                                    >
                                                        <span className='text-sm pl-1 block  overflow-hidden text-ellipsis cursor-pointer w-1/2 border-2 border-r-0 border-blue-light'>
                                                            {tag.name}
                                                        </span>
                                                        <span className='text-xs w-1/2 py-1 text-center font-medium bg-blue-light text-dark hover:bg-white-blue '>
                                                            select client
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <button
                                className='py-2 text-sm  disabled:bg-opacity-50 px-1 cursor-pointer w-full truncate rounded-tr-md rounded-md  bg-blue-light text-dark hover:bg-white-blue'
                                type='button'
                                disabled={!inputTag}
                                onClick={() => {
                                    handleTagSelection(
                                        inputTag,
                                        values.tags.name,
                                        setFieldValue
                                    )
                                }}
                            >
                                Select client name
                            </button>
                        </div>
                  

                        <button
                            className='btn2 py-4  relative rounded-br-md rounded-bl-md border-opacity-50  uppercase font-semibold tracking-wider leading-none overflow-hidden '
                            type='submit'
                        >
                            <span className='absolute inset-0 bg-blue-light '></span>
                            <span className='absolute inset-0 flex justify-center  items-center'>
                                Submit
                            </span>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    </>
    )
}

export default Invoice
