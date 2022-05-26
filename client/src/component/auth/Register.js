import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import avatrimg from "./blank-profile.png"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/actions/userAction"
import { useAlert } from "react-alert"
import { useHistory } from "react-router-dom"
import { clearErrors } from "../../redux/actions/userAction"
import Loading from "../layout/loader/Loading"


function Register() {
    const [show, setShow] = useState(false)
    const [cShow, setCshow] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const { error, loading, isAuthenticated } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const [avatarPreview, setAvatarPreview] = useState(avatrimg)

    const [avatar, setAvatar] = useState()

    const { name, email, password, cpassword } = user;

    const passToggle = () => {
        setShow(!show)
    }
    const cShowToggle = () => {
        setCshow(!cShow)
    }

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(password === cpassword)) {
            alert.error("Password did not match")
        } else {
            dispatch(register(name, email, password, avatar))
            localStorage.setItem('firstLogin', true)
        }
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            history.push("/")
        }
    }, [dispatch, alert, isAuthenticated, history, error])
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="login container">
                        <div className="login_page">
                            <h1>Register form</h1>
                            <form onSubmit={handleSubmit} className='login_form' autoComplete='off'>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" placeholder='Enter Your Name' name='name' value={name} required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" placeholder='enter your email' name='email' value={email} required onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" placeholder='enter your new password' value={password} name="password" required onChange={handleChange} />
                                    <span className='showButton' onClick={passToggle}>{show ? <i title="Hide" className="fa-solid fa-eye-slash"></i> : <i title="Show" className="fa-solid fa-eye"></i>}</span>

                                </div>
                                <div>
                                    <label htmlFor="cpassword">Confirm password</label>
                                    <input type="password" placeholder='enter your confirm password' value={cpassword} required name="cpassword" onChange={handleChange} />
                                    <span className='showButton' onClick={cShowToggle}>{cShow ? <i title="Hide" className="fa-solid fa-eye-slash"></i> : <i title="Show" className="fa-solid fa-eye"></i>}</span>

                                </div>
                                <div className='registerImg'>
                                    <label htmlFor="file">Profile picture</label>
                                    <div>
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input type="file" onChange={handleChange} accept="image/*" name='avatar' />
                                    </div>
                                </div>
                                <div className='login_button'>
                                    <button type='submit'>register</button>
                                    <Link to="/login">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

export default Register