import { profilesURL } from "./utils/urls.mjs";
import { listingsURL } from "./utils/urls.mjs";
import { dataFetch } from "./utils/dataFetch.mjs";
import { token } from "./utils/components.mjs";
import { userId } from "./utils/components.mjs";
import { createListing } from "./create_listing.mjs";

const pageTitle = document.querySelector("title");

async function getProfile(url) {
    try {
        const data = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const user = await dataFetch(url + userId, data);
        return user;
    } catch (error) {
        console.log(error);
    }
};

function displayUser(user) {
    const userContainer = document.querySelector('#userContainer');
    const avatarContainer = document.querySelector('#avatarContainer');

    const username = document.createElement('p');
    username.innerText = 'Username: ' + user.name;
    username.classList.add('h2', 'mt-3');
    userContainer.appendChild(username);

    const credits = document.createElement('p');
    credits.innerText = 'Credits: ' + user.credits;
    credits.classList.add('h2', 'mt-3');
    userContainer.appendChild(credits);

    if (user.avatar) {
        const avatar = document.createElement('img');
        avatar.classList.add('img-fluid');
        avatar.src = user.avatar;
        avatarContainer.appendChild(avatar);
    } else {
        const avatar = document.createElement('img');
        avatar.classList.add('img-fluid');
        avatar.src = "https://www.w3schools.com/howto/img_avatar.png";
        avatarContainer.appendChild(avatar);
    }

    pageTitle.innerText += user.name;
};

async function displayProfile() {
    const profile = await getProfile(profilesURL);
    displayUser(profile);
};

displayProfile();

const createListingForm = document.querySelector("#create_listing_form");

console.log(createListingForm);

const listingTitle = document.querySelector("#listingTitle");
const listingDeadlineDate = document.querySelector("#listingDeadlineDate");
const listingMedia = document.querySelector("#listingMedia");
const listingDescription = document.querySelector("#listingDescription");

console.log(listingTitle.value);
console.log(listingDeadlineDate.value);
console.log(listingMedia.value);
console.log(listingDescription.value);

createListingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = listingTitle.value;
    const deadlineDate = listingDeadlineDate.value;
    const media = listingMedia.value;
    const description = listingDescription.value;

    const listingData = {
        title: title,
        endsAt: deadlineDate,
        media: media,
        description: description,
    }

    const data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingData),
    };

    const response = await createListing(listingsURL, data);
    console.log(response);
    window.location.reload();
});

const logOutButton = document.querySelector("#logout_button");

logOutButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
});