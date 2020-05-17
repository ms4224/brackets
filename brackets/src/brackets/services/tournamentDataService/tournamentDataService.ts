import { Injectable } from '@angular/core';
import { AUTO_WIN } from '../../keywords';
import * as _ from 'lodash';
import { iMatchConnection } from '../canvasDrawing/canvas-drawing.service';

@Injectable({
    providedIn: 'root',
})
export class TournamentDataService {
    constructor() { }

    // getData(): iContestants {
    //     return this.mockData;
    // }

    private createTournamentData(contestants: iContestants): iTournament {
        const round1: iTournamentRoundData = this.create1stTournamentRound(contestants);
        const nextRoundsLinkedList: iTournamentRoundData = this.createNTournamentRounds(round1);
        round1.nextRound = nextRoundsLinkedList; //link first round to empty subsequent rounds
        const tournament: iTournament = [];
        let checkCurrentRound: iTournamentRoundData = round1;
        while (checkCurrentRound !== undefined) { // add each round to an array for easy reading in components
            tournament.push(checkCurrentRound);
            checkCurrentRound = checkCurrentRound.nextRound;
        }
        return tournament;
    }

    private create1stTournamentRound(contestants: iContestants): iTournamentRoundData {
        const cloneList = contestants.contestantsList.slice();
        const matches: iMatch[] = [];
        while (cloneList.length > 0) {
            if (cloneList.length > 1) {
                const player1 = cloneList.shift();
                const player2 = cloneList.shift();
                matches.push(this.createMatch(player1, player2));
            } else if (cloneList.length === 1) {
                const player1 = cloneList.shift();
                const player2 = undefined;
                matches.push(this.createMatch(player1, player2));
            }
        }
        return {
            previousRound: undefined,
            matches: matches,
            nextRound: undefined,
            numContestants: contestants.numContestants
        }
    }

    private createNTournamentRounds(prevRoundData: iTournamentRoundData): iTournamentRoundData {
        const prevRoundNumBlocks = prevRoundData.matches.length;
        if (prevRoundNumBlocks > 1) {
            const curRoundNumBlocks = prevRoundNumBlocks % 2 === 0 ?
                prevRoundNumBlocks/2 : Math.floor(prevRoundNumBlocks/2 + 1);
            const curRoundMatches: iMatch[] = [];
            for (let x = 0; x < curRoundNumBlocks; x++) {
                curRoundMatches.push({
                    player1: undefined,
                    player2: undefined,
                    winner: undefined
                })
            }
            const result: iTournamentRoundData = {
                previousRound: prevRoundData,
                nextRound: undefined,
                matches: curRoundMatches,
                numContestants: prevRoundData.numContestants %2 === 0 ?
                    prevRoundData.numContestants/2 : Math.floor(prevRoundData.numContestants/2 + 1)
            }
            if (result.numContestants %2 !== 0) {
                this.setRandomAutoWinForRoundData(result);
            }
            result.nextRound = this.createNTournamentRounds(result);
            return result;
        } else {
            return undefined;
        }
    }

    private createMatch(player1: iPlayerData, player2: iPlayerData): iMatch {
        return {
            player1: player1,
            player2: player2,
            winner: undefined
        }
    }

    public setWinner(match: iMatch, playerData: iPlayerData, currentRound: iTournamentRoundData) {
        match.winner = playerData;
        //to do: not important now, but should throw error if playerData is not one of the two players of the match
        this.moveWinnerToNextRound(match.winner, currentRound);
    }

    private moveWinnerToNextRound(winner: iPlayerData, currentRound: iTournamentRoundData) {
        if (currentRound.nextRound) {
            const matchIndex = this.getFighterMatchIndex(winner, currentRound);
            if (matchIndex !== undefined) {
                const nextRound = currentRound.nextRound;
                // 0.5 is match 0, player 2; 1 is match 1, player1; 1.5 is match1, player2; etc...
                let nextRoundPosition = matchIndex/2;
                const autoWinPosition = this.findAutoWinPosition(nextRound)
                if (!_.isUndefined(autoWinPosition) && nextRoundPosition >= autoWinPosition) {
                    //adjust position by 0.5 if there is an autowin in this bracket
                    nextRoundPosition += 0.5;
                }
                if (nextRoundPosition %1 === 0) {
                    nextRound.matches[nextRoundPosition].player1 = winner;
                } else {
                    nextRound.matches[Math.floor(nextRoundPosition)].player2 = winner;
                }
            }
        }
    }

    public findAutoWinPosition(round: iTournamentRoundData): number {
        //finds player position of the auto-win for the match
        //0 is match 0, player1; 0.5 is match0, player2; etc...
        const matchIndexOfAutoWin = this.getFighterMatchIndex(autoWin, round);
        if (matchIndexOfAutoWin !== undefined) {
            return this.getFighterMatchIndex(autoWin, round) + 0.5;
        } else {
            return undefined;
        }
    }

    private getFighterMatchIndex(targetPlayer: iPlayerData, currentRound: iTournamentRoundData): number {
        //returns match index of requested player in round.  returns undefined if not found
        let result: number = undefined;
        for (let x = 0; x < currentRound.matches.length; x++) {
            if (_.isEqual(targetPlayer, currentRound.matches[x].player1) || _.isEqual(targetPlayer, currentRound.matches[x].player2)) {
                result = x;
                break;
            }
        }
        return result;
    }

    private setRandomAutoWinForRoundData(round: iTournamentRoundData) {
        // don't worry about figuring out if the round should have an autowin, that logic goes elsewhere
        const numMatches = round.matches.length;
        const luckyMatchIndex = Math.floor(Math.random() * numMatches);
        round.matches[luckyMatchIndex].player2 = autoWin;
    }

}

export interface iContestants {
    contestantsList: Array<iPlayerData>;
    numContestants: number;
}

export type iTournament = Array<iTournamentRoundData>;

export interface iTournamentRoundData {
    previousRound: iTournamentRoundData | null;
    matches: iMatch[];
    nextRound: iTournamentRoundData | undefined;
    numContestants: number;
}

export interface iMatch {
    player1: iPlayerData;
    player2: iPlayerData | undefined;
    winner: iPlayerData | undefined;
    connectionData?: iMatchConnection;
}

export interface iPlayerData {
    name: string;
}

export const autoWin: iPlayerData = {
    name: AUTO_WIN
}