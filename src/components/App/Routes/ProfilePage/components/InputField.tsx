import { InputFieldProps } from '../models';
import './InputField.scss';

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    disabled,
    error,
}) => (
    <div className="input-pro-container justify-center">
        <label
            className="w-[100px] text-center inline-block"
            htmlFor={name}
            aria-label={label}
        >
            {label}
        </label>
        <input
            className={`input-pro text-center ${disabled ? 'bg-transparent text-skin' : ''} ${error ? 'input-pro-error' : ''}`}
            type={type}
            {...(type === 'email'
                ? { required: true, pattern: '\\S+@\\S+' }
                : {})}
            id={name}
            name={name}
            aria-label={label}
            placeholder={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {error && <p className="text-white-500">{error}</p>}
    </div>
);

export default InputField;
