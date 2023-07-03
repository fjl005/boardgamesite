import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

const Filters = ({ setPage, selectedCategory, setSelectedCategory, setPrevCategory, setSelectedCategoryId, setCategoryReset, lookingUpResults, fullLengthData, isLoadingPageNums }) => {

    // States are defined here.
    const [isOpen, setIsOpen] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [tempCategorySelection, setTempCategorySelection] = useState(null);

    // When the results are being looked up, check to see if there is a category selected. If so, then showCategory is true
    useEffect(() => {
        if (selectedCategory) {
            setShowCategory(true);
        } else {
            setShowCategory(false);
            setTempCategorySelection(null);
        }
    }, [lookingUpResults]);

    // Set up toggle for the modal
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const updateCategory = () => {
        if (tempCategorySelection) {
            setSelectedCategory(tempCategorySelection);
            const selectedCategoryIndex = categories.indexOf(tempCategorySelection);
            const categorySearch = categoryIds[selectedCategoryIndex];
            setSelectedCategoryId(categorySearch);
            toggle();
            setPage(1);
        }
    }

    const clearCategory = () => {
        setCategoryReset(true);
        setShowCategory(false);
        setSelectedCategory(null);
        setPrevCategory(null);
        /* I need to set the category and the prev category to null. The reason why is because of the following order:
        (1) 'Aliens' category is selected -- selectedCategory: Aliens, prevCategory: null
        (2) Category is cleared -- selectedCategory: null, prevCategory: null (NOT Aliens) 
        (3) 'Aliens' category is selected AGAIN -- selectedCategory: Aliens, prevCategory: null (NOT Aliens). If the prevCategory remained as Aliens, then the site would not have detected a category change. The category change is triggered because of the category clearing. 
        */
        setSelectedCategoryId(null);
    }

    const handleCategoryChange = (event) => {
        setTempCategorySelection(event.target.value);
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
                                            {categories[idx + 1] ? (
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
                                            ) : null}
                                        </Col>

                                        <Col sm='4'>
                                            {categories[idx + 2] ? (
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
                                            ) : null}
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
                    {!isLoadingPageNums && (
                        <p>{fullLengthData} results found. </p>
                    )}
                    <span
                        style={{
                            textDecoration: 'underline',
                            color: 'blue',
                            cursor: 'pointer'
                        }}
                        onClick={() => clearCategory()}
                    >Clear Category</span>
                </>
            )}
        </>
    )
}

export default Filters;
