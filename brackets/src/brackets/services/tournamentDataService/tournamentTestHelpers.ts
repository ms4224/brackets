import { AUTO_WIN } from 'src/brackets/constants';


export function createContestantDataFromStringList(names: string[]): iContestants {
    const result = {
        contestantsList: [],
        numContestants: names.length
    }
    names.forEach(name => {
        result.contestantsList.push({
            name: name
        })
    })
    return result;
}

export function oneMatchHasAutoWin(round: iTournamentRoundData): boolean {
    let result = [];
    round.matches.forEach(match => {
        if (match.player2 && match.player2.name === AUTO_WIN) {
            result.push(true);
        }
    });
    return result.length === 1;
}

export function noMatchHasAutoWin(round: iTournamentRoundData): boolean {
    let result = [];
    round.matches.forEach(match => {
        if (match.player2 && match.player2.name === AUTO_WIN) {
            result.push(true);
        }
    });
    return result.length === 0;
}

export function createFakeMatchFromString(player1: string, player2: string): iMatch {
    return {
        player1: createPlayer(player1),
        player2: createPlayer(player2),
        winner: undefined
    }
}

export function createPlayer(name: string): iPlayerData {
    return {
        name: name
    }
}