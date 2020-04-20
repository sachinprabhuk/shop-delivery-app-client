import React from "react";
import './dashboard.css'
import Collapsible from "../HOC/Collapsible";
function Dashboard() {
	return (
		<div className="full-container h-padd">
			<div className="header v-padd">
				<h3>Welcome ShopOwner</h3>
			</div>
			<Collapsible title="My Products">
				Product 1
			</Collapsible>
		</div>
	);
}

export default Dashboard;
