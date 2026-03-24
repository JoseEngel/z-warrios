import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WarriorsNavbar } from "../../components/warriors-navbar/warriors-navbar";


@Component({
  selector: 'app-warriors-front-layouts',
  imports: [RouterOutlet, WarriorsNavbar],
  templateUrl: './warriors-front-layouts.html',
  styleUrl: './warriors-front-layouts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarriorsFrontLayouts { }
