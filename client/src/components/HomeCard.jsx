import { Link } from "react-router-dom";
import style from '../css/homeCard.module.scss';



export default function BreedCard({ id, img, name, weightMin, weightMax, temperament }) {

    return (
        <div className={style.imagenP}>
            <img src={img} alt="img" />
            <Link to={`/home/${id}`}>
                <h5>{name}</h5>
            </Link>
            <h6>Weight: </h6><p> Min: {weightMin}kg - Max: {weightMax}kg</p>
            <h6>Temperament:</h6><p> {temperament}</p>
        </div>
        
    )
}