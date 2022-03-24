import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
export namespace My_Pet_Client {
	export interface ApiResponse {
		code?: number;
		type?: string;
		message?: string;
	}


	/** A representation of a cat */
	export interface Cat extends Pet {

		/**
		 * The measured skill for hunting
		 * Required
		 */
		huntingSkill: CatHuntingSkill;
	}

	export enum CatHuntingSkill { clueless = 'clueless', lazy = 'lazy', adventurous = 'adventurous', aggressive = 'aggressive' }

	export interface Category {

		/** Category ID */
		id?: number;

		/**
		 * Category name
		 * Min length: 1
		 */
		name?: string;

		/** Test Sub Category */
		sub?: CategorySub;
	}

	export interface CategorySub {

		/** Dumb Property */
		prop1?: string;
	}


	/** A representation of a dog */
	export interface Dog extends Pet {

		/**
		 * The size of the pack the dog is from
		 * Required
		 * Minimum: 1
		 */
		packSize: number;
	}


	/** A representation of a honey bee */
	export interface HoneyBee extends Pet {

		/**
		 * Average amount of honey produced per day in ounces
		 * Required
		 */
		honeyPerDay: number;
	}

	export interface Order {

		/** Order ID */
		id?: number;

		/** Pet ID */
		petId?: number;
		quantity?: number;

		/** Estimated ship date */
		shipDate?: Date;

		/** Order Status */
		status?: OrderStatus;

		/** Indicates whenever order was completed or not */
		complete?: boolean;

		/** Unique Request Id */
		requestId?: string;
	}

	export enum OrderStatus { placed = 'placed', approved = 'approved', delivered = 'delivered' }

	export interface Pet {

		/** Pet ID */
		id?: number;

		/** Categories this pet belongs to */
		category?: Category;

		/**
		 * The name given to a pet
		 * Required
		 */
		name: string;

		/**
		 * The list of URL to a cute photos featuring pet
		 * Required
		 * Maximum items: 20
		 */
		photoUrls: Array<string>;
		friend?: Pet;

		/**
		 * Tags attached to the pet
		 * Minimum items: 1
		 */
		tags?: Array<Tag>;

		/** Pet status in the store */
		status?: PetStatus;

		/** Type of a pet */
		petType?: string;
	}

	export interface Tag {

		/** Tag ID */
		id?: number;

		/**
		 * Tag name
		 * Min length: 1
		 */
		name?: string;
	}

	export enum PetStatus { available = 'available', pending = 'pending', sold = 'sold' }

	export interface User {
		id?: number;
		pet?: Pet;

		/**
		 * User supplied username
		 * Min length: 4
		 */
		username?: string;

		/**
		 * User first name
		 * Min length: 1
		 */
		firstName?: string;

		/**
		 * User last name
		 * Min length: 1
		 */
		lastName?: string;

		/** User email address */
		email?: string;

		/**
		 * User password, MUST contain a mix of upper and lower case letters, as well as digits
		 * Min length: 8
		 * Pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
		 */
		password?: string;

		/**
		 * User phone number in international format
		 * Pattern: /^\+(?:[0-9]-?){6,14}[0-9]$/
		 */
		phone?: string;

		/** User status */
		userStatus?: number;
	}

	@Injectable()
	export class PetClient {
		constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * Add a new pet to the store
		 * Add new pet to the store inventory.
		 * Post pet
		 * @param {Pet} requestBody Pet object that needs to be added to the store
		 * @return {void} 
		 */
		AddPet(requestBody: Pet, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'pet', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Update an existing pet
		 * Put pet
		 * @param {Pet} requestBody Pet object that needs to be added to the store
		 * @return {void} 
		 */
		UpdatePet(requestBody: Pet, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.put(this.baseUri + 'pet', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Find pet by ID
		 * Returns a single pet
		 * Get pet/{petId}
		 * @param {number} petId ID of pet to return
		 * @return {Pet} successful operation
		 */
		GetPetById(petId: number, headersHandler?: () => HttpHeaders): Observable<Pet> {
			return this.http.get<Pet>(this.baseUri + 'pet/' + petId, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Deletes a pet
		 * Delete pet/{petId}
		 * @param {number} petId Pet id to delete
		 * @return {void} 
		 */
		DeletePet(petId: number, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.delete(this.baseUri + 'pet/' + petId, { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * Finds Pets by status
		 * Multiple status values can be provided with comma separated strings
		 * Get pet/findByStatus
		 * @param {Array<PetStatus>} status Status values that need to be considered for filter
		 * @return {Array<Pet>} successful operation
		 */
		FindPetsByStatus(status: Array<PetStatus>, headersHandler?: () => HttpHeaders): Observable<Array<Pet>> {
			return this.http.get<Array<Pet>>(this.baseUri + 'pet/findByStatus?' + status.map(z => `status=${z}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Finds Pets by tags
		 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
		 * Get pet/findByTags
		 * @param {Array<string>} tags Tags to filter by
		 * @return {Array<Pet>} successful operation
		 */
		FindPetsByTags(tags: Array<string>, headersHandler?: () => HttpHeaders): Observable<Array<Pet>> {
			return this.http.get<Array<Pet>>(this.baseUri + 'pet/findByTags?' + tags.map(z => `tags=${encodeURIComponent(z)}`).join('&'), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Returns pet inventories by status
		 * Returns a map of status codes to quantities
		 * Get store/inventory
		 * @return {{[id: string]: number }} successful operation
		 */
		GetInventory(headersHandler?: () => HttpHeaders): Observable<{[id: string]: number }> {
			return this.http.get<{[id: string]: number }>(this.baseUri + 'store/inventory', { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Place an order for a pet
		 * Post store/order
		 * @param {Order} requestBody order placed for purchasing the pet
		 * @return {Order} successful operation
		 */
		PlaceOrder(requestBody: Order, headersHandler?: () => HttpHeaders): Observable<Order> {
			return this.http.post<Order>(this.baseUri + 'store/order', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * Find purchase order by ID
		 * For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions
		 * Get store/order/{orderId}
		 * @param {number} orderId ID of pet that needs to be fetched
		 * @return {Order} successful operation
		 */
		GetOrderById(orderId: number, headersHandler?: () => HttpHeaders): Observable<Order> {
			return this.http.get<Order>(this.baseUri + 'store/order/' + orderId, { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Delete purchase order by ID
		 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
		 * Delete store/order/{orderId}
		 * @param {string} orderId ID of the order that needs to be deleted
		 * @return {void} 
		 */
		DeleteOrder(orderId: string, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.delete(this.baseUri + 'store/order/' + (orderId == null ? '' : encodeURIComponent(orderId)), { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * Create user
		 * This can only be done by the logged in user.
		 * Post user
		 * @param {User} requestBody Created user object
		 * @return {void} 
		 */
		CreateUser(requestBody: User, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'user', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Get user by user name
		 * Get user/{username}
		 * @param {string} username The name that needs to be fetched. Use user1 for testing. 
		 * @return {User} successful operation
		 */
		GetUserByName(username: string, headersHandler?: () => HttpHeaders): Observable<User> {
			return this.http.get<User>(this.baseUri + 'user/' + (username == null ? '' : encodeURIComponent(username)), { headers: headersHandler ? headersHandler() : undefined });
		}

		/**
		 * Updated user
		 * This can only be done by the logged in user.
		 * Put user/{username}
		 * @param {string} username name that need to be deleted
		 * @param {User} requestBody Updated user object
		 * @return {void} 
		 */
		UpdateUser(username: string, requestBody: User, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.put(this.baseUri + 'user/' + (username == null ? '' : encodeURIComponent(username)), JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Delete user
		 * This can only be done by the logged in user.
		 * Delete user/{username}
		 * @param {string} username The name that needs to be deleted
		 * @return {void} 
		 */
		DeleteUser(username: string, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.delete(this.baseUri + 'user/' + (username == null ? '' : encodeURIComponent(username)), { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}

		/**
		 * Creates list of users with given input array
		 * Post user/createWithArray
		 * @param {Array<User>} requestBody List of user object
		 * @return {void} 
		 */
		CreateUsersWithArrayInput(requestBody: Array<User>, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'user/createWithArray', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Creates list of users with given input array
		 * Post user/createWithList
		 * @param {Array<User>} requestBody List of user object
		 * @return {void} 
		 */
		CreateUsersWithListInput(requestBody: Array<User>, headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.post(this.baseUri + 'user/createWithList', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }), observe: 'response', responseType: 'text' });
		}

		/**
		 * Logs user into the system
		 * Get user/login
		 * @param {string} username The user name for login
		 * @param {string} password The password for login in clear text
		 * @return {string} successful operation
		 */
		LoginUser(username: string, password: string, headersHandler?: () => HttpHeaders): Observable<string> {
			return this.http.get(this.baseUri + 'user/login?username=' + (username == null ? '' : encodeURIComponent(username)) + '&password=' + (password == null ? '' : encodeURIComponent(password)), { headers: headersHandler ? headersHandler() : undefined, responseType: 'text' });
		}

		/**
		 * Logs out current logged in user session
		 * Get user/logout
		 * @return {void} 
		 */
		LogoutUser(headersHandler?: () => HttpHeaders): Observable<HttpResponse<string>> {
			return this.http.get(this.baseUri + 'user/logout', { headers: headersHandler ? headersHandler() : undefined, observe: 'response', responseType: 'text' });
		}
	}

}

