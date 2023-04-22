import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "reactstrap";
import Browse from "../../pages/Browse";

const PagesTrackerForum = ({ currentPage, setPage, inputValue, isLoadingPageNums }) => {



    const pageNum = Number(currentPage);

    // If there is already an input value (aka, you searched 'Catan'), then this will include a search/inputValue in the Url.
    let browseSearchUrl;
    if (inputValue) {
        browseSearchUrl = `forums/search/${inputValue}`;
    } else {
        browseSearchUrl = `forums`;
    }

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
            {isLoadingPageNums ? (
                <h4>Searching for Pages...</h4>

            ) : (
                <div style={{ fontSize: '25px' }}>
                    {needPageOne && (
                        <>
                            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/${browseSearchUrl}/page/${needPageOne}`} onClick={() => setPage(needPageOne)}>First Page</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </>
                    )}

                    {(pageNum === firstPage ? (
                        <span>{firstPage}</span>

                    ) : (
                        <Link
                            to={`${window.location.protocol}//${window.location.hostname}:3000/${browseSearchUrl}/page/${firstPage}`}
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
                            to={`${window.location.protocol}//${window.location.hostname}:3000/${browseSearchUrl}/page/${secondPage}`}
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
                            to={`${window.location.protocol}//${window.location.hostname}:3000/${browseSearchUrl}/page/${thirdPage}`}
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
                            to={`${window.location.protocol}//${window.location.hostname}:3000/${browseSearchUrl}/page/${fourthPage}`}
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
                            to={`${window.location.protocol}//${window.location.hostname}:3000/${browseSearchUrl}/page/${fifthPage}`}
                            onClick={() => setPage(fifthPage)}
                        >
                            {fifthPage}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PagesTrackerForum;