import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product, ProductResponse} from '../models/product';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {UserProductResponse} from '../models/user-products';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseUrl = 'http://192.168.0.157:3002';

    constructor(private httpClient: HttpClient) {
    }

    public fetchAllProducts() {
        return this.httpClient.get<ProductResponse>(`${this.baseUrl}/products`);
    }

    public fetchUserProducts(userId) {
        return this.httpClient.get<UserProductResponse>(`${this.baseUrl}/users/${userId}/products`);
    }


    /**
     * Endpoint for updating a product
     * @param productId
     * @param params
     */
    public updateProduct(productId: number, params) {
        return this.httpClient.put(`${this.baseUrl}/products/${productId}`, params, httpOptions).pipe(
            tap(_ => console.log('Product Update Response', _)),
            catchError(this.handleError<any>('updateProduct'))
        );
    }

    public loginRegisterUser(params) {
        return this.httpClient.post(`${this.baseUrl}/users/login`, params, httpOptions);
    }


    public subscribeUser(productId: number, params) {
        return this.httpClient.post(`${this.baseUrl}/products/${productId}/subscribe`, params, httpOptions);
    }

    public startPromo() {
        return this.httpClient.get(`${this.baseUrl}/promos/start`);
    }

    public stopPromo() {
        return this.httpClient.get(`${this.baseUrl}/promos/stop`);
    }

    /**
     * Test APIs
     */
    public fecthSomthing(): Observable<Object> {
        return this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1')
            .pipe(
                tap(_ => console.log('TAP THE SHIT OUT')),
                catchError(this.handleError('Get Shit', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
