import { profilesURL } from "./utils/urls.mjs";
import { dataFetch } from "./utils/dataFetch.mjs";
import { token } from "./utils/components.mjs";
import { userId } from "./utils/components.mjs";

const personalListingsURL = `${profilesURL}${userId}/listings`;

async function getPersonalListings(url) {
    if (!token) {
        window.location.href = '../index.html';
        Notification('Please log in to view your profile');
    };
    try {
        const data = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const listings = await dataFetch(url, data);
        return listings;
    } catch (error) {
        console.log(error);
    }
};

function displayListingsHTML(listing) {
    if (listing) {
        const listingsContainer = document.querySelector('#listingsContainer');

        const listingContainer = document.createElement('div');
        listingContainer.classList.add('card', 'mt-3', 'mb-3');
        listingsContainer.appendChild(listingContainer);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('me-3');
        listingContainer.appendChild(imageContainer);

        const image = document.createElement('img');
        image.src = listing.media;
        image.classList.add('img-fluid');
        imageContainer.appendChild(image);

        const textContainer = document.createElement('div');
        listingContainer.appendChild(textContainer);

        const title = document.createElement('h2');
        title.innerText = listing.title;
        textContainer.appendChild(title);

        const description = document.createElement('p');
        description.innerText = listing.description;
        textContainer.appendChild(description);
    }
};

function displayListings(listings) {
    for (let i = 0; i < 25; i++) {
        displayListingsHTML(listings[i]);
    }
};

export async function displayPersonalListings() {
    const listings = await getPersonalListings(personalListingsURL);
    displayListings(listings);
};