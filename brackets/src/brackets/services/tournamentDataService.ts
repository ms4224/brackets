import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TournamentDataService {
    mockData: iContestants = {
        contestantsList: [
            'john',
            'jill',
            'bill',
            'noob',
            'mario',
            'bowser',
            'peach',
            'yoshi'
        ],
        numContestants: 8
    }

    constructor() { }

    getData(): iContestants {
        return this.mockData;
    }

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
            nextRound: undefined
        }
    }

    private createNTournamentRounds(prevRoundData: iTournamentRoundData): iTournamentRoundData {
        const prevRoundNumBlocks = prevRoundData.matches.length;
        if (prevRoundNumBlocks > 1) {
            const curRoundNumBlocks = prevRoundNumBlocks % 2 === 0 ?
                prevRoundNumBlocks/2 : prevRoundNumBlocks + 1;
            const curRoundMatches: iMatch[] = [];
            for (let x = 0; x < curRoundNumBlocks; x++) {
                curRoundMatches.push({
                    player1: undefined,
                    player2: undefined,
                    winner: undefined
                })
            }
            const result = {
                previousRound: prevRoundData,
                nextRound: undefined,
                matches: curRoundMatches
            }
            result.nextRound = this.createNTournamentRounds(result);
            return result;
        } else {
            return undefined;
        }
    }

    private createMatch(player1: string, player2: string): iMatch {
        return {
            player1: player1,
            player2: player2,
            winner: undefined
        }
    }

}

export interface iContestants {
    contestantsList: Array<string>;
    numContestants: number;
}

export type iTournament = Array<iTournamentRoundData>;

export interface iTournamentRoundData {
    previousRound: iTournamentRoundData | null;
    matches: iMatch[];
    nextRound: iTournamentRoundData | undefined;
}

export interface iMatch {
    player1: string;
    player2: string | undefined;
    winner: string | undefined;
}