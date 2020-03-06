import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'brackets-tournament-canvas',
  templateUrl: './tournament-canvas.component.html',
  styleUrls: ['./tournament-canvas.component.scss']
})
export class TournamentCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('tournamentCanvas') canvasElement: ElementRef;
  public containerElement: any;

  constructor(private thisElement: ElementRef) { }

  ngOnInit() {
    this.containerElement = this.thisElement.nativeElement.parentElement;
  }

  ngAfterViewInit() {
    var context = this.canvasElement.nativeElement.getContext('2d');
    drawLine(context, 50, 50, 150, 50);
    drawLine(context, 50, 100, 650, 100);
  }

}

function drawLine(context, x1: number, y1: number, x2: number, y2: number) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}
