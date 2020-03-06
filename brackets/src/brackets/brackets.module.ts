import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TournamentComponent } from './components/tournament/tournament.component';
import { FighterComponent } from './components/fighter/fighter.component';
import { TournamentDataService } from './services/tournamentDataService/tournamentDataService';
import { TournamentCanvasComponent } from './components/tournament-canvas/tournament-canvas.component';
import { CanvasDrawingService } from './services/canvasDrawing/canvas-drawing.service';

@NgModule({
  declarations: [
    TournamentComponent,
    FighterComponent,
    TournamentCanvasComponent
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
