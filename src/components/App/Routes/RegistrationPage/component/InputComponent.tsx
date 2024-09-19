import { IInputsFormProps } from '../models';
import { validateForm } from '../services/formValidation';
import './InputComponent.scss';

function InputComponent({
    input,
    handleChangeInput,
    password,
    passwordConfirm,
}: IInputsFormProps) {
    const errorMessage = validateForm(input, password, passwordConfirm);

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <label className="form-label">
                {input.label}
                {input.required ? ' *' : ''}
                <input
                    className={errorMessage ? 'form-input-error' : 'form-input'}
                    type={input.type}
                    name={input.name}
                    onChange={handleChangeInput}
                    value={input.value}
                    // required={input.required ? true : false}
                />
            </label>
            {errorMessage && (
                <div className="w-full italic text-gold">{errorMessage}</div>
            )}
        </div>
    );
}

export default InputComponent;
