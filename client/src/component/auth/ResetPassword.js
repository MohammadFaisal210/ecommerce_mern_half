import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, resetpassword } from "../../redux/actions/userAction"
import { useHistory, useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import Loading from '../layout/loader/Loading';

const initialState = {
    password: "",
    confirmPassword: ""
}

function ResetPassword() {
    const [show, setShow] = useState(false)
    const [cShow, setCshow] = useState(false)

    const [data, setData] = useState(initialState)

    const { password, confirmPassword } = data


    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory()
    const { token } = useParams()

    const { message, error } = useSelector(state => state.forgotPassword)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const passToggle = () => {
        setShow(!show)
    }
    const cShowToggle = () => {
        setCshow(!cShow)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(password === confirmPassword)) {
            alert.error("Password does not match")
        }
        dispatch(resetpassword(password, token))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            alert.success("Password successfully changed")
            history.push("/login")
        }
    }, [dispatch, error, alert, history, message])
    return (
        <>
            <div className="login container">
                <div className="login_page">
                    <h1>New password</h1>
                    <form className='login_form' onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='enter your new password' value={password} name="password" required onChange={handleChange} />
                            <span className='showButton' onClick={passToggle}>{show ? <i title="Hide" className="fa-solid fa-eye-slash"></i> : <i title="Show" className="fa-solid fa-eye"></i>}</span>

                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" placeholder='enter your confirm password' value={confirmPassword} required name="confirmPassword" onChange={handleChange} />
                            <span className='showButton' onClick={cShowToggle}>{cShow ? <i title="Hide" className="fa-solid fa-eye-slash"></i> : <i title="Show" className="fa-solid fa-eye"></i>}</span>

                        </div>
                        <div className='login_button'>
                            <button type='submit'>Reset password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;