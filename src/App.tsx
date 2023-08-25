import { useState } from "react";

import NFTCardList from "./components/NFTCardList";
import SearchBar from "./components/SearchBar";
import styles from "./App.module.scss";

function App() {
	const [searchValue, setSearchValue] = useState<string>("");
	return (
		<div
			className={styles.app}
			style={{ backgroundColor: "#0f0f0f", minHeight: "100vh" }}
		>
			<SearchBar handleSearch={(value) => setSearchValue(value)} />
			<NFTCardList filter={{ name: searchValue }} />
		</div>
	);
}

export default App;
