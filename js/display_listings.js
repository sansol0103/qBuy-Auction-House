import { listingsURL } from "./utils/urls.mjs";
import { token } from "./utils/components.mjs";
import { dataFetch } from "./utils/dataFetch.mjs";

async function getListings(url) {
    try {
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        };
        const result = await dataFetch(url, data);
        return result;
    } catch (error) {
        console.log(error);
    }
};

function createListingHTML(listing) {
    const container = document.querySelector('#listingsContainer');

    const card = document.createElement('a');
    card.href = `listing_specific.html?id=${listing.id}`;
    card.classList.add('card', 'mt-3', 'mb-3');
    container.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'container');
    card.appendChild(cardBody);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('col-12', 'col-md-6', 'mb-3');
    cardBody.appendChild(imageContainer);

    const image = document.createElement('img');
    image.src = listing.media;
    image.classList.add('img-fluid');
    imageContainer.appendChild(image);

    const textContainer = document.createElement('div');
    textContainer.classList.add('col-12', 'col-md-6');
    cardBody.appendChild(textContainer);

    const title = document.createElement('h2');
    title.innerText = listing.title;
    textContainer.appendChild(title);

    const content = document.createElement('p');
    content.innerText = listing.description;
    textContainer.appendChild(content);
};

function createListings(listings) {
    for (let i = 0; i < 25; i++) {
        createListingHTML(listings[i]);
    }
};

async function displayListings() {
    const listings = await getListings(listingsURL);
    createListings(listings);
};

displayListings();