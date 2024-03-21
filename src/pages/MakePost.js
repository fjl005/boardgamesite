import NavbarApp from '../components/allpages/NavbarApp';
import { NAVBAR_HEADERS } from '../components/allpages/navbarHeaders';
import { Container, Row, Col } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import AutofillList from '../components/makepost/AutofillList';
import MakePostForm from '../components/makepost/MakePostForm';
import { axiosConfig } from '../components/allpages/axiosConfig';

const MakePost = () => {
    const [serverLive, setServerLive] = useState(false);

    const [formDataState, setFormDataState] = useState({
        author: '',
        title: '',
        subTitle: '',
        paragraph: '',
    });

    useEffect(() => {
        const serverCheck = async () => {
            try {
                await axiosConfig.get('/');
                setServerLive(true);
            }
            catch (error) {
                console.error('error: ', error);
                console.log('error code: ', error.code);
                if (error.code = 'ERR_NETWORK') {
                    console.log('not connected to server')
                }
                setServerLive(false);
            }
        };

        serverCheck();
    }, []);

    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.makePost} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Make a Post on Bored Games Galore</h1>
                    </Col>
                </Row>
            </Container>

            <AutofillList setFormDataState={setFormDataState} />

            <MakePostForm
                formDataState={formDataState}
                setFormDataState={setFormDataState}
                serverLive={serverLive}
            />
        </>
    )
}

export default MakePost;