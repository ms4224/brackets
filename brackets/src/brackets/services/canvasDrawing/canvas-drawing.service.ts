import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TournamentDataService } from '../tournamentDataService/tournamentDataService';

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawingService {
  public lineConnectionSet: Array<iLine> = [];

  constructor(private tournamentDataService: TournamentDataService) { }

  public registerMatchConnection(matchConn: iMatchConnection, tournamentData: iTournament) {
    tournamentData[matchConn.bracketIndex].matches[matchConn.matchIndex].connectionData = matchConn;
  }

  public drawAllConnectionsSVG(tournament: iTournament) {
      const newLineSet: Array<iLine> = [];
      for (let bI = 0; bI < tournament.length - 1; bI++) {
        for (let mI = 0; mI < tournament[bI].matches.length; mI ++) {
          const startCoordinates = tournament[bI].matches[mI].connectionData.back;
          const endCoordinates = tournament[bI + 1].matches[this.findNextMatchIndex(mI, tournament[bI])].connectionData.front;
          const xMidpoint = startCoordinates.x + ((endCoordinates.x - startCoordinates.x)/2);
          const line1 = {x1: startCoordinates.x, y1: startCoordinates.y, x2: xMidpoint, y2: startCoordinates.y};
          const line2 = {x1: xMidpoint, y1: startCoordinates.y, x2: xMidpoint, y2: endCoordinates.y};
          const line3 = {x1: xMidpoint, y1: endCoordinates.y, x2: endCoordinates.x, y2: endCoordinates.y};
          newLineSet.push(line1, line2, line3);
        }
      }
      this.lineConnectionSet = newLineSet;
  }

  private findNextMatchIndex(matchIndex: number, currentRound: iTournamentRoundData): number {
    //Thi slogic is largely copied from upgrade winner logic in tournament dataservice file
    //just used to find the right connecting match because of auto win logic
      if (currentRound.nextRound) {
          if (matchIndex !== undefined) {
              const nextRound = currentRound.nextRound;
              // 0.5 is match 0, player 2; 1 is match 1, player1; 1.5 is match1, player2; etc...
              let nextRoundPosition = matchIndex/2;
              const autoWinPosition = this.tournamentDataService.findAutoWinPosition(nextRound)
              if (!_.isUndefined(autoWinPosition) && nextRoundPosition >= autoWinPosition) {
                  //adjust position by 0.5 if there is an autowin in this bracket
                  nextRoundPosition += 0.5;
              }
              return Math.floor(nextRoundPosition);
          }
      }
  }
}
