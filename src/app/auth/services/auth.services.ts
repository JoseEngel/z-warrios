import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
    logout() {
        console.log('🔐 Token antes:', localStorage.getItem('token'));
        
        localStorage.removeItem('token');

        localStorage.removeItem('user');
        
        console.log('❌ Token después:', localStorage.getItem('token'));
    }
    
    getToken() {
        return localStorage.getItem('token');
    }

}