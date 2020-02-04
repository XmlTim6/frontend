import React, { useState } from 'react';
import { Dialog, TextField, Button, DialogContent, DialogTitle } from '@material-ui/core';

const TextDialog = (props) => {

    const { open, onClose, handleSubmit } = props;

    const [text, setText] = useState('')

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true}>
            <DialogTitle style={{ paddingBottom: '0px' }}>
                Input raw XML
            </DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button color="primary" variant="contained" onClick={() => handleSubmit(text)}>Copy</Button>
            </DialogContent>
        </Dialog>
    )
}

export default TextDialog;