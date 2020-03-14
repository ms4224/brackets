import { Directive, ElementRef, OnInit, Input, AfterViewInit } from '@angular/core';
import { CanvasDrawingService } from '../services/canvasDrawing/canvas-drawing.service';

@Directive({
  selector: '[matchConnectionDraw]'
})
export class MatchConnectionDrawDirective implements AfterViewInit {
  @Input() bracketIndex: number = 0;
  @Input() matchIndex: number = 0;

  constructor(private thisEl: ElementRef, private canvasDrawing: CanvasDrawingService) { }

  ngAfterViewInit() {
    this.canvasDrawing.registerMatchConnection({
      front: {
        x: this.thisEl.nativeElement.offsetLeft,
        y: this.thisEl.nativeElement.offsetTop
      },
      back: {
        x: this.thisEl.nativeElement.offsetLeft + this.thisEl.nativeElement.clientWidth,
        y: this.thisEl.nativeElement.offsetTop
      },
      bracketIndex: this.bracketIndex,
      matchIndex: this.matchIndex
    });
  }
}
