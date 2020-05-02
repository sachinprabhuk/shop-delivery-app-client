import React, { useState } from 'react';
import ImageUpload from '../ImageUpload';
import './addProductPage.css'
let dummySubmit = console.log;
export default () => {
    let name = useInput("");
    let price = useInput("");
    let quantity = useInput("");
    let description = useInput("");
    let [pic, changePic] = useState(null);

    let submit = () => {
        dummySubmit({
            name: name.value,
            price: price.value,
            quantity: quantity.value,
            description: description.value,
            pic
        });
    }

    return (
		<div className="centered form-container">
			<div className="img-upload" style={{position:"relative"}}>
				<div className = "centered" style={{"width":"200px","height":"200px"}}>
					<ImageUpload onChange={changePic} />
				</div>
			</div>
			<div className="input-fields">
				<h3>Add Product</h3>
				<input className="custom-input" {...name} placeholder="name" />
				<input
					className="custom-input"
					type="number"
					{...quantity}
					placeholder="quantity"
				/>
				<input
					className="custom-input"
					type="number"
					{...price}
					placeholder="price"
				/>
				<textarea
					className="custom-input"
					rows={3}
					{...description}
					placeholder="description"
				/>
				<div style={{ textAlign: "right" }}>
					<button onClick = {submit}>submit </button>
				</div>
			</div>
		</div>
	);
}

function useInput(default_value) {
    let [value, changeValue] = useState(default_value);
    return {
        value: value,
        onChange: (r) => changeValue(r.target.value)
    }
}