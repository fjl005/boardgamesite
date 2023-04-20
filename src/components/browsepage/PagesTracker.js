import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const PagesTracker = ({ currentPage, setPage, pageSize, setData }) => {


    const changePage = (currentPage) => {
        const newPageNum = currentPage + 1;
        setPage(newPageNum);
    }



    // First, subtract the current page by 2 and see if it's 2 or greater. If it is, then that number is the lowest Page.

    // Then, add the current page by 2 and see if it's greater than

    const lowestPage = (currentPage) => {

    }

    return (
        <>
            <h1>Page Tracker</h1>
            <span onClick={() => changePage(currentPage)} style={{color: 'blue', }}>{currentPage}, </span>
            <span>{currentPage+1}, </span>
            <span>{currentPage+2}, </span>
            <span>{currentPage+3}, </span>
            <span>{currentPage+4}</span>
        </>
    )
}

export default PagesTracker