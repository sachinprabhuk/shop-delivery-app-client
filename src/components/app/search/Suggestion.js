import React from "react";
import { firstLetterToUpperCase } from "../../../utils/utils";
import { Link } from "react-router-dom";

export const Suggestion = ({ suggestion, type }) => {
    return (
        <Link to={`/search/${type}/${suggestion.name}/${suggestion.id}`}>
            <p className="p-3 border-bottom m-0 text-dark">
                {firstLetterToUpperCase(suggestion.name)}
            </p>
        </Link>
    );
};
