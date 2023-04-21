import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "reactstrap";
import Browse from "../../pages/Browse";

const PagesTracker = ({ currentPage, setPage, pageSize, setData }) => {

    const pageNum = Number(currentPage);

    // Need to work on the linkable pages. Make the current page not linkable.
    const [firstPageLinkable, setFirstPageLinkable] = useState(false);
    const [secondPageLinkable, setSecondPageLinkable] = useState(true);
    const [thirdPageLinkable, setThirdPageLinkable] = useState(true);
    const [fourthPageLinkable, setFourthPageLinkable] = useState(true);
    const [fifthPageLinkable, setFifthPageLinkable] = useState(true);

    let needPageOne = null;
    let firstPage;
    let secondPage;
    let thirdPage;
    let fourthPage;
    let fifthPage;

    switch (pageNum) {
        case 1:
        case 2:
        case 3: {
            needPageOne = null;
            firstPage = 1;
            secondPage = 2;
            thirdPage = 3;
            fourthPage = 4;
            fifthPage = 5;

            break;
        }

        default: {
            needPageOne = 1;
            firstPage = pageNum - 2;
            secondPage = pageNum - 1;
            thirdPage = pageNum;
            fourthPage = pageNum + 1;
            fifthPage = pageNum + 2;
            break;
        }
    }


    return (
        <div>
            <h2>Page Tracker</h2>
            <div style={{ fontSize: '25px' }}>
                {needPageOne && (
                    <>
                        <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${needPageOne}`} onClick={() => setPage(needPageOne)}>First Page</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </>
                )}

                {(pageNum === firstPage ? (
                    <span>{firstPage}</span>
                    
                ) : (
                    <Link
                        to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${firstPage}`}
                        onClick={() => setPage(firstPage)}
                    >
                        {firstPage}
                    </Link>
                ))}
                {', '}

                {(pageNum === secondPage ? (
                    <span>{secondPage}</span>
                    
                ) : (
                    <Link
                        to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${secondPage}`}
                        onClick={() => setPage(secondPage)}
                    >
                        {secondPage}
                    </Link>
                ))}
                {', '}

                {(pageNum === thirdPage ? (
                    <span>{thirdPage}</span>
                    
                ) : (
                    <Link
                        to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${thirdPage}`}
                        onClick={() => setPage(thirdPage)}
                    >
                        {thirdPage}
                    </Link>
                ))}
                {', '}

                {(pageNum === fourthPage ? (
                    <span>{fourthPage}</span>
                    
                ) : (
                    <Link
                        to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${fourthPage}`}
                        onClick={() => setPage(fourthPage)}
                    >
                        {fourthPage}
                    </Link>
                ))}
                {', '}

                {(pageNum === fifthPage ? (
                    <span>{fifthPage}</span>
                    
                ) : (
                    <Link
                        to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${fifthPage}`}
                        onClick={() => setPage(fifthPage)}
                    >
                        {fifthPage}
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default PagesTracker