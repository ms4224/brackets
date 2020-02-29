import { iContestants, iTournamentRoundData } from './tournamentDataService';
import { AUTO_WIN } from 'src/brackets/keywords';


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
    return result.length === 1 ? true : false;
}

export function noMatchHasAutoWin(round: iTournamentRoundData): boolean {
    let result = [];
    round.matches.forEach(match => {
        if (match.player2 && match.player2.name === AUTO_WIN) {
            result.push(true);
        }
    });
    return result.length === 0 ? true : false;
}