import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { CanvasDrawingService } from 'src/brackets/services/canvasDrawing/canvas-drawing.service';

@Component({
  selector: 'brackets-tournament-svg-canvas',
  templateUrl: './tournament-svg-canvas.component.html',
  styleUrls: ['./tournament-svg-canvas.component.scss']
})
export class TournamentSvgCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('tournamentCanvas', { static: false }) canvasElement: ElementRef;
  public containerElement: any;
  @Input() tournament: iTournament; 

  constructor(private thisElement: ElementRef, public drawCanvas: CanvasDrawingService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.containerElement = this.thisElement.nativeElement.parentElement;
  }

  ngAfterViewInit() {
    this.drawCanvas.drawAllConnectionsSVG(this.tournament);
    this.changeDetectorRef.detectChanges();
  }

}
