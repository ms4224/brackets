import { Component, OnInit } from '@angular/core';
import { TournamentDataService } from '../../services/tournamentDataService/tournamentDataService';
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
    const fakeContestants = ['mario', 'yoshi', 'link', 'DK', 'CFalcon', 'kirby', 'fox', 'pikachu', 'Ness', 'jiggly', 'luigi', 'bowser', 'peach', 'isaac', 'diddykong',
      'luffy', 'zoro', 'sanji', 'usopp', 'nami', 'franky', 'robin', 'chopper', 'brooke', 'mr.3', 'crocodile', 'mr.1', 'miss all-sunday',
      'gon', 'kilua', 'kurapika', 'leorio', 'alien', 'goku', 'gohan', 'piccolo', 'krillin', 'tien', 'yamcha', 'chaozu', 'master roshi', 'vegeta',
      'frieza', 'cell', 'majin buu', 'gotenks', 'trunks', 'goten', 'android 13', 'android 11', 'android 17', 'android 18', 'nappa', 'raditz',
      'luke', 'leia', 'darth vader', 'darth maul', 'darth sidious', 'han solo', 'chewbacca', 'c3po', 'r2d2', 'quigon', 'obiwan', 'mace windu', 'yoda'
    ]
    this.tournament = this.dataService['createTournamentData'](createContestantDataFromStringList(fakeContestants));
  }
  
}
