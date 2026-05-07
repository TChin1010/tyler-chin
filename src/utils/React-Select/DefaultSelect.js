const DefaultStyle = {
	control: (base) => ({
		...base,
		background: "transparent",
		border: "none",
		boxShadow: "none",
		height: "100%",
		minWidth: "150px",
		cursor: "pointer",
		alignSelf: "center",
		paddingRight: "var(--side-margins)"
	}),

	singleValue: (base) => ({
		...base,
		color: "white",
		fontSize: "1.5rem",  // Simulates H2
		fontWeight: "600",
		justifySelf: "end",
		margin: 0,
	}),

	indicatorsContainer: (base) => ({
		...base,
		display: "none", // removes dropdown arrow
	}),
	menuList: (base) => ({
		...base,
		backgroundColor: "var(--background-color)",
	}),
	menu: (base) => ({
		...base,
		right: 0,
		marginRight: "var(--side-margins)",
		backgroundColor: "var(--background-color)",
		boxShadow: "none",
	}),
	option: (base, state) => ({
		...base,
		backgroundColor: state.isFocused
			? "color-mix(in srgb, var(--background-color) 60%, white 10%)"
			: "var(--background-color)",

		color: "white",
		display: "flex",
		justifyContent: "flex-end", // or center / flex-start
		textAlign: "right",
		":active": {
			backgroundColor: "color-mix(in srgb, var(--background-color) 60%, white 20%)",
		}
	}),
};

export default DefaultStyle;