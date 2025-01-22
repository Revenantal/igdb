import Game from '@/interfaces/game';
import { get } from '@vercel/edge-config';

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

    // The default fields to request from the IGDB API.
    static fields = "fields name, summary, rating_count, slug, rating, first_release_date, screenshots.image_id, cover.image_id, artworks.*";

    /**
     * Fetches a list of games from the IGDB API.
     *
     * @param {string} [body=this.fields + 'sort hypes desc; limit 50;'] - The request body to send to the IGDB API. Defaults to sorting by hypes in descending order and limiting the results to 50 games.
     * @returns {Promise<Game[]>} A promise that resolves to an array of Game objects.
     */
    static async getGames(
        query?: string,
        offset: number = 0,
        limit: number = 50,
        fields: string = this.fields,
        sort: string = 'sort hypes desc'
    ): Promise<Game[]> {

        let body = `${fields};`

        if (query) {
            body += `where name ~ *"${query}"*;`
        }

        if (sort) {
            body += `sort hypes desc;`
        }

        body += `offset ${offset * limit};`

        body += `limit ${limit};`;

        const res = await IGDB.apiRequest("https://api.igdb.com/v4/games", body);
        return res.map((game: Game) => ({ ...game }));
    }


    /**
     * Fetches a game from the IGDB API based on the provided slug.
     *
     * @param slug - The unique identifier for the game.
     * @param body - The query body to be sent with the request. Defaults to the class's fields with a limit of 1 and a where clause for the slug.
     * @returns A promise that resolves to a Game object.
     */
    static async getGame(slug: string): Promise<Game> {
        const body = `${this.fields}; limit 1; where slug = "${slug}";`;
        const res = await IGDB.apiRequest("https://api.igdb.com/v4/games", body);
        return res[0] as Game;
    }

    /**
     * Retrieves the total count of games from the IGDB API.
     * 
     * @returns {Promise<Number>} A promise that resolves to the response from the IGDB API containing the game count.
     */
    static async getGameCount(
        query?: string,
    ): Promise<number> {

        let body = '*;'
        if (query) {
            body = `where name ~ *"${query}"*;`
        } 

        const res = await IGDB.apiRequest("https://api.igdb.com/v4/games/count", body);
        return res.count;
    }

    /**
     * Sends a request to the IGDB API.
     * 
     * This method sends a request to the IGDB API with the provided endpoint, body, and method.
     * It also includes the necessary headers for authentication.
     * 
     * @param {string} endpoint - The URL of the API endpoint.  
     */
    private static async apiRequest(endpoint: string, body: string, method: string = 'POST', revalidate: number = 3600) {

        const auth_token = await get('igdb_access_token');

        const response = await fetch(
            endpoint,
            {
                method: method,
                next: { revalidate: revalidate },
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.TWITCH_CLIENT_ID,
                    'Authorization': `Bearer ${auth_token}`,
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
    private static async getAuthentication(): Promise<string | null> {
        const response = await fetch(
            "https://id.twitch.tv/oauth2/token?" + new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials',
            }).toString(), {
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
    private static async refreshAuthentication(): Promise<boolean> {
        const access_token = await this.getAuthentication();
        if (access_token) {
            this.storeAuthentication(access_token);
            return true;
        }
        return false;
    }

    /**
     * Stores the authentication token in the Edge Config.
     * 
     * This method sends a PATCH request to the Vercel Edge Config API
     * with the new access token as the value for the `igdb_access_token` key.
     * 
     * @param {string} access_token - The new access token to store.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the token was successfully stored.
     */
    private static async storeAuthentication(access_token: string): Promise<boolean> {
        const result = await fetch(
            `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    items: [
                        {
                            operation: 'upsert',
                            key: 'igdb_access_token',
                            value: access_token,
                        },
                    ],
                }),
            }
        );
        const json = await result.json();
        if (json.status !== 'ok') {
            console.error('Failed to update edge config', json);
            return false;
        }

        return true;
    }
}