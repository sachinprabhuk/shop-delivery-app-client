import React from 'react';
import { Lens, LensOutlined} from "@material-ui/icons"
import './ProductCard.css'
import { Link } from 'react-router-dom';
export default ({ name, imageURL, price, description, rating, id }) => {
    return <Link className="product-card" to={"owner/"+id}>
        <div className="product-image">
            <img src={imageURL} />
        </div>
        <div className="details">
            <div className="flex" style={{"paddingRight":"10px"}}>
                <div>
                    <div className="greyed">name</div>
                    <div className="name">{name}</div>
                </div>
                <div>
                    <div className="greyed">ratings</div>
                    <div className="ratings">{new Array(5).fill(0).map((_, index) => {
                        if (index + 1 <= rating) return <Lens key={index} fontSize="inherit"/>
                        return <LensOutlined key={index} fontSize="inherit"/>
                    })}</div>
                </div>
            </div>

            <div>
                <div className="greyed">description</div>
                <div className="description">{description.substr(0, 60) + "..."}</div>
            </div>
            <div>
                <div className="greyed">price</div>
                <div className="price"><span className="greyed" style={{ color: "black" }}>$</span>{price}</div>
            </div>
        </div>
    </Link>
}