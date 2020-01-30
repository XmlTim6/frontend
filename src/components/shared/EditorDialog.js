import React from 'react';
import { Dialog, DialogTitle, DialogContent, Select, InputLabel, MenuItem, makeStyles, FormControl, Button, DialogActions } from '@material-ui/core';

const EditorDialog = (props) => {
    const { open, onClose, editors, handleSubmit } = props    

    const [editorId, setEditorId] = React.useState('');

    const handleChange = event => {
        setEditorId(event.target.value);
    };

    const handleClick = () => {
        if(editorId === ''){
            return;
        }
        handleSubmit(editorId);
    }

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ paddingBottom: '0px' }}>
                Set editor
            </DialogTitle>
            <DialogContent>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Editor</InputLabel>
                    <Select
                        value={editorId}
                        onChange={handleChange}
                    >
                        {editors.map(e => (
                            <MenuItem key={e.id} value={e.id}>
                                {`${e.name} ${e.surname}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={handleClick}>Set</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditorDialog;

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));