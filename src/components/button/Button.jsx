import { Button } from 'react-bootstrap';

const ButtonComponent = (props) => {
    const {
        className = 'defaultBtn',
        iconClassName = 'btnIcon',
        leftIcon,
        rightIcon,
        disabled = false,
        type = "button",
        btnText = '',
        onClick
    } = props;


    return (
        <Button
            className={`${className} btn btn-primary`}
            disabled={disabled}
            type={type}
            onClick={onClick}
        >
            {leftIcon && <span className={iconClassName}>{leftIcon}</span>}
            {props.btnText}
            {rightIcon && <span className={iconClassName}>{rightIcon}</span>}

        </Button>
    )
}

export default ButtonComponent;