import { IInputsModal, IOption } from '../models';

interface ModalComponentProps {
    item: IInputsModal;
    // handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalComponent({ item }: ModalComponentProps) {
    // const errorMessage = validateForm(input, password, passwordConfirm);
    if (item.tag === 'input') {
        return (
            <div className="flex flex-col items-center gap-2 w-full">
                <label className="form-label text-black">
                    {item.label}

                    <input
                        // className={errorMessage ? 'form-input-error' : 'form-input'}
                        className="form-input"
                        type={item.type}
                        name={item.name}
                        // onChange={handleChangeInput}
                        value={item.value ?? ''}
                        required
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
                <label className="form-label text-black">
                    {item.label}

                    <select
                        // className={errorMessage ? 'form-input-error' : 'form-input'}
                        className="form-input"
                        name={item.name}
                        // onChange={handleChangeInput}
                        value={item.value ?? ''}
                        required
                    >
                        {item.option?.map((option: IOption) => {
                            return (
                                <option
                                    id={option.id ? option.id : option.name}
                                >
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
            <div className="flex flex-col items-center gap-2 w-full">
                <label className="form-label text-black">
                    {item.label}

                    <textarea name="" id="" value={item.value ?? ''}></textarea>
                </label>
                {/* {errorMessage && (
            <div className="w-full italic text-gold">{errorMessage}</div>
        )} */}
            </div>
        );
    }
}

export default ModalComponent;
