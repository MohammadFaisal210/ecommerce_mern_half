import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert'
import { forgotPass } from "../../redux/actions/userAction"
function ForgotPassword({ history }) {
    const [email, setEmail] = useState("")

    const { error, data, message, loading } = useSelector(state => state.forgotPassword)

    const dispatch = useDispatch()
    const alert = useAlert()

    const forgotHandle = (e) => {
        e.preventDefault()
        dispatch(forgotPass(email))
        // if (message) {
        //     alert.success("Re-send the password, please check your email.")
        // }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        if (message) {
            window.alert(data)
        }
    }, [dispatch, error, message, data])
    return (
        <>
            <div className="login container">
                <div className="login_page">
                    <h1>Forgot password</h1>
                    <form className='login_form' onSubmit={forgotHandle} >
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Enter your email' value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='login_button'>
                            <button type='submit'>submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword