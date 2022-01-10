import React, { useState } from 'react';
import UserModal from './UserModal';

const UserTable = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [currentTab, setCurrentTab] = useState(true);
    const [users, setUsers] = useState([]);
    const [dltUsers, setDltUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalWithEdit, setOpenModalWithEdit] = useState(false);
    const [indexValueOfEditUser, setIndexValueOfEditUser] = useState(-1);

    const handleModalPopup = (toggle) => {
        setName(''); setEmail(''); setMobile('');
        setOpenModalWithEdit(false);
        setOpenModal(toggle);
    }
    const onChangeHandleFields = (e, nameValue) => {
        const value = e.target.value;
        nameValue === 'name' ? setName(value) :
            nameValue === 'email' ? setEmail(value) : setMobile(value);
    }
    const data = { name, email, mobile };
    const listOfUsers = () => currentTab ? users : dltUsers;
    const onHandleAddUser = (currentUser) => {
        if (openModalWithEdit) {
            if (indexValueOfEditUser > -1) {
                users.splice(indexValueOfEditUser, 1, data);
                setOpenModal(false); setOpenModalWithEdit(false);
            }
        } else {
            setUsers(prevState => [...prevState, currentUser]);
        }
    }
    const onHandleDeleteRestoreUser = (user, type) => {
        let indexValue = -1;
        const userDetails = type === 'delete' ? users : dltUsers;
        userDetails.find((item, index) => {
            if (item.email === user.email)
                indexValue = index;
        });
        const updateUser = userDetails.splice(indexValue, 1);
        if (indexValue > -1) {
            type === 'delete' ? setDltUsers(prevState => [...prevState, updateUser[0]])
                : onHandleAddUser(updateUser[0]);
        }
    }
    const onHandleEditUser = (currentUser) => {
        let indexValue = -1;
        setName(currentUser.name); setEmail(currentUser.email);
        setMobile(currentUser.mobile); setOpenModal(false);
        setOpenModalWithEdit(true);
        users.find((item, index) => {
            if (item.email === currentUser.email)
                indexValue = index;
        });
        setIndexValueOfEditUser(indexValue);
    }
    const onHandleCurrentTab = (type) => {
        type === 'users' ? setCurrentTab(true) : setCurrentTab(false);
    }
    listOfUsers().sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate));
    return (
        <div className="container">
            <div className="assign">
                <div className="header-item">
                    <div className={`details user-details ${currentTab ? 'show-header' : ''}`} onClick={() => onHandleCurrentTab('users')}>Users</div>
                    <div className={`details dlt-user-details ${!currentTab ? 'show-header' : ''}`} onClick={() => onHandleCurrentTab('dltUsers')}>Delete Users</div>
                </div>
                <div className="assign-bottom"></div>
            </div>
            <div className="con-add">
                <button className="add-btn" onClick={() => handleModalPopup(true)}><span className="plus">+</span>Add User</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>User Name</td>
                        <td>Email Id</td>
                        <td>Mobile No</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {listOfUsers() && listOfUsers().length > 0 && listOfUsers().map((item, index) => {
                        return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            {currentTab ?
                                <td>
                                    <div className="adjustable-btn">
                                        <button className="edit-btn" onClick={() => onHandleEditUser(item)}>Edit</button>
                                        <button className="delete-btn" onClick={() => onHandleDeleteRestoreUser(item, 'delete')}>Delete</button>
                                    </div>
                                </td>
                                :
                                <td>
                                    <div className="adjustable-btn">
                                        <button className="restore" onClick={() => onHandleDeleteRestoreUser(item, 'restore')}>Restore</button>
                                    </div>
                                </td>
                            }
                        </tr>
                    })}
                </tbody>
            </table>
            {(openModal || openModalWithEdit) && <UserModal
                data={data}
                users={users}
                openModalWithEdit={openModalWithEdit}
                handleModalPopup={handleModalPopup}
                onHandleAddUser={onHandleAddUser}
                onChangeHandleFields={onChangeHandleFields}
            />}
        </div>
    )
}

export default UserTable;
