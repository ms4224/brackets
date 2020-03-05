import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCanvasComponent } from './tournament-canvas.component';

describe('TournamentCanvasComponent', () => {
  let component: TournamentCanvasComponent;
  let fixture: ComponentFixture<TournamentCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
