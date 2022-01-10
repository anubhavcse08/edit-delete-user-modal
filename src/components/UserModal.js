import React, { useState } from 'react';

const UserModal = (props) => {
    const [error, setError] = useState(false);
    const { users, data: { name, email, mobile } } = props;

    const onHandleAddUser = (e) => {
        e.preventDefault();
        if (name && email && mobile) {
            const hasValidEmail = users && users.length > 0 && users.find(item => item.email === email);
            if (hasValidEmail) {
                setError(true);
            } else {
                const currentDate = new Date();
                const options = { name, email, mobile, currentDate };
                setError(false);
                props.onHandleAddUser(options);
            }
        }
    }
    const fields = (label, type, value, name, placeholder) => {
        return (
            <div className="input-label-field">
                <label className="label-field">{label}</label><br />
                <input
                    required
                    type={type}
                    name={name}
                    value={value}
                    className="input-field"
                    placeholder={placeholder}
                    onChange={(e) => props.onChangeHandleFields(e, name)}
                />
            </div>
        )
    }
    const addUpdateBtn = props.openModalWithEdit ? 'Update' : 'Add';
    return (
        <div className="modal" onClick={() => props.handleModalPopup(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Add/Update New User</h4>
                </div>
                <div className="modal-body" onClick={() => setError(false)}>
                    {fields("Username:", "text", name, "name", "Enter the user name")}
                    {fields("E - mail Id:", "email", email, "email", "Enter the user email id")}
                    {fields("Mobile no:", "text", mobile, "mobile", "Enter the user mobile number")}
                    {error && <p className="error">Email Id already exists...</p>}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-close" type="button" onClick={() => props.handleModalPopup(false)}>Cancel</button>
                    <button className="btn btn-user" type="button" onClick={(e) => onHandleAddUser(e)}>{`${addUpdateBtn} User`}</button>
                </div>
            </div>
        </div>
    )
}

export default UserModal;
