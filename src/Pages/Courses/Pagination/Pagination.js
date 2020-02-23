import React from 'react';
import './Pagination.css';

const Pagination = ({total, setPage, page}) => {
    const clickHandler = (i) => {
        setPage(i);
    }

    const pageLinks = [];
    for(let i=1; i<=total; i++) {
        pageLinks.push(
            <li 
                onClick={() => clickHandler(i)}
                className="page-item" 
                key={i * new Date().getTime()}>
                <a href="#cats" className={`page-link ${page === i ? 'pageActive': ''}`}>{i}</a>
            </li>
        )
    }
    return (
        <nav className="Pagination">
            <ul className="pagination">
                <li 
                    className="page-item mr-3" 
                    onClick={() => clickHandler((page - 1) > 0 ? page - 1 : page)}>
                    <a href="#cats" className="page-link">Previous</a>
                </li>

                {pageLinks}

                <li
                    onClick={() => clickHandler((page + 1) <= total ? page + 1 : page)} 
                    className="page-item ml-3">
                    <a href="#cats" className="page-link">Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;
