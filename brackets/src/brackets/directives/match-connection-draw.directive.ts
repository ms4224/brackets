import { Directive, ElementRef, OnInit, Input, AfterViewInit } from '@angular/core';
import { CanvasDrawingService } from '../services/canvasDrawing/canvas-drawing.service';
import { iTournament } from '../services/tournamentDataService/tournamentDataService';

@Directive({
  selector: '[matchConnectionDraw]'
})
export class MatchConnectionDrawDirective implements AfterViewInit {
  @Input() bracketIndex: number = 0;
  @Input() matchIndex: number = 0;
  @Input() tournament: iTournament;

  constructor(private thisEl: ElementRef, private canvasDrawing: CanvasDrawingService) { }

  ngAfterViewInit() {
    this.canvasDrawing.registerMatchConnection({
      front: {
        x: this.thisEl.nativeElement.offsetLeft,
        y: this.thisEl.nativeElement.offsetTop + this.thisEl.nativeElement.clientHeight/2
      },
      back: {
        x: this.thisEl.nativeElement.offsetLeft + this.thisEl.nativeElement.clientWidth,
        y: this.thisEl.nativeElement.offsetTop + this.thisEl.nativeElement.clientHeight/2
      },
      bracketIndex: this.bracketIndex,
      matchIndex: this.matchIndex
    },
    this.tournament
    );
  }
}
