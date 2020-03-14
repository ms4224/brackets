import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawingService {
  private connectionGrid: Array<Array<iMatchConnection>> = [];
  public lineConnectionSet: Array<iLine> = [];
  private canvas: any;

  constructor() { }

  public registerCanvas(canvas: any) {
    this.canvas = canvas;
  }

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

  public drawAllConnectionsSVG() {
      const newLineSet: Array<iLine> = [];
      for (let bI = 0; bI < this.connectionGrid.length - 1; bI++) {
        for (let mI = 0; mI < this.connectionGrid[bI].length; mI ++) {
          const lineStart = this.connectionGrid[bI][mI].back;
          const lineEnd = this.connectionGrid[bI + 1][Math.floor(mI/2)].front;
          newLineSet.push({x1: lineStart.x, y1: lineStart.y, x2: lineEnd.x, y2: lineEnd.y})
        }
      }
      this.lineConnectionSet = newLineSet;
  }

  public drawAllConnections() {
    if (this.canvas) {
      this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let bI = 0; bI < this.connectionGrid.length - 1; bI++) {
        for (let mI = 0; mI < this.connectionGrid[bI].length; mI ++) {
          const lineStart = this.connectionGrid[bI][mI].back;
          const lineEnd = this.connectionGrid[bI + 1][Math.floor(mI/2)].front;
          this.drawLine(this.canvas, lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
        }
      }
    }
  }

  private drawLine(context, x1: number, y1: number, x2: number, y2: number) {
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
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

export interface iLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
