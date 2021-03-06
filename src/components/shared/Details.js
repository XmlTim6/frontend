import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import Header from './Header';
import { PaperService } from '../../services/PaperService';
import { getToken } from '../../services/TokenService';
import history from '../../helpers/history';

const Details = () => {
    const { submissionId, revision, doc } = useParams();

    const [api, setApi] = useState('');

    useEffect(() => {
        if (api.length === 0) {
            return;
        }
        PaperService.getPaper(api, submissionId, revision, doc, 'html')
            .then((response) => {
                document.getElementById("content").innerHTML = response.data;
            });
    }, [submissionId, revision, doc, api])

    useEffect(() => {
        if (doc.includes('cover')) {
            setApi('coverLetter')
        } else if (doc.includes('review_form')) {
            setApi('reviewForm');
        } else {
            setApi('paper')
        }
    }, [doc])

    const navigate = (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            var hash = e.target.getAttribute('href').replace('#', '');
            if(hash.includes('localhost')){
                hash = hash.replace('http://localhost:3000', '')
                window.scrollTo(0,0)
                history.push(hash)
                window.location.reload()
                return;
            }
            console.log(document.getElementById(hash))
            document.getElementById(hash).scrollIntoView();
            window.scrollBy(0, -64);
        }
    }

    return (
        <Container>
            <Header />
            <Container>
                <div style={{ marginTop: 16, textAlign: "right", fontSize: 22 }}>
                    <a
                        style={{ marginRight: 16 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://localhost:8043/api/${api}?collection=${submissionId}&revision=${revision}&document=${doc}&format=pdf&token=${getToken()}`}>
                        PDF
                    </a>
                    <a
                        style={{ marginRight: 16 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://localhost:8043/api/${api}?collection=${submissionId}&revision=${revision}&document=${doc}&format=xml&token=${getToken()}`}>
                        XML
                    </a>
                    {
                        api === 'paper' &&
                        <span>
                            <a
                                style={{ marginRight: 16 }}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`http://localhost:8043/api/${api}/metadata?collection=${submissionId}&revision=${revision}&document=${doc}&format=rdf&token=${getToken()}`}>
                                META RDF
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`http://localhost:8043/api/${api}/metadata?collection=${submissionId}&revision=${revision}&document=${doc}&format=json&token=${getToken()}`}>
                                META JSON
                            </a>
                        </span>
                    }
                </div>
                <Paper style={{ paddingTop: 16, paddingBottom: 16 }}>
                    <div id="content" onClick={navigate}>

                    </div>
                </Paper>
            </Container>
        </Container>
    )
}

export default Details;