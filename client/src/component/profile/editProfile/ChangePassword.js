import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Loading from '../../layout/loader/Loading'
import { updatePassword, clearErrors } from "../../../redux/actions/userAction"
import { useAlert } from "react-alert"
import ACTIONS from "../../../redux/actions"

const initialState = {
    oldpassword: "",
    newPassword: "",
    confirmPassword: ""
}

function ChangePassword({ history }) {
    const [passowrds, setPasswords] = useState(initialState)

    const { oldpassword, newPassword, confirmPassword } = passowrds

    const { error, loading, profileLoad } = useSelector(state => state.profile)

    const { token } = useSelector(state => state.token)

    const dispatch = useDispatch()
    const alert = useAlert()
    const passwordHandle = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passowrds, [name]: value })
    }

    const passwordSubmit = (e) => {
        e.preventDefault()
        dispatch(updatePassword(oldpassword, newPassword, confirmPassword, token))
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (profileLoad) {
            alert.success("Password uptated successfully")
            history.push("/account")
            dispatch({ type: ACTIONS.UPDATE_PASSWORD_RESET })
        }
    }, [dispatch, alert, error, profileLoad, history])
    return (
        <>

            <div className="editProfile">
                <div className="container">
                    <div className="editInfor">
                        <h1>Update Password</h1>
                        <form onSubmit={passwordSubmit}>
                            <div>
                                <label htmlFor="oldpassword">Old Password</label>
                                <input type="password" placeholder='Old password' id='oldpassword' name='oldpassword' value={oldpassword} required onChange={passwordHandle} />

                            </div>
                            <div>
                                <label htmlFor="newPassword">New Pasword</label>
                                <input type="password" placeholder='New password' name='newPassword' value={newPassword} required onChange={passwordHandle} />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" placeholder='Confirm password' name='confirmPassword' value={confirmPassword} required onChange={passwordHandle} />
                            </div>
                            <button className='editProButton' type='submit'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword