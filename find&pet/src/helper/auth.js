// utils/auth.js
let cachedToken = null;
let tokenExpiresAt = null;
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;


export async function getToken() {
  // if token is expired of not initialized, then fetch a new one.
  if (!cachedToken || Date.now() > tokenExpiresAt) {
    const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: ACCESS_KEY,
        client_secret: SECRET_KEY,
      }).toString()
    });

    const data = await res.json();
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000;
  }

  return cachedToken;
}
