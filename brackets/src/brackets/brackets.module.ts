import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TournamentComponent } from './components/tournament/tournament.component';
import { FighterComponent } from './components/fighter/fighter.component';
import { TournamentDataService } from './services/tournamentDataService';

@NgModule({
  declarations: [
    TournamentComponent,
    FighterComponent
  ],
  imports: [
  ],
  providers: [TournamentDataService],
  bootstrap: [],
  exports: [TournamentComponent],
  entryComponents: [TournamentComponent]
})
export class BracketsModule { }
