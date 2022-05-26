import React, { useState } from 'react'
import "./shippingInfo.css"
import { Country, State } from "country-state-city"
import { useAlert } from "react-alert"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import PublicIcon from '@mui/icons-material/Public';
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../redux/actions/cartAction'

const ShippingInfo = () => {
    const { shippingInfo } = useSelector(state => state.cart)

    const initialState = {
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        country: shippingInfo.country,
        pinCode: shippingInfo.pinCode,
        phoneNo: shippingInfo.phoneNo
    }
    const [data, setData] = useState(initialState)

    const { address, city, state, country, pinCode, phoneNo } = data

    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory()

    const shippingHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const shippingSubmit = (e) => {
        e.preventDefault()
        if (phoneNo.length < 11 || phoneNo.length > 11) {
            alert.error("Phone Number should be 11 digits long")
            return
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        )
        history.push("/order/confirm")
        console.log({ address, city, state, country, pinCode, phoneNo });
    }

    return (
        <>
            <div className="shippinPage">
                <div className="container">
                    <CheckoutSteps activeStep={0} />
                    <h1>shipping details</h1>
                    <div className="shipping_box">
                        <form className='shippingForm' encType="multipart/form-data" onSubmit={shippingSubmit}>
                            <div>
                                <label htmlFor="address">Address</label>
                                <div>
                                    <HomeIcon />
                                    <input type="text" required placeholder='Address' name="address" value={address} onChange={shippingHandler} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="city">City</label>
                                <div>
                                    <LocationCityIcon />
                                    <input type="text" required placeholder='city' name="city" value={city} onChange={shippingHandler} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="pinCode">Pin Code</label>
                                <div>
                                    <PinDropIcon />
                                    <input type="text" required placeholder='Pin Code' name="pinCode" value={pinCode} onChange={shippingHandler} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phoneNo">Phone Number</label>
                                <div>
                                    <PhoneIcon />
                                    <input type="number" required placeholder='Phone Number' name="phoneNo" value={phoneNo} onChange={shippingHandler} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="country">Country</label>
                                <div>
                                    <PublicIcon />
                                    <select required value={country} name="country" onChange={shippingHandler} id="">
                                        <option value="">Country</option>
                                        {
                                            Country &&
                                            Country.getAllCountries().map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {
                                country && (
                                    <div>
                                        <label htmlFor="state">State</label>
                                        <div>
                                            <TransferWithinAStationIcon />
                                            <select name="state" id="" onChange={shippingHandler} value={state}>
                                                <option value="">State</option>
                                                {
                                                    State &&
                                                    State.getStatesOfCountry(country).map((item) => (
                                                        <option value={item.isoCode} key={item.isoCode} >
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='ShippingButton'>
                                <button type='submit' disabled={state ? false : true}>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingInfo