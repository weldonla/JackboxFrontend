import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { GetUsersOutput, RegisterUser, User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject = new Subject<User>();
    private environmentName: string;
    private apiUrl: string;
    public currentUserIsAdmin: boolean;

    constructor(private http: HttpClient, private router: Router) {
        this.environmentName = environment.environmentName;
        this.apiUrl = environment.apiUrl;
    }

    getCurrentUser(): Observable<User> {
        return this.currentUserSubject.asObservable();
    }

    setCurrentUser(user: User) {
        this.currentUserSubject.next(user);
        this.currentUserIsAdmin = user.isAdmin;
        localStorage.setItem('token', user.token);
    }

    clearCurrentUser() {
        this.currentUserSubject.next(null);
    }

    logout() {
        this.clearCurrentUser();
        localStorage.clear();
        this.router.navigate(['login'])
    }
    
    register(user: RegisterUser): Observable<User> {
        return this.http.post<any>(`${this.apiUrl}/api/register`, 
        { 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password,
            userName: user.userName,
            isAdmin: user.isAdmin,
        }).pipe(map((user) => {
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
    
    getListOfUsers(): Observable<User[]> {
        return this.http.get<any>(`${this.apiUrl}/api/users`).pipe(map((out: GetUsersOutput) => {
            let userList: User[] = new Array<User>();
            out.users.forEach(user => {
                const userToAdd = new User({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    phone: user.phone,
                    isAdmin: user.isAdmin,
                    id: user.id,
                })
                userList.push(userToAdd)
            });
            return userList
        }))
    }
}