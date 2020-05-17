import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentSvgCanvasComponent } from './tournament-svg-canvas.component';
import { TournamentDataService } from 'src/brackets/services/tournamentDataService/tournamentDataService';
import { CanvasDrawingService, iLine } from 'src/brackets/services/canvasDrawing/canvas-drawing.service';

describe('TournamentSvgCanvasComponent', () => {
  let component: TournamentSvgCanvasComponent;
  let fixture: ComponentFixture<TournamentSvgCanvasComponent>;
  class CanvasDrawingServiceMock {
    lineConnectionSet: Array<iLine> = [];
    drawAllConnectionsSVG() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentSvgCanvasComponent ],
      providers: [
        TournamentDataService,
        {provide: CanvasDrawingService, useClass: CanvasDrawingServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentSvgCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
