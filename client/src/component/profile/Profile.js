import React, { useEffect } from 'react'
import "./profile.css"
import Loading from '../layout/loader/Loading'
import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

function Profile() {
    const history = useHistory()
    const { isAuthenticated, user, loading } = useSelector(state => state.user)
    const { name, avatar, email, role, createdAt } = user
    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/")
        }
    }, [isAuthenticated, history])
    return (
        <React.Fragment>

            {
                loading ? (<Loading />) : (
                    <>
                        {isAuthenticated &&
                            <div className="profile">
                                <div className="container">
                                    <h1>my profile</h1>
                                    <div className="profilewrapper">
                                        <div className='profileImg'>
                                            <img src={avatar.url} alt="profile" />
                                            <Link to="edit/profile">edit profile</Link>
                                        </div>
                                        <div className='profileInfor'>
                                            <div>
                                                <h4>full Name :</h4>
                                                <p>{name}</p>
                                            </div>
                                            <div>
                                                <h4>email :</h4>
                                                <p>{email}</p>
                                            </div>
                                            <div>
                                                <h4>user :</h4>
                                                <p>{role}</p>
                                            </div>
                                            <div>
                                                <h4>joined on :</h4>
                                                <p>{String(createdAt).substr(0, 10)}</p>
                                            </div>
                                            <div className='profileButton'>
                                                <Link to="/orders">My orders</Link>
                                                <Link to="/updatePassword">Change Password</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                )
            }
        </React.Fragment>
    )
}

export default Profile