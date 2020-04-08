import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iPlayerData } from 'src/brackets/services/tournamentDataService/tournamentDataService';

@Component({
  selector: 'brackets-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class FighterComponent {
  @Input() player: iPlayerData;
  @Output() fighterClicked: EventEmitter<iPlayerData> = new EventEmitter<iPlayerData>();

  public handleFighterClicked() {
    this.fighterClicked.emit(this.player);
  }
}
