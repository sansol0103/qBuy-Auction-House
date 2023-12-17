import { token } from "./utils/components.mjs";
import { dataFetch } from "./utils/dataFetch.mjs";

export async function placeBid(url) {
    const bidForm = document.querySelector('#bidForm');
    const bidInput = document.querySelector('#bidInput');

    const bidData = {
        bid: bidInput.value,
    };

    const data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bidData),
        };
    try {
        const result = await dataFetch(url, data);
        return result;
    } catch (error) {
        console.log(error);
    }
};