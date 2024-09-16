import { InputFieldProps } from '../models';

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    disabled,
    error,
}) => (
    <div className="input-field-container">
        <label htmlFor={name}>{label}</label>
        <input
            className={`form-input m-4 text-center text-white ${disabled ? 'bg-transparent' : ''} ${error ? 'border-red-500' : ''}`}
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {error && <p className="text-white-500">{error}</p>}{' '}
        {/* Affiche l'erreur si elle existe */}
    </div>
);

export default InputField;
