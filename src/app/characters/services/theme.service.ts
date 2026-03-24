import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  theme = signal<Theme>('light');

  constructor() {
    this.initTheme();

    effect(() => {
      const current = this.theme();

      document.documentElement.classList.toggle('dark', current === 'dark');

      document.documentElement.setAttribute('data-theme', current === 'dark' ? 'dark' : 'light');

      localStorage.setItem('theme', current);
    });
  }

  initTheme() {
    const saved = localStorage.getItem('theme') as Theme;

    if (saved) {
      this.theme.set(saved);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme.set(prefersDark ? 'dark' : 'light');
  }

  toggleTheme() {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }
}