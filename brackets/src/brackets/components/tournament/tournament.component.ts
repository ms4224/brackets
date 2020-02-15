import { Component, OnInit } from '@angular/core';
import { TournamentDataService, iTournamentData } from '../../services/tournamentDataService';

@Component({
  selector: 'brackets-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  public dataSet: iTournamentData;
  
  constructor(private dataService: TournamentDataService) {

  }

  ngOnInit() {
    this.dataSet = this.dataService.getData();
  }
  
}
