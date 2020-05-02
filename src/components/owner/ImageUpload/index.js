import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import './imageUpload.css';
export default ({ onChange }) => {
    let [picture, preview] = useState("");
    return (
		<label className="uploader-component">
			<div className="image-preview">
				{picture && <img src={picture}/>}
			</div>
			<div className="centered upload-overlay flex-upload">
                <FontAwesomeIcon icon={faUpload} size="3x"/>
			</div>
			<input
				type="file"
				style={{ display: "none" }}
				onChange={(e) => {
					let reader = new FileReader();
					reader.onload = ({ target: { result } }) => {
						console.log(result);
						preview(result);
					};
					reader.readAsDataURL(e.target.files[0]);
					onChange(e.target.files[0]);
				}}
			/>
		</label>
	);
}