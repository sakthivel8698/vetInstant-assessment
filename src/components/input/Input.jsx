import Form from 'react-bootstrap/Form';
import styles from './Input.module.css'

export default function InputComponent(props) {
    const {
        className,
        type = "text",
        placeholder = "",
        value = "",
        onChange,
        name = "",
        disabled = false,
        error = "",
        label = '',
        required = false
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
                value={value}
                onChange={onChange}
                name={name}
                disabled={disabled}
            />
            {
                error &&
                <Form.Label className='text-danger'>{error}</Form.Label>
            }
        </Form.Group>
    )
}

