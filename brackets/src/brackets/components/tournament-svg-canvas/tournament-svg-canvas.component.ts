import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CanvasDrawingService, iLine } from 'src/brackets/services/canvasDrawing/canvas-drawing.service';

@Component({
  selector: 'brackets-tournament-svg-canvas',
  templateUrl: './tournament-svg-canvas.component.html',
  styleUrls: ['./tournament-svg-canvas.component.scss']
})
export class TournamentSvgCanvasComponent implements OnInit, AfterViewInit {

  constructor(public drawCanvas: CanvasDrawingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.drawCanvas.drawAllConnectionsSVG();
    this.changeDetectorRef.detectChanges();
  }

}
