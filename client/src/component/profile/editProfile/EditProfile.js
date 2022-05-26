import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { updateProfile, loadUser, refreshtoken, clearErrors } from "../../../redux/actions/userAction"
// import UPDATE_PROFILE_RESET from "../../redux/reducers/index"
import ACTIONS from '../../../redux/actions';
import Loading from '../../layout/loader/Loading'
import "./editProfile.css"


function EditProfile() {
    const [image, setImage] = useState("/blank-profile.png")
    const [name, setName] = useState()
    const [avatar, setAvatar] = useState()


    const { token } = useSelector(state => state.token)

    const { user, isAuthenticated } = useSelector(state => state.user)

    const { isUpdated, profileLoad, loading, error } = useSelector(state => state.profile)
    // console.log(token);

    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const handleChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result)
                setImage(reader.result)
            }
        };
        reader.readAsDataURL(e.target.files[0]);

    }

    const updateSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile(name, avatar, token))
    }


    useEffect(() => {
        if (user) {
            setName(user.name)
            setImage(user.avatar.url)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }


        if (profileLoad) {
            dispatch(loadUser(token))
            alert.success("Profile updated successfully")
            console.log(token)
            history.push("/account")
            dispatch({ type: ACTIONS.UPDATE_PROFILE_RESET })
        }

    }, [user, dispatch, profileLoad, history, token, alert, error])
    return (
        <>
            {
                loading ? <Loading /> :
                    <>
                        {/* {
                            isAuthenticated && */}
                        {/* <> */}
                        <div className="editProfile">
                            <div className="container">
                                <div className="editInfor">
                                    <h1>Update profile</h1>
                                    <form onSubmit={updateSubmit}>
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input type="text" defaultValue={name} name="name" onChange={(e) => setName(e.target.value)} />

                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name='email' id="email" defaultValue={user.email} disabled />
                                        </div>
                                        <div>
                                            <label htmlFor="file">Profile Picture</label>
                                            <div className='editProfileImg'>
                                                <img src={image} alt="profile" />
                                                <input type="file" name="avatar" onChange={handleChange} accept="image/*" />
                                            </div>
                                        </div>
                                        <button className='editProButton' type='submit'>Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* </>
                        } */}
                    </>
            }
        </>
    )
}

export default EditProfile