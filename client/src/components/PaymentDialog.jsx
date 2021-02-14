import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import ClearIcon from '@material-ui/icons/Clear'
import { PayPalButton } from 'react-paypal-button-v2'

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
    closeIcon: {
        margin: theme.spacing(2, 3),
        '&:hover': {
            cursor: 'pointer',
        }
    }
}))

export function SimpleDialog(props) {
    const classes = useStyles()
    const { onClose, open, setOpen, amount, lessonId } = props

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog onClose={handleClose} fullWidth={true} open={open}>
            <ClearIcon
                onClick={onClose}
                onKeyDown={(e) => {
                    if (e.keyboardEvent.code === 27) {
                        setOpen(false)
                    }
                }}
                className={classes.closeIcon} />
            <DialogTitle align='center' variant='h1' id='payment-dialog-title'>
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
    const { amount, lessonId } = props
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
            <SimpleDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                amount={amount}
                lessonId={lessonId} />
        </div>
    )
}