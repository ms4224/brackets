import { Injectable } from '@angular/core';
import { AUTO_WIN } from '../../keywords';

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

    public setWinner(match: iMatch, playerData: iPlayerData) {
        match.winner = playerData;
        //to do: not important now, but should throw error if playerData is not one of the two players of the match
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
}

export interface iPlayerData {
    name: string;
}

export const autoWin: iPlayerData = {
    name: AUTO_WIN
}