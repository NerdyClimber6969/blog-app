import { useState, useRef, useEffect } from 'react';
import Input from '../Input/Input.jsx';
import Dialog from '../Dialog/Dialog.jsx';

function NewCommentDialog({ isOpen, onSubmit, onClose }) {
    const [value, setValue] = useState('');
    const formRef = useRef(null);
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

    function handleSubmit(e, value) {
        e.preventDefault();
        setValue('');
        onSubmit(value);
        onClose();
        return;
    };

    function handleClose(e) {
        e.preventDefault();
        setValue('');
        onClose();
        return;
    };

    useEffect(() => {   
        const isValidForm = () => {
            const inputs = Array.from(formRef.current.querySelectorAll('input'));
            for (const input of inputs) {
                if (!input.validity.valid) {
                    return false;
                };
            };

            return true;
        };

        const isValid = isValidForm();
        setSubmitBtnDisabled(!isValid)

        return;
    }, [value]);

    return (
        <Dialog
            isOpen={isOpen}
            title='Add New Comment'
            confirmBtn='Add Comment'
            cancelBtn='Cancel'
            onConfirm={(e) => handleSubmit(e, value)}
            onClose={handleClose}
            confirmBtnDisabled={submitBtnDisabled}
        >
            <form ref={formRef}>
                <Input
                    id='comment'
                    name='comment'
                    label='Comment'
                    errorMessage='Please input your comment'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type='text'
                    required
                />
            </form>
        </Dialog>
    );
};

export default NewCommentDialog;