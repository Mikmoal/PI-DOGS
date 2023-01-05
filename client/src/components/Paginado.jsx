import React from "react";
import style from "../css/paginado.module.scss";

export default function Pagination({ postPerPage, totalPost, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }




    return (
        <div>

            <ul className={style.pagination}>
                <li><a href={() => false} onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>{"<<"}</a></li>

                {pageNumbers.map(number => (
                    <li key={number}><a href={() => false} onClick={() => paginate(number)}>{number}</a></li>
                ))}

                <li><a href={() => false} onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}>{">>"}</a></li>
            </ul>

        </div>
    )
}