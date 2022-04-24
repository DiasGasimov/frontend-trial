import { AuthState } from './../../services/auth-state';
import { Login, Logout } from './../../state-models';
import {Component, OnInit} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login-ngxs',
  templateUrl: './login-ngxs.component.html',
  styleUrls: ['./login-ngxs.component.css']
})
export class LoginNgxsComponent implements OnInit {
  username: string;
  password: string;
  @Select(AuthState.username) username$: Observable<string>;
  @Select(AuthState.loggedIn) loggedIn$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  doLogin() {
    this.store.dispatch(new Login({ username: this.username, password: this.password}));
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
