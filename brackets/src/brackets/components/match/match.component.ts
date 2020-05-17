import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iMatch, TournamentDataService, iPlayerData, iTournamentRoundData, iTournament } from 'src/brackets/services/tournamentDataService/tournamentDataService';

@Component({
  selector: 'brackets-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match: iMatch;
  @Input() matchIndex: number;
  @Input() bracket: iTournamentRoundData;
  @Input() bracketIndex: number;
  @Input() tournament: iTournament;
  constructor(private tourneyDataService: TournamentDataService) { }

  ngOnInit() {
  }

  public handleFighterClicked(event: iPlayerData) {
    if (event.name) {
      this.tourneyDataService.setWinner(this.match, event, this.bracket)
    }
  }

}
