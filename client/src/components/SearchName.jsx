import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsName } from "../redux/actions/actions";
import style from "../css/search.module.scss";

export default function SearchBreed({ paginate }) {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        if (!search) return alert('Breed is require')
        dispatch(getBreedsName(search))
        setSearch('')
    }

    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        paginate(1)
    }


    return (
        <div>

            <form onSubmit={onSubmit} action="" className={style.search_bar}>
                <input type="search" name="search" onChange={onInputChange} pattern=".*\S.*" required />
                    <button className={style.search_btn} type="submit">
                        <span>Search</span>
                    </button>
            </form>
        </div>
    )
}