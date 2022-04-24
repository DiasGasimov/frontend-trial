import { Login, LoginInfo, AuthStateModel, Logout } from './../state-models';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthenticationService } from './authentication.service';
import { catchError, tap } from 'rxjs/operators';

const notAuthentificatedUser: Readonly<AuthStateModel> = Object.freeze({ username: null, loggedIn: false });

@State<AuthStateModel>({
    name: 'auth',
    defaults: {...notAuthentificatedUser}
})
@Injectable()
export class AuthState {
    constructor(private authService: AuthenticationService) {

    }

    @Selector()
    static username(state: AuthStateModel): string | null {
        return state.username;
    }

    @Selector()
    static loggedIn(state: AuthStateModel): boolean {
        return state.loggedIn;
    }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        this.authService.signIn(action.payload).subscribe({
            next: v => {
                ctx.patchState({
                    username: action.payload.username,
                    loggedIn: v
                });
            },
            error: err => {
                console.log(err);
            }
        });
    };

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        this.authService.signout().subscribe({
            next: () => {
                ctx.patchState({...notAuthentificatedUser});
            },
            error: err => {
                console.log(err);
            }
        });
    };
}
