import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import ClearIcon from '@material-ui/icons/Clear'
import {PayPalButton} from 'react-paypal-button-v2'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '650px'
    },
    button: {
        backgroundColor: theme.palette.success.light,
        color: 'white',
        marginTop: '5px',
        padding: '10px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '8px'
    },
    closeIcon: {
        margin: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer',
        }
    }
}))

export function SimpleDialog(props) {
    const classes = useStyles()
    const { onClose, open, setOpen, amount } = props

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <Dialog onClose={handleClose} fullWidth={true} aria-labeledby='simple-dialog-title' open={open}>
            <ClearIcon onClick={onClose}  className={classes.closeIcon}/>
            <DialogTitle className={classes.title} id='payment-dialog-title'>
                Pay with PayPal
            </DialogTitle>
            <PayPalButton
                amount={amount}
                shippingPreference='NO_SHIPPING'
                onSuccess={(details, data) => {
                    alert('Transaction completed by ' + details.payer.name.given_name)

                    // TODO: on success, call server and mark lesson as PAID

                    // return fetch(...)
                }}
            />
        </Dialog>
    )
}

export function PaymentDialog(props) {
    const { amount } = props
    const classes = useStyles()

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = value => {
        setOpen(false)
    }

    return (
        <div>
            <Button
                className={classes.button}
                onClick={handleClickOpen}>
                {'Pay'}
            </Button>
            <SimpleDialog open={open} setOpen={setOpen} onClose={handleClose} amount={amount} />
        </div>
    )
}