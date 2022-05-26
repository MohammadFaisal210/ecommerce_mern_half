import React from 'react'
import { Typography, Stepper, Step, StepLabel } from "@material-ui/core"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./checkoutSteps.css"

function CheckoutSteps({ activeStep }) {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ]
    const stepStyle = {
        boxSizing: "border-box",
    }
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle} >
                {
                    steps.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}>
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)"
                                }} icon={item.icon}>{item.label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </>
    )
}

export default CheckoutSteps