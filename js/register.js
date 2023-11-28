import { registerURL } from './utils/urls.mjs';
import { dataFetch } from './utils/dataFetch.mjs';

const registerForm = document.querySelector('#registerForm');

const usernameInput = document.querySelector('#usernameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');

async function submitUser() {
    const user = {
        name: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    const response = await registerUser(registerURL, user);
    console.log(response);
};

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitUser();
});

async function registerUser(url, user) {
    try {
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
        const response = await dataFetch(url, data);
        return response;
    } catch (error) {
        console.log(error);
    }
};