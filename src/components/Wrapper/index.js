import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
	wrapper: {
		background: theme.palette.secondary.dark,
		borderRadius: "0.25rem",
		padding: "1rem",
		margin: "1rem"
	}
}));
/**
 *
 * @param {Object} param0
 * @param {any} children
 * @param {import("react").HTMLProps} props
 */
const Wrapper = ({ children, ...props }) => {
	const styles = useStyle();
	return (
		<div className={styles.wrapper} {...props}>
			{children}
		</div>
	);
};

export default Wrapper;
