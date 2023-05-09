import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/allpages/Header";
import { helpData } from "../components/help/helpData";

import { Container, Row, Col } from "reactstrap";

const Help = () => {
    return (
        <>
            <Header />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Help!! What am I even doing here?</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 style={{color: 'black'}}>
                            You might be a little lost or confused. The FAQs below should answer your questions. If you have any further questions, please reach out to j.franklee22@gmail.com.
                        </h4>
                    </Col>
                </Row>
            </Container>

            {helpData.map((qAndA, idx) => (
                <Container className='homepage-section' key={idx}>
                    <Row>
                        <Col>
                            <h2>{qAndA.question}</h2>
                            <p style={{whiteSpace: 'pre-wrap'}}>{qAndA.answer}</p>
                        </Col>
                    </Row>
                </Container>
            ))}
{/* 
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h2>What is this site?</h2>
                        <p>This is a fictional site created by Frank to utilize his React knowledge. The overall goal was to utilize a free online API that was of interest to him; since he loves board games, he decided to use Board Game Atlas (BGA). The 'Browse Games' section lets you browse games fetched by the BGA API, with filter options such as by category. The 'Atlas Forums' section also incorporates the BGA API, using forum data from actual BGA users. 'Galore Posts' is a section made entirely by Frank, with the help of auto-generated AI responses. The 'Make a Post' section is used to add a post to the 'Galore Posts' database; however, as of right now this function is not accessible at the moment. And lastly, the Home Page models that of any popular website, with various sections highlighting miscellaneous games and data.
                        </p>
                    </Col>

                    <Col>
                        <h2>When did you start on this project?</h2>
                        <p>Frank started working on this project when he ended his React course during his Nucamp Bootcamp (~mid-late April of 2023). 
                        </p>
                    </Col>

                    <Col>
                        <h2>Where can I see the code?</h2>
                        <p>The code can be accessed here; all changes were periodically updated with Github. 
                        </p>
                    </Col>

                    <Col>
                        <h2>Some parts of your site don't work well. Why?</h2>
                        <p>For one, I was limited by the possible actions of the BGA API. But, if there are any visible, egregious mistakes, please point them out to me so I can fix them! I try my best to keep the code as perfect as possible, but I can be prone to errors. I don't identify myself as one who is super knowledgable in coding (as I am only a junior after all), but as one who will always give it his best, seeking perfection and not giving up until everything looks right. 
                        </p>
                    </Col>
                </Row> */}
            {/* </Container> */}
        </>
    )
}

export default Help
