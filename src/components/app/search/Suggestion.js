import React from "react";
import { firstLetterToUpperCase } from "../../../utils/utils";

export const Suggestion = ({ suggestion }) => {
    return <p className="p-3 border-bottom m-0">{firstLetterToUpperCase(suggestion.name)}</p>;
};
