import NavbarApp from "../allpages/NavbarApp";
import { Container, } from "reactstrap";
import { Link } from "react-router-dom";
import { galorePostsData } from "./galorePostsData";
import { useParams } from "react-router-dom";
import { NAVBAR_HEADERS } from "../allpages/navbarHeaders";
import ArticleInfo from "../mypostspage/ArticleInfo";

const GalorePostTemplate = () => {
    const { title } = useParams();
    const articleData = galorePostsData.find(data => data.title.replace(/\s/g, "").toLowerCase() === title);

    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.galorePosts} />
            <Container className='homepage-section'>
                <ArticleInfo
                    title={articleData.title}
                    subTitle={articleData.subTitle}
                    author={articleData.author}
                    submissionTime={articleData.submissionTime}
                    date={articleData.date}
                    image={articleData.img}
                    paragraph={articleData.paragraph}
                    inGalorePost={true}
                />
            </Container>

            <Container className='homepage-section-no-border'>
                <div className='d-flex justify-content-between'>
                    <Link to={`/galoreposts`}>Back to Galore Posts</Link>
                    <Link to={`/`}>Back to Home Page</Link>
                </div>
            </Container>
        </>

    )
}

export default GalorePostTemplate;