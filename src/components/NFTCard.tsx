import React, { useState } from "react";
import styles from "../App.module.scss";

export type NFTCardProps = {
	id?: string;
	name?: string;
	price?: string;
	image?: string;
};

const NFTCard: React.FC<NFTCardProps> = ({ id, name, price, image }) => {
	const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
	return (
		<div className={styles.nftCard}>
			<div
				className={`${styles.imageLoader} ${styles.image}`}
				style={{
					height: isLoadingImage ? 200 : 0,
					width: isLoadingImage ? 200 : 0,
				}}
			/>
			{id ? (
				<>
					<img
						className={styles.image}
						src={image}
						alt={`${name} NFT`}
						onLoad={() => setIsLoadingImage(false)}
						style={{
							height: !isLoadingImage ? 200 : 0,
							width: !isLoadingImage ? 200 : 0,
						}}
					/>
					<div className={styles.priceContainer}>
						{price || "???"} SOL
					</div>
					<div className={styles.nameContainer}>{name}</div>
				</>
			) : (
				<div className={styles.nameLoader} />
			)}
		</div>
	);
};

export default NFTCard;
