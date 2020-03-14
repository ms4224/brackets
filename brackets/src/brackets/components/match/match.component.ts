import { Component, OnInit, Input } from '@angular/core';
import { iMatch } from 'src/brackets/services/tournamentDataService/tournamentDataService';

@Component({
  selector: 'brackets-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match: iMatch;
  @Input() matchIndex: number;
  @Input() bracketIndex: number;
  constructor() { }

  ngOnInit() {
  }

}
