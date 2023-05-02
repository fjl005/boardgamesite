import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

const Filters = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=f24B6m6kXF')
            .then(response => response.json())
            .then(data => {
                const categories = data.categories;
                const categoryNames = categories.map(category => category.name);
                setCategories(categoryNames);
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <>
            <Button onClick={toggle}>Categories</Button>

            {isOpen && (
                <Modal isOpen={isOpen} toggle={toggle} size='lg'>
                    <ModalHeader toggle={toggle}>Categories</ModalHeader>
                    <ModalBody>
                        <Container>
                            {categories.map((category, idx) => (
                                idx % 3 === 0 ? (
                                    <Row key={idx}>
                                        <Col sm='4'>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type='radio' name='category' />
                                                    {category}
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm='4'>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type='radio' name='category'/>
                                                    {categories[idx+1]}
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm='4'>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type='radio' name='category' />
                                                    {categories[idx+2]}
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ) : null
                            ))}
                        </Container>
                    </ModalBody>
                    <ModalFooter>Modal Footer</ModalFooter>
                </Modal>

            )}
        </>
    )
}

export default Filters