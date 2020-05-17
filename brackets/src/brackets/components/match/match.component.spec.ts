import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchComponent } from './match.component';
import { MatchConnectionDrawDirective } from 'src/brackets/directives/match-connection-draw.directive';
import { FighterComponent } from '../fighter/fighter.component';
import { TournamentDataService } from 'src/brackets/services/tournamentDataService/tournamentDataService';
import { CanvasDrawingService } from 'src/brackets/services/canvasDrawing/canvas-drawing.service';
import { createContestantDataFromStringList } from 'src/brackets/services/tournamentDataService/tournamentTestHelpers';

describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatchComponent,
        MatchConnectionDrawDirective,
        FighterComponent
      ],
      providers: [TournamentDataService, CanvasDrawingService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchComponent);
    const tournament = new TournamentDataService()['createTournamentData'](createContestantDataFromStringList(['mario', 'luigi', 'toad', 'peach']));
    component = fixture.componentInstance;
    component.match = tournament[0].matches[0];
    component.matchIndex = 0;
    component.bracket = tournament[0];
    component.bracketIndex = 0;
    component.tournament = tournament;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
