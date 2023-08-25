import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
	retries: 3,
	retryDelay: (retryCount) => {
		return retryCount * 2000;
	},
});

const getPaginatedNft = async (
	page: number,
	length: number
): Promise<Array<any>> => {
	return await axios
		.get(
			`https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=${length}&offset=${
				page * length
			}`
		)
		.then((response) => {
			return response.data?.results || [];
		})
		.catch((error) => {
			throw new Error(
				`API call failed with status code: ${error.response.status} after 3 retry attempts`
			);
		});
};

export default getPaginatedNft;
