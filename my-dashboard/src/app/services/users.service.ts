import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { User, UserResponse, UsersResponse } from '@interfaces/req-response';
import { delay, map } from 'rxjs';


interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient)

  #state = signal<State>({
    loading: true,
    users: [],
  })

  public users = computed(() => this.#state().users)
  public loading = computed(() => this.#state().loading)

  constructor() {

    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });

    this.http.get<UsersResponse>('https://reqres.in/api/users', { headers })
      .pipe(delay(1500))
      .subscribe(res => {

        this.#state.set({
          loading: false,
          users: res.data,
        });
      });

  }

  getUSerById(id: string) {
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });

    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`, { headers })
      .pipe(
        delay(1500),
        map(resp => resp.data)
      )

  }

}
