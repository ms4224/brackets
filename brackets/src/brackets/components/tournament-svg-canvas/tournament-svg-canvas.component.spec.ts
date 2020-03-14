import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentSvgCanvasComponent } from './tournament-svg-canvas.component';

describe('TournamentSvgCanvasComponent', () => {
  let component: TournamentSvgCanvasComponent;
  let fixture: ComponentFixture<TournamentSvgCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentSvgCanvasComponent ]
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
