import { useState, useCallback } from 'react';
import Input from '../Input/Input.jsx';
import Dialog from '../Dialog/Dialog.jsx';
import SpinningLoader  from '../SpinningLoader/SpinningLoader.jsx';
import styles from './NewCommentDialog.module.css'

function NewCommentDialog({ isOpen, onSubmit, onClose }) {
    const [value, setValue] = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const validateInput = useCallback((newValue) => newValue !== '', []);

    function handleInputChange(e) {
        const newValue = e.target.value;
        setValue(newValue);
        setSubmitBtnDisabled(!validateInput(newValue));
    };

    async function handleSubmit(e) {
        if (!validateInput()) return;
        e.preventDefault();

        setLoading(true);
        setValue('');
        await onSubmit(value);
        setLoading(false);
        
        onClose();
        return;
    };

    function handleClose(e) {
        e.preventDefault();
        setValue('');
        onClose();
        return;
    };

    return (
        <Dialog
            className={styles.newCommentDialog}
            isOpen={isOpen}
            title='Add New Comment'
            confirmBtn='Add Comment'
            cancelBtn='Cancel'
            cancelBtnDisabled={loading}
            onConfirm={(e) => handleSubmit(e, value)}
            confirmBtnDisabled={submitBtnDisabled || loading}
            showCloseButton={!loading}
            onClose={handleClose}
        >
            {loading ? (
                <div className={styles.loaderContainer}>
                    <SpinningLoader size='medium'/>
                </div>
            ) : (
                <form>
                    <Input
                        label='Comment'
                        id='comment'
                        name='comment'
                        type='text'
                        placeholder='Comment'
                        errorMessage='Please input your comment'
                        value={value}
                        required
                        onChange={(e) => handleInputChange(e)}
                    />
                </form>
            )}
        </Dialog>
    );
};

export default NewCommentDialog;