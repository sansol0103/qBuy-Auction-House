import { loginURL } from './utils/urls.mjs'
import { dataFetch } from './utils/dataFetch.mjs'

const loginForm = document.querySelector('#loginForm');

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

async function submitUser() {
    const loginDetails = {
        email: emailInput.value,
        password: passwordInput.value,
    };
    const response = await login(loginURL, loginDetails);

    if (response.accessToken) {
        window.location.href = 'profile.html';
    } else {
        console.log('No access token found');
    }
};

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitUser();
});

async function login(url, loginDetails) {
    try {
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails),
        };
        const response = await dataFetch(url, data);
        console.log(response);
        if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
        } else {
            console.log('No access token found');
        }
        localStorage.setItem('email', response.email);
        localStorage.setItem('username', response.name);
        return response;
    } catch (error) {
        console.log(error);
    }
};