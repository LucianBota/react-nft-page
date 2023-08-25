import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";
import styles from "./App.module.scss";

test("renders without errors", () => {
	const { container } = render(<App />);
	const myElement = container.querySelector(`.${styles.app}`);
	expect(myElement).toBeInTheDocument();
});
