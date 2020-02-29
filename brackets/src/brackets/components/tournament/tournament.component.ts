import { Component, OnInit } from '@angular/core';
import { TournamentDataService, iTournament } from '../../services/tournamentDataService/tournamentDataService';

@Component({
  selector: 'brackets-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  public dataSet: iTournament;
  
  constructor(private dataService: TournamentDataService) {

  }

  ngOnInit() {
    this.dataSet = this.dataService.getData();
  }
  
}
