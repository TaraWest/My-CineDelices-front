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
    <div className="input-pro-container">
        <label className="w-[100px] inline-block" htmlFor={name}>
            {label}
        </label>
        <input
            className={`input-pro  ${disabled ? 'bg-transparent text-skin' : ''} ${error ? 'input-pro-error' : ''}`}
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {error && <p className="text-white-500">{error}</p>}{' '}
        {/* if there is a error */}
    </div>
);

export default InputField;
