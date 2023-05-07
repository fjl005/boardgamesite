import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

const Filters = ({ setData, selectedCategory, setSelectedCategory, apiUrlCategory, setApiUrlCategory }) => {
    const clientId = 'f24B6m6kXF';

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const updateCategory = () => {
        if (selectedCategory) {
            console.log('selected category: ', selectedCategory);
            const selectedCategoryIndex = categories.indexOf(selectedCategory);
            console.log('category index is: ', selectedCategoryIndex);
            const categorySearch = categoryIds[selectedCategoryIndex];
            setApiUrlCategory(`https://api.boardgameatlas.com/api/search?&categories=${categorySearch}&client_id=${clientId}`);
            console.log('api url is: ', apiUrlCategory);
            toggle();
        }
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);

    useEffect(() => {
        fetch('https://api.boardgameatlas.com/api/game/categories?pretty=true&client_id=f24B6m6kXF')
            .then(response => response.json())
            .then(data => {
                const categories = data.categories;
                const categoryNames = categories.map(category => category.name);
                const listCategoryIds = categories.map(category => category.id);
                setCategories(categoryNames);
                setCategoryIds(listCategoryIds);
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
                                                    <Input
                                                        type='radio'
                                                        name='category'
                                                        value={category}
                                                        onChange={handleCategoryChange}

                                                    />
                                                    {category}
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm='4'>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        type='radio'
                                                        name='category'
                                                        value={categories[idx + 1]}
                                                        onChange={handleCategoryChange}
                                                    />
                                                    {categories[idx + 1]}
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm='4'>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        type='radio'
                                                        name='category'
                                                        value={categories[idx + 2]}
                                                        onChange={handleCategoryChange}
                                                    />
                                                    {categories[idx + 2]}
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ) : null
                            ))}
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toggle}>Close</Button>
                        <Button className='bg-primary' onClick={()=>updateCategory()}>Update</Button>
                    </ModalFooter>
                </Modal>
            )}

            {selectedCategory && (
                <h4>Selected Category: {selectedCategory}</h4>
            )}
        </>
    )
}

export default Filters