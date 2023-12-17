import { profilesURL } from "./utils/urls.mjs";
import { dataFetch } from "./utils/dataFetch.mjs";
import { token } from "./utils/components.mjs";
import { userId } from "./utils/components.mjs";

const avatarURL = profilesURL + userId + "/avatar";

console.log(avatarURL);

export async function updateAvatar(avatar) {
    try {
        const data = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar: avatar }),
        };
        const response = await dataFetch(avatarURL, data);
        return response;
    } catch (error) {
        console.log(error);
    }
};