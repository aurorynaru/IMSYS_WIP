import { tailwindError } from '../tailwindcss'

export const errorText = (errors, touched) => {
    return (
        <p
            className={` ${tailwindError}  ${
                errors && touched ? '' : 'invisible'
            }`}
        >
            {errors ? errors : 'error'}
        </p>
    )
}
