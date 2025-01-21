import { JSONFilePreset } from 'lowdb/node'

/**
 * IGDB class provides methods to interact with the IGDB API.
 * 
 * @remarks
 * This class includes methods to fetch games and manage authentication tokens.
 * 
 * @example
 * ```typescript
 * const games = await IGDB.getGames();
 * ```
 */
export default class IGDB {


    static async getGames() {
        const res = IGDB.apiRequest("https://api.igdb.com/v4/games", "fields name,slug,cover.image_id,rating,first_release_date; sort hypes desc; limit 30;");
        return res;
    }
 
    /**
     * Retrieves the total count of games from the IGDB API.
     * 
     * @returns {Promise<any>} A promise that resolves to the response from the IGDB API containing the game count.
     */
    static async getGameCount() { 
        const res = IGDB.apiRequest("https://api.igdb.com/v4/games/count", "*;");
        return res;
    }

    /**
     * Sends a request to the IGDB API.
     * 
     * This method sends a request to the IGDB API with the provided endpoint, body, and method.
     * It also includes the necessary headers for authentication.
     * 
     * @param {string} endpoint - The URL of the API endpoint.  
     */
    private static async apiRequest(endpoint: string, body: string, method: string = 'POST', revalidate: number =  3600) {

        const db = await JSONFilePreset('db.json', { igdb_access_token: '' })

        if (!db.data.igdb_access_token) {
            this.refreshAuthentication();
        }
        
        const response = await fetch(
            endpoint,
            { method: method,
            next: { revalidate: revalidate },
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${db.data.igdb_access_token}`,
            },
            body: body
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                this.refreshAuthentication();

                /* TODO: retry the request */

            } else {
                throw new Error('Network response was not ok');
            } 
        }

        return await response.json();
    }

    /**
     * Retrieves an authentication token from the Twitch API.
     * 
     * This method sends a POST request to the Twitch OAuth2 token endpoint
     * with the client ID, client secret, and grant type as parameters.
     * 
     * @returns {Promise<string | null>} A promise that resolves to the access token if successful, or null if not.
     * @throws {Error} Throws an error if the network response is not ok.
     */
    private static async getAuthentication() {
        const response = await fetch(
            "https://id.twitch.tv/oauth2/token?" + new URLSearchParams({
                    client_id:      process.env.TWITCH_CLIENT_ID,
                    client_secret:  process.env.TWITCH_CLIENT_SECRET,
                    grant_type:     'client_credentials',
                }).toString(),{ 
                method: 'POST',
            }
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.access_token) {
            return data.access_token;
        }

        return null;      
    }

    /**
     * Refreshes the authentication token and updates the local database with the new token.
     * 
     * This method retrieves a new access token by calling the `getAuthentication` method.
     * It then updates the local JSON database file (`db.json`) with the new token.
     * 
     * @returns {Promise<boolean>} A promise that resolves to `true` once the token has been successfully updated.
     */
    private static async refreshAuthentication() {
        const access_token = await this.getAuthentication();
        const db = await JSONFilePreset('db.json', { igdb_access_token: '' })

        await db.update((data) => { data.igdb_access_token = access_token });
        return true;
    }
}