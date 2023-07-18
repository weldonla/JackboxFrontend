import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private environmentName: string; // @todo will this be needed here?
    private apiUrl: string;

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
        this.environmentName = environment.environmentName;
        this.apiUrl = environment.apiUrl;
    }

    login(userName: string, password: string): Observable<User> {
        return this.http.post<any>(`${this.apiUrl}/api/login`, { userName, password }).pipe(map((user) => {
            return new User({
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                token: user.token,
                isAdmin: user.isAdmin,
                id: user.id,
            })
        }))
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }
}