import { Link } from "react-router-dom";
import LoadingIcon from "../allpages/LoadingIcon";
import React from "react";

const PagesTracker = ({ page, setPage, inputValue, isLoadingPageNums, fullLengthData, dataType }) => {

    const pageNum = Number(page);
    let maxPages = Math.ceil(fullLengthData / 50);
    // Set maxPages to 1 if the fullLengthData is 0. If there are no results, then we should just make the maxPages 1 instead of 0. This would later down the road prevent the '1' page be shown as a link.
    if (maxPages === 0) {
        maxPages = 1;
    }

    // If there is already an input value (aka, you searched 'Catan'), then this will include a search/inputValue in the Url.
    let urlQuery;
    if (dataType === 'games') {
        if (inputValue) {
            urlQuery = `browse/search/${inputValue}`;
        } else {
            urlQuery = 'browse';
        }
    } else if (dataType === 'forum') {
        if (inputValue) {
            urlQuery = `forums/search/${inputValue}`;
        } else {
            urlQuery = 'forums';
        }
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

    const pagesTwotoFive = [secondPage, thirdPage, fourthPage, fifthPage];

    return (
        <div>
            <h4>Page Tracker</h4>
            {isLoadingPageNums ? (
                <div style={{ display: 'flex', alignItems: 'center', color: 'teal' }}>
                    <LoadingIcon />
                    <h5 style={{ marginLeft: '0.5rem' }}>Loading Pages...</h5>
                </div>

            ) : (
                <div style={{ fontSize: '18px' }}>
                    {needPageOne && (
                        <>
                            <Link
                                to={`/${urlQuery}/page/${needPageOne}`}
                                onClick={() => setPage(needPageOne)}
                            >First Page</Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </>
                    )}

                    {(((pageNum === firstPage) && (firstPage <= maxPages)) || maxPages === 'NaN' ? (
                        <>
                            <span>{firstPage}</span>
                            {(secondPage <= maxPages) && ', '}
                        </>
                    ) : (
                        <>
                            <Link
                                to={`/${urlQuery}/page/${firstPage}`}
                                onClick={() => setPage(firstPage)}
                            >
                                {firstPage}
                            </Link>
                            {(secondPage <= maxPages) && ', '}
                        </>
                    ))}

                    {/* Check if the array of pages two to five exists. */}
                    {/* If the page is less than the maxPages, then we can proceed to list the page number on the screen. But if the current page number is that page, then we want it to be a span text that cannot be clicked. */}

                    {pagesTwotoFive.length > 0 && (
                        <>
                            {pagesTwotoFive.map((pageInArr, idx) => (
                                <React.Fragment key={idx}>
                                    {pageInArr <= maxPages && (
                                        pageNum === pageInArr ? (
                                            <span>{pageInArr}</span>
                                        ) : (
                                            <Link
                                                to={`/${urlQuery}/page/${pageInArr}`}
                                                onClick={() => setPage(pageInArr)}
                                            >
                                                {pageInArr}
                                            </Link>
                                        )
                                    )}
                                    {idx < pagesTwotoFive.length - 1 && pageInArr < maxPages && (
                                        ', '
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default PagesTracker;