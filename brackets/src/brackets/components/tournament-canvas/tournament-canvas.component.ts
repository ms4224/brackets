import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanvasDrawingService } from 'src/brackets/services/canvasDrawing/canvas-drawing.service';

@Component({
  selector: 'brackets-tournament-canvas',
  templateUrl: './tournament-canvas.component.html',
  styleUrls: ['./tournament-canvas.component.scss']
})
export class TournamentCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('tournamentCanvas') canvasElement: ElementRef;
  public containerElement: any;
  private context: any;

  constructor(private thisElement: ElementRef, private canvasDraw: CanvasDrawingService) { }

  ngOnInit() {
    this.containerElement = this.thisElement.nativeElement.parentElement;
    this.context = this.canvasElement.nativeElement.getContext('2d');
  }

  ngAfterViewInit() {
    //need to continue here. How can we draw at the right time?
    setTimeout(()=> {
      this.canvasDraw.drawAllConnections(this.context);
    }, 4000);
  }

}
