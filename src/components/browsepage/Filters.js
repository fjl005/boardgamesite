import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

const Filters = ({ setPage, selectedCategory, setSelectedCategory, setSelectedCategoryId, setCategoryReset }) => {

    // States are defined here.
    const [isOpen, setIsOpen] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const updateCategory = () => {
        if (selectedCategory) {
            const selectedCategoryIndex = categories.indexOf(selectedCategory);
            const categorySearch = categoryIds[selectedCategoryIndex];
            setSelectedCategoryId(categorySearch);
            toggle();
            setShowCategory(true);
            setPage(1);
        }
    }

    const clearCategory = () => {
        setCategoryReset(true);
        setShowCategory(false);
        setSelectedCategory(null);
        setSelectedCategoryId(null);
        // console.log('i am in clear category in Filters.js. the selected category should say reset. ', selectedCategory);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

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
                        <Button className='bg-primary' onClick={() => updateCategory()}>Update</Button>
                    </ModalFooter>
                </Modal>
            )}

            {showCategory && (
                <>
                    <h4>Selected Category: {selectedCategory}</h4>
                    <span 
                        style={{ 
                            textDecoration: 'underline', 
                            color: 'blue',
                            cursor: 'pointer'}}
                        onClick={()=>clearCategory()}
                    >Clear Category</span>
                </>
            )}
        </>
    )
}

export default Filters