import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "reactstrap";
import Browse from "../../pages/Browse";

const PagesTracker = ({ currentPage, setPage, pageSize, setData }) => {

    const pageNum = Number(currentPage);

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



    // First, subtract the current page by 2 and see if it's 2 or greater. If it is, then that number is the lowest Page.

    // Then, add the current page by 2 and see if it's greater than


    return (
        <>
            <h1>Page Tracker</h1>
            <div style={{ fontSize: '25px' }}>
                {needPageOne && (
                    <>
                        <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${needPageOne}`} onClick={() => setPage(needPageOne)}>First Page</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </>
                )}

                <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${firstPage}`} onClick={() => setPage(firstPage)}>{firstPage}</Link>{', '}
                <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${secondPage}`} onClick={() => setPage((secondPage))}>{secondPage}</Link>{', '}
                <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${thirdPage}`} onClick={() => setPage(thirdPage)}>{thirdPage}</Link>{', '}
                <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${fourthPage}`} onClick={() => setPage(fourthPage)}>{fourthPage}</Link>{', '}
                <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/${fifthPage}`} onClick={() => setPage(fifthPage)}>{fifthPage}</Link>
            </div>

        </>
    )
}

export default PagesTracker