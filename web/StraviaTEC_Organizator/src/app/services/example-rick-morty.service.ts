import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { ExampleRickMorty } from 'src/app/models/example-rick-morty.model';

@Injectable({
  providedIn: 'root',
})
export class ExampleRickMortyService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type `string` and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrlSqlServer;

  /* The `httpOptions` variable is an object that contains the headers to be sent with an HTTP request. In this case, it includes the `Content-Type` header set to `application/json` and the `Authorization` header set to `my-auth-token`. These headers provide additional information to the server about the type of data being sent and any authentication credentials that may be required. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function initializes a private http property of type HttpClient.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a dependency injection that allows you to make HTTP requests in your code. It provides methods for making GET, POST, PUT, DELETE, and other types of HTTP requests to a server.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the API data for the ExampleRickMorty entity.
   *
   * @return {Observable<ExampleRickMorty>} The API data for the ExampleRickMorty entity.
   */
  getApi(): Observable<ExampleRickMorty> {
    return this.http.get<ExampleRickMorty>(this.url + 'api/character');
  }
}
