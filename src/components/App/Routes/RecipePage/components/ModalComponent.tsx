import { IInputsModal, IOption } from '../models';
import './UpdateRecipeModal.scss';

interface ModalComponentProps {
    item: IInputsModal;
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => void;
}

function ModalComponent({ item, handleChange }: ModalComponentProps) {
    // const errorMessage = validateForm(input, password, passwordConfirm);
    if (item.tag === 'input') {
        return (
            <div className="flex flex-col items-center gap-2 w-full">
                <label className="modal-label ">
                    {item.label}

                    <input
                        // className={errorMessage ? 'form-input-error' : 'form-input'}
                        className="modal-input"
                        type={item.type}
                        name={item.name}
                        accept={item.accept ? item.accept : ''}
                        onChange={handleChange}
                        value={item.value ? item.value : undefined}
                        required
                        id="set_field"
                    />
                </label>
                {/* {errorMessage && (
                <div className="w-full italic text-gold">{errorMessage}</div>
            )} */}
            </div>
        );
    } else if (item.tag === 'select') {
        return (
            <div className="flex flex-col items-center gap-2 w-full">
                <label className="modal-label">
                    {item.label}

                    <select
                        // className={errorMessage ? 'form-input-error' : 'form-input'}
                        className="modal-input"
                        name={item.name}
                        onChange={handleChange}
                        value={item.value ?? ''}
                        id="set_field"
                    >
                        {item.option?.map((option: IOption) => {
                            return (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
                </label>
                {/* {errorMessage && (
                <div className="w-full italic text-gold">{errorMessage}</div>
            )} */}
            </div>
        );
    } else if (item.tag === 'textarea') {
        return (
            <div className="label-input-container">
                <label className="modal-label w-full mx-5em">
                    {item.label}

                    <textarea
                        id="set_field"
                        name="anecdote"
                        value={item.value ?? ''}
                        onChange={handleChange}
                        className="modal-input text-input"
                    ></textarea>
                </label>
                {/* {errorMessage && (
            <div className="w-full italic text-gold">{errorMessage}</div>
        )} */}
            </div>
        );
    }
}

export default ModalComponent;
