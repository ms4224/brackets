import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TournamentComponent } from './components/tournament/tournament.component';
import { FighterComponent } from './components/fighter/fighter.component';
import { TournamentDataService } from './services/tournamentDataService/tournamentDataService';

@NgModule({
  declarations: [
    TournamentComponent,
    FighterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TournamentDataService],
  bootstrap: [],
  exports: [TournamentComponent],
  entryComponents: [TournamentComponent]
})
export class BracketsModule { }
