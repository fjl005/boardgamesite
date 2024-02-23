import NavbarApp from '../components/allpages/NavbarApp';
import { NAVBAR_HEADERS } from '../components/allpages/navbarHeaders';
import { Container, Row, Col } from 'reactstrap';
import React, { useState } from 'react';
import AutofillList from '../components/makepost/AutofillList';
import MakePostForm from '../components/makepost/MakePostForm';

const MakePost = () => {
    const [formDataState, setFormDataState] = useState({
        author: '',
        title: '',
        subTitle: '',
        paragraph: '',
    });

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
            />
        </>
    )
}

export default MakePost;