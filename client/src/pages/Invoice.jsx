import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'

const initialValues = {
    username_id,
    image: '',
    title: '',
    tags: [],
    files: [],
    model_character: 'test',
    model_for: '',
    epoch: '',
    description: '',
    steps: '',
    audioTitle1: '',
    random: ''
}

const Schema = yup.object().shape({
    image: yup.string(),
    title: yup.string().min(3).max(100).required('required'),
    model_character: yup.string(),
    model_for: yup
        .string()
        .oneOf(
            [
                'RVC',
                'So-Vits SVC 4.0',
                'So-Vits SVC 4.0 V2',
                'VEC768 So-Vits SVC'
            ],
            'Please select one'
        )
        .required('required'),
    audioTitle1: yup.string().max(10),
    epoch: yup
        .number()
        .positive('Number must be positive')
        .required('required'),
    description: yup.string().max(1000),
    steps: yup
        .number()
        .min(7)
        .positive('Number must be positive')
        .required('required'),
    audioFiles: yup.array().of(
        yup.object().shape({
            title: yup.string().required('Please enter a title')
        })
    ),
    tags: yup.array().min(1).max(10),
    files: yup.array().of(
        yup.mixed().test('fileFormat', 'Invalid file format', (value) => {
            if (!value) return false
            const validExtensions = [
                '.pth',
                '.zip',
                '.index',
                '.png',
                '.jpeg',
                '.jpg',
                '.mp3',
                '.wav',
                '.opus'
            ]
            const fileExtension = '.' + value.name.split('.').pop()

            return validExtensions.includes(fileExtension)
        })
    )
})

const Invoice = () => {
    return <div>Invoice</div>
}

export default Invoice
