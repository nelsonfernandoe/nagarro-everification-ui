import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EverificationResponse} from "../model/everification";

const EVENT_SOURCE_API = 'http://localhost:8080/api/v1/event-source/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class EventSourceService {
  constructor(private http: HttpClient) {
  }

  getEventSourceByStatus(status: 'Proceed' | 'Reject' | 'unassigned' = 'unassigned'): Observable<EverificationResponse | any> {
    return this.http.get(
      EVENT_SOURCE_API + `getByStatus?status=${status}`,
      httpOptions
    );
  }

  getEventSourceCountByStatus(): Observable<EverificationResponse | any> {
    return this.http.get(
      EVENT_SOURCE_API + 'statusCount',
      httpOptions
    );
  }
}
