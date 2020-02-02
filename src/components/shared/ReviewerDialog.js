import React from 'react';
import { Dialog, DialogTitle, DialogContent, Select, InputLabel, MenuItem, makeStyles, FormControl, Button, DialogActions } from '@material-ui/core';

const EditorDialog = (props) => {
    const { open, onClose, authors, handleSubmit, userId } = props

    const [ids, setIds] = React.useState([]);

    const handleChange = event => {
        setIds(event.target.value);
    };

    const handleClick = () => {
        if (ids.length === 0) {
            return;
        }
        handleSubmit(ids);
    }

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle style={{ paddingBottom: '0px' }}>
                Set reviewers
            </DialogTitle>
            <DialogContent style={{ width: 380 }}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Recommended</InputLabel>
                    <Select
                        multiple
                        value={ids}
                        onChange={handleChange}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}
                    >
                        {authors.filter(a => a.id !== userId).map(a => (
                            <MenuItem key={a.id} value={a.id}>
                                {`${a.name} ${a.surname}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">All</InputLabel>
                    <Select
                        multiple
                        value={ids}
                        onChange={handleChange}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}
                    >
                        {authors.filter(a => a.id !== userId).map(a => (
                            <MenuItem key={a.id} value={a.id}>
                                {`${a.name} ${a.surname}`}
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
        width: 300
    },
}));