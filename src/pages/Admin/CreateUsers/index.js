import React, { useEffect, useState, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import Input from 'components/inputField';
import { Loader } from 'components/loader';
import { setItem } from 'constants/localstorage';
import { ADD_NEW_USER, UPDATE_USER } from 'constants/title';
import { addNewUser, getUserByID, removeMessage, updateUser } from 'redux/reducer/AdminAsyncApi/asyncApi';
import { emailValidation, getBase64 } from 'util/helpers';
import './createUser.scss'
// import { UploadfileImage } from '../../../assets/images'
const CreateUsers = () => {
    const firstNameRef = useRef(HTMLAllCollection)
    const lastNameRef = useRef(HTMLAllCollection)
    const emailRef = useRef(HTMLAllCollection)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cancelRef = useRef(null)
    const { addUpdateUser, loading } = useSelector(state => state?.adminSlice) || {}
    const { success, message } = addUpdateUser || {}
    const { user } = useSelector(state => state.adminSlice?.getUserDataById) || {}
    const { user_email, user_firstname, is_admin, user_lastname } = user || {}
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [inputForm, setInputForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        isAdmin: false,
        profile_image: '',
        image_description: ''
    })
    const { first_name, last_name, email, isAdmin,
        // profile_image, image_description
    } = inputForm

    const onInputChange = (event, name) => {
        const { value } = event.target
        setInputForm(formVal => ({ ...formVal, [name]: value }))
        if (name === 'profile_image') {
            getBase64(event.target.files[0], (result) => {
                setInputForm(formVal => ({ ...formVal, profile_image: result }))
            });
        }
    }

    const onFocus = (event) => {
        event.target.click()
    }

    const handleIsAdmin = (event) => {
        if (event.target.checked) {
            setInputForm(formVal => ({ ...formVal, isAdmin: event.target.checked }))
        } else {
            setInputForm(formVal => ({ ...formVal, isAdmin: false }))
        }
    }

    const handleSubmit = () => {
        setFormErrors(validateForm(inputForm))
    }

    const validateForm = (values) => {
        const errors = {}
        if (!emailValidation(values.email)) {
            errors.email = "User must be of same domain"
            emailRef.current.focus()
        }
        if (!values.email) {
            errors.email = "Please enter Email address"
            emailRef.current.focus()
        }
        if (!values.last_name) {
            errors.last_name = "Please enter Last Name"
            lastNameRef.current.focus()
        }
        if (!values.first_name) {
            errors.first_name = "Please enter First Name"
            firstNameRef.current.focus()
        }

        if (Object.keys(errors).length === 0) {
            setIsSubmit(true)
        }
        return errors
    }

    const cancelButton = (e) => {
            navigate("/");
            setItem('add', 'add');
    }

    useEffect(() => {
        console.log(location.state?.id)
        if (location?.state?.id) {
            dispatch(getUserByID({ user_id: location.state.id }))
            setInputForm(formVal => ({ ...formVal, user_id: location?.state?.id }))
        }
    }, [location?.state?.id])

    useEffect(() => {
        firstNameRef?.current?.focus()
        if (location?.state?.mode === "edit") {
            document.title = UPDATE_USER
            setInputForm(formVal => ({
                ...formVal,
                first_name: user_firstname,
                last_name: user_lastname,
                email: user_email,
                isAdmin: is_admin
            }))
        } else {
            document.title = ADD_NEW_USER
            setInputForm(formVal => ({
                ...formVal,
                first_name: "",
                last_name: "",
                email: "",
                isAdmin: false
            }))
        }
    }, [user_email, user_firstname, is_admin, user_lastname])


    useEffect(() => {
        if (isSubmit) {
            if (location?.state?.mode === "edit") {
                dispatch(updateUser(inputForm))
            } else {
                dispatch(addNewUser(inputForm))
            }
        }
        setIsSubmit(false)
        toast(message, { className: success ? '_success' : '_error', role: "alert" })
        if (success) {
            navigate("/")
        }
        return () => {
            dispatch(removeMessage())
        }
    }, [isSubmit, message])

    return (
        <div className='mainWrapper Create-User-Wrapper p-5'>
            {!loading &&
                <div className='form-width'>
                    <Row>
                        <Col md={6}>
                            <Input type="text" autocomplete={true} label="First Name" required={false} ref={firstNameRef} ErrorLabel={formErrors.first_name ? "First_Name_Error" : "First_Name"} forLabel={"First_Name"} name="first_name" value={first_name} error={formErrors.first_name ? true : false} errorMsg={formErrors.first_name} onFocus={onFocus} onInputChange={onInputChange} />
                        </Col>
                        <Col md={6}>
                            <Input type="text" autocomplete={true} label="Last Name" required={false} ref={lastNameRef} ErrorLabel={formErrors.last_name ? "Last_Name_Error" : "Last_Name"} forLabel={"Last_Name"} name="last_name" value={last_name} error={formErrors.last_name ? true : false} errorMsg={formErrors.last_name} onFocus={onFocus} onInputChange={onInputChange} />
                        </Col>
                        <Col md={6}>
                            <Input type="text" autocomplete={true} label="Email" required={false} ref={emailRef} ErrorLabel={formErrors.email ? "Email_Error" : "Email"} forLabel={"Email"} name="email" value={email} error={formErrors.email ? true : false} errorMsg={formErrors.email} onFocus={onFocus} onInputChange={onInputChange} />
                        </Col>
                        <Col md={6}>
                            <div className='inputRow '>
                                <label className='d-mobile-none'></label>
                                <div className='customCheckbox'>
                                    <input type="checkbox" id='admin_Checkbox' name="admin_Checkbox" checked={isAdmin} onChange={handleIsAdmin} />
                                    <label htmlFor="admin_Checkbox" className='mt-4 mb-0'>Make as Admin? </label>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className='form-buttons d-flex align-items-center justify-content-end mt-5'>
                                <Button title={"Cancel"} className={"button--border"} onClick={cancelButton} />
                                <Button title={location?.state?.mode === "edit" ? `Update` : `Save`} className={"button--blue ms-3"} onClick={handleSubmit} />
                            </div>
                        </Col>
                    </Row>

                </div>}
            {loading && <Loader />}
        </div>
    )
}

export default CreateUsers