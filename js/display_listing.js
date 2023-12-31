import { listingsURL } from './utils/urls.mjs'
import { getQueryString } from './utils/components.mjs'
import { token } from './utils/components.mjs'
import { dataFetch } from './utils/dataFetch.mjs'
import { placeBid } from './bid.mjs'

const listingId = getQueryString('id');
const bidsURL = listingsURL + listingId + '/bids';

const pageTitle = document.querySelector('title');

async function getListing(url) {
    try {
        const data = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        };
        const result = await dataFetch(url + listingId, data);
        return result;
    } catch (error) {
        console.log(error);
    }
};

function createHTML(listing) {
    const container = document.querySelector('#listingContainer');

    const card = document.createElement('div');
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

    const bids = document.createElement('p');
    bids.innerText = 'Bids: ' + listing._count.bids;
    bids.classList.add('mt-3');
    textContainer.appendChild(bids);

    pageTitle.innerText += ` ` + listing.title;
};

async function displayListing() {
    const listing = await getListing(listingsURL);
    createHTML(listing);
};

displayListing();

const bidForm = document.querySelector('#bidForm');
const bidInput = document.querySelector('#bidInput');

bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();

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

    const result = await placeBid(bidsURL, data);
    if (result) {
        window.location.reload();
    }
});