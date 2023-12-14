import { listingsURL } from "./utils/urls.mjs"
import { dataFetch } from "./utils/dataFetch.mjs"
import { token } from "./utils/components.mjs"

const createListingForm = document.querySelector("#create_listing_form");

const listingTitle = document.querySelector("#listingTitle");
const listingDeadlineDate = document.querySelector("#listingDeadlineDate");
const listingMedia = document.querySelector("#listingMedia");
const listingDescription = document.querySelector("#listingDescription");

export async function createListing(url, data) {
    try {
        const response = await dataFetch(url, data);
        return response;
    } catch (error) {
        console.log(error);
    }
};
