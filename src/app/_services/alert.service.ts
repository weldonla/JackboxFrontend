import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.clear();
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    error(message: string) {
        this.subject.next({ type: 'error', text: message });
    }

    success(message: string) {
        this.subject.next({ type: 'success', text: message });
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next(null);
    }
}