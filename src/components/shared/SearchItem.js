import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PaperDialog from './PaperDialog';
import { PaperService } from '../../services/PaperService';

const SearchItem = (props) => {
    const { paper } = props

    const classes = useStyles();

    const [links, setLinks] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    useEffect(() => {
        PaperService.getCitedBy(paper.link)
            .then(response => {
                const array = []
                response.data.results.bindings.forEach(element => {
                    if (!array.includes(element.paper.value.replace('http://localhost:3000', ''))) { array.push(element.paper.value.replace('http://localhost:3000', '')) }
                });
                setLinks(array)
            })
    }, [paper])

    return (
        <div>
            <Paper className={classes.paper}>
                <div>
                    <Typography variant="h6">
                        <Link to={paper.link}>{paper.title}</Link>
                    </Typography>
                    <Typography variant="body1">
                        {
                            paper.authors.map((author, i) => <span key={`${paper.id}_author_${i}`}> {author} </span>)
                        }
                        <br />
                        Keywords:
                    {
                            paper.keywords.map((keyword, i) => <span key={`${paper.id}_keyword_${i}`}> "{keyword}" </span>)
                        }
                    </Typography>
                </div>
                <div className={classes.grower} />
                <div>
                    {`Received : ${paper.received}`}
                    <br />
                    {`Accepted: ${paper.accepted}`}
                    <br />
                    <Button style={{ marginTop: 8 }} color="primary" variant="contained" onClick={handleOpenDialog}>CITED BY</Button>
                </div>
            </Paper>
            <PaperDialog open={open} onClose={handleCloseDialog} links={[...links]} />
        </div>
    )

}


export default SearchItem;

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
        display: 'flex'
    },
    grower: {
        flexGrow: 1
    }
}));