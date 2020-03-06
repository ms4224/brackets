import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawingService {
  private connectionGrid: Array<Array<iMatchConnection>> = [];

  constructor() { }

  public registerMatchConnection(matchConn: iMatchConnection) {
    //set up round array
    if (this.connectionGrid.length < matchConn.bracketIndex + 1) {
      this.connectionGrid.length = matchConn.bracketIndex + 1;
    }
    if (this.connectionGrid[matchConn.bracketIndex] === undefined || this.connectionGrid[matchConn.bracketIndex] === null) {
      this.connectionGrid[matchConn.bracketIndex] = [];
    }
    //set up match array
    const targetMatchArray = this.connectionGrid[matchConn.bracketIndex];
    if (targetMatchArray.length < matchConn.matchIndex) {
      targetMatchArray.length = matchConn.matchIndex + 1;
    }
    //
    targetMatchArray[matchConn.matchIndex] = matchConn;
  }
}

export interface iMatchConnection {
  bracketIndex: number;
  matchIndex: number;
  front: iCoordinate;
  back: iCoordinate;
}

export interface iCoordinate {
  x: number;
  y: number;
}
