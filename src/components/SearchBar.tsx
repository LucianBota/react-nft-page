import React, { useState } from "react";

import styles from "../App.module.scss";

export type SearchBarProps = {
	handleSearch: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
	const [searchText, setSearchText] = useState<string>("");

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setSearchText(event.target.value);
		handleSearch(event.target.value);
	};

	return (
		<div className={styles.searchBar}>
			<div className={styles.inputContainer}>
				<input
					className={styles.input}
					type="search"
					value={searchText}
					onChange={handleInputChange}
					placeholder="Search NFT by name..."
				/>
			</div>
		</div>
	);
};

export default SearchBar;
