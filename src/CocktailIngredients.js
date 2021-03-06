import React, { useState, useEffect } from "react";
import CocktailListItem from "./CocktailListItem";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

export default function CocktailIngredients({ match }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getData();
    }, [match]);

    async function getData() {
        const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${match.params.item}`
        );
        const data = await res.json();
        setList(data.drinks);
    }

    return (
        <>
            <h2>Cocktails made of {match.params.item.replace("_", " ")}</h2>
            <ul className="drinkUl">
                {list.map(item => (
                    <Link to={`/ingredients/:item/${item.idDrink}`} key={v4()}>
                        <CocktailListItem data={item} />
                    </Link>
                ))}
            </ul>
        </>
    );
}
