import { Component, OnInit } from '@angular/core';
import { TournamentDataService, iTournament } from '../../services/tournamentDataService/tournamentDataService';
import { createContestantDataFromStringList } from 'src/brackets/services/tournamentDataService/tournamentTestHelpers';

@Component({
  selector: 'brackets-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  public tournament: iTournament;
  
  constructor(private dataService: TournamentDataService) {

  }

  ngOnInit() {
    //for testing
    const fakeContestants = ['mario', 'yoshi', 'link', 'DK', 'CFalcon', 'kirby', 'fox', 'pikachu', 'Ness', 'jiggly', 'luigi', 'bowser', 'peach', 'isaac', 'diddykong']
    this.tournament = this.dataService['createTournamentData'](createContestantDataFromStringList(fakeContestants));
  }
  
}
