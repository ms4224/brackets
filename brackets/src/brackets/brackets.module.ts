import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TournamentComponent } from './components/tournament/tournament.component';
import { FighterComponent } from './components/fighter/fighter.component';
import { TournamentDataService } from './services/tournamentDataService/tournamentDataService';
import { CanvasDrawingService } from './services/canvasDrawing/canvas-drawing.service';
import { MatchConnectionDrawDirective } from './directives/match-connection-draw.directive';
import { TournamentSvgCanvasComponent } from './components/tournament-svg-canvas/tournament-svg-canvas.component';
import { MatchComponent } from './components/match/match.component';

@NgModule({
  declarations: [
    TournamentComponent,
    FighterComponent,
    MatchConnectionDrawDirective,
    TournamentSvgCanvasComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TournamentDataService, CanvasDrawingService],
  bootstrap: [],
  exports: [TournamentComponent],
  entryComponents: [TournamentComponent]
})
export class BracketsModule { }
