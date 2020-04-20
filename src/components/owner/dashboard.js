import React from "react";
import './dashboard.css'
import Collapsible from "../HOC/collapsible";
import ProductCard from "./ProductCard";
let standard_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let standard_imageURL = "https://image.shutterstock.com/image-vector/concept-touch-screen-smartphone-blank-600w-1433190200.jpg";

let dummy = [
	{
		id:"_",
		name: "Phone",
		price: 17000,
		rating: 3.5,
		description: standard_description,
		imageURL:standard_imageURL
	}
]
dummy.push(...dummy)
dummy.push(...dummy)
dummy.push(...dummy)
function Dashboard() {
	return (
		<div className="full-container h-padd">
			<div className="header v-padd">
				<h3>Welcome ShopOwner</h3>
			</div>
			<Collapsible title="My Products">
				<div style={{
					"display": "flex",
					"justifyContent": "space-evenly",
					"flexWrap":"wrap"
				}}>
					{dummy.map((item, index) => <ProductCard {...item} key={index} />)}
				</div>
			</Collapsible>
		</div>
	);
}

export default Dashboard;
