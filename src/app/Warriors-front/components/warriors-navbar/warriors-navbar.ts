import { AuthService } from '@/auth/services/auth.services';
import { ThemeService } from '@/characters/services/theme.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  selector: 'warriors-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './warriors-navbar.html',
  styleUrl: './warriors-navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarriorsNavbar { 
  themeService = inject(ThemeService);

  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  userName: string | null = '';
  ngOnInit() {
    this.userName = localStorage.getItem('user');
  }

}
