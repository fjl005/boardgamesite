import { Row, Col } from "reactstrap";

const ArticleInfo = ({
    title,
    subTitle,
    author,
    image,
    paragraph,
    submissionTime,
    date,
    inGalorePost,
}) => {
    return (
        <>
            <Row>
                <Col>
                    <h1>{title}</h1>
                    <h2 className='font-size-1-5'>{subTitle}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className='font-size-1-2 mb-0'>By {author}</p>
                    {(submissionTime && date) && (
                        <p>Posted {submissionTime}, {date}</p>
                    )}
                </Col>
            </Row>

            {(image !== 'null' && image !== undefined) && (
                <Row>
                    <Col>
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className='galore-post-img'
                            />
                        )}
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    {inGalorePost ?
                        paragraph && paragraph.map((text, idx) => {
                            return text.length < 50 ? (
                                <h4 key={idx}>{text}</h4>
                            ) : (
                                <p key={idx}>{text}</p>
                            )
                        }) : (
                            <div>
                                <pre className='pre-inherit-format'>
                                    {paragraph}
                                </pre>
                            </div>
                        )
                    }

                </Col>
            </Row>
        </>
    )
}

export default ArticleInfo