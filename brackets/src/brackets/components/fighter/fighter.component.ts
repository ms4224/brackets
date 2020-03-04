import { Component, Input } from '@angular/core';
import { iPlayerData } from 'src/brackets/services/tournamentDataService/tournamentDataService';

@Component({
  selector: 'brackets-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class FighterComponent {
  @Input() player: iPlayerData;
}
