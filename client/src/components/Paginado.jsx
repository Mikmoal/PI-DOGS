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
                <li>
                <button className={style.buttonNumber} onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>{"<<"}</button>
                </li>
                 

                {pageNumbers.map(number => (
                    <li key={number}><button className={style.buttonNumber} onClick={() => paginate(number)}>{number}</button></li>
                ))}

                <li><button className={style.buttonNumber} onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}>{">>"}</button></li>
            </ul>

        </div>
    )
}