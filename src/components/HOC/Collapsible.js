import React, { useState } from 'react';
import { KeyboardArrowDown,KeyboardArrowUp } from "@material-ui/icons"
import './collapsible.css';
export default ({ title, open, children }) => {
    let [collapse, toggleCollapse] = useState(!!open);
    return <div className="collapsible">
        <div className="header" onClick = {() => toggleCollapse(current => !current)}>
            <div className="title">{title}</div>
            <div className = "line"/>
            <div className="toggle">
                {collapse && <KeyboardArrowDown />}
                {!collapse && <KeyboardArrowUp/>}
            </div>
        </div>
        {!collapse && <div className="body">
            {children}
        </div>}
    </div>
}