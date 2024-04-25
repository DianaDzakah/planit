import React from "react";
import spinner from "../../assets/spinner.gif";

const Spinner = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img src={spinner} width="70px" alt="" />
		</div>
	);
};

export default Spinner;
