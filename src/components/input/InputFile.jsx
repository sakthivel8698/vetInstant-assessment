import Form from 'react-bootstrap/Form';
import ImageComponent from '../images/Image';
import styles from './Input.module.css'

export default function InputFileComponent(props) {
    const {
        className,
        type = "file",
        placeholder = "",
        value = "",
        onChange,
        name = "",
        disabled = false,
        error = "",
        label = '',
        required = false,
        preview = ""
    } = props;
    return (
        <Form.Group className={styles.customInpGrp}>
            {
                label &&
                <Form.Label className={`${styles.custom_formLabel}`}>
                    {label}
                    {
                        required &&
                        <span className={`${styles.labelMandatory} ps-1`}>*</span>
                    }
                </Form.Label>
            }

            <Form.Control
                className={`${styles.customInput} ${className ? className : ''}`}
                type={type}
                placeholder={placeholder}
                // value={value}
                // onChange={onChange}
                name={name}
                disabled={disabled}
            />
            {
                error &&
                <Form.Label className='text-danger mt-1'>{error}</Form.Label>
            }

            {
                preview &&
                <div className='mt-2'>
                    <ImageComponent
                        src={preview || 'profile'}
                        className={styles.previewImg}
                    />
                </div>
            }
        </Form.Group>
    )
}

