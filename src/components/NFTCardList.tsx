import React, { useEffect, useRef, useState } from "react";

import NFTCard, { NFTCardProps } from "./NFTCard";
import getPaginatedNft from "../api/nftDataService";
import styles from "../App.module.scss";

const CARD_WIDTH = 320;
const CARD_HEIGHT = 380;
const ITEMS_PER_PAGE = 20;

type ArrayIndexInterval = {
	start?: number;
	end?: number;
};

export type NFTCardListProps = {
	filter?: {
		name: string;
	};
};

const NFTCardList: React.FC<NFTCardListProps> = ({ filter = { name: "" } }) => {
	const [items, setItems] = useState<Array<NFTCardProps>>([]);
	const [nextPageToFetch, setNextPageToFetch] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [visibleItemsIndexInterval, setVisibleItemsIndexInterval] =
		useState<ArrayIndexInterval>({});
	const containerRef = useRef<HTMLDivElement>(null);

	const getColumnsPerWindow = (): number => {
		return containerRef.current?.getBoundingClientRect().width
			? Math.max(
					Math.floor(
						containerRef.current?.getBoundingClientRect().width /
							CARD_WIDTH
					),
					1
			  )
			: ITEMS_PER_PAGE;
	};

	const getRowsPerWindow = (): number => {
		return (
			Math.ceil(document.documentElement.clientHeight / CARD_HEIGHT) + 1
		);
	};

	const getRowsOffsetTop = (): number => {
		return Math.floor(
			Math.max(
				0,
				document.documentElement.scrollTop -
					(containerRef.current?.offsetTop || 0)
			) / CARD_HEIGHT
		);
	};

	const getRowsOffsetBottom = (): number => {
		const totalRows =
			items.filter((item) => item.name?.includes(filter.name)).length /
			getColumnsPerWindow();
		return Math.max(
			Math.ceil(totalRows - getRowsOffsetTop() - getRowsPerWindow()),
			0
		);
	};

	const getVisibleItemsIndexInterval = (): ArrayIndexInterval => {
		const itemsTopOffsetCount = getRowsOffsetTop() * getColumnsPerWindow();
		const visibleItemsCount = getRowsPerWindow() * getColumnsPerWindow();
		return {
			start: itemsTopOffsetCount,
			end: itemsTopOffsetCount + visibleItemsCount,
		};
	};

	const getVisibleItems = (
		start?: number,
		end?: number
	): Array<NFTCardProps> => {
		let newItems = items
			.filter((item) => item.name?.includes(filter.name))
			.slice(start, end);
		console.log("newItems: ", newItems);
		return newItems;
	};

	const fetchNftData = () => {
		setIsLoading(true);
		console.log("Fetching");
		getPaginatedNft(nextPageToFetch, ITEMS_PER_PAGE)
			.then((response) => {
				if (response.length > 0) {
					setItems((prev) => [
						...prev,
						...response.map((item: any) => ({
							id: item.id,
							name: item.title,
							price: item.price,
							image: item.img,
						})),
					]);
					setNextPageToFetch((prev) => prev + 1);
				} else {
					setNextPageToFetch(-1);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchNftData();
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [isLoading, filter, items, nextPageToFetch]);

	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } =
			document.documentElement;
		const scrollOffset = scrollHeight - scrollTop - clientHeight;

		if (
			!isLoading &&
			!filter?.name &&
			scrollOffset < CARD_HEIGHT &&
			nextPageToFetch > -1
		) {
			fetchNftData();
		}
		setVisibleItemsIndexInterval(getVisibleItemsIndexInterval());
	};

	return (
		<div
			ref={containerRef}
			className={styles.nftCardList}
			style={{
				paddingTop: CARD_HEIGHT * getRowsOffsetTop(),
				paddingBottom: CARD_HEIGHT * getRowsOffsetBottom(),
			}}
		>
			{[
				...getVisibleItems(
					visibleItemsIndexInterval.start,
					visibleItemsIndexInterval.end
				),
				//...(isLoading ? new Array(getColumnsPerWindow()) : []),
			].map((nft, index) => (
				<NFTCard key={nft?.id || index} {...nft} />
			))}
		</div>
	);
};

export default NFTCardList;
