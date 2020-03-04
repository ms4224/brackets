import { iContestants } from './tournamentDataService';

export function createContestantListFromStrings(players: string[]): iContestants {
    const result = {
        contestantsList: [],
        numContestants: 0
    }
    players.forEach(player => {
        result.contestantsList.push({
            name: player
        })
        result.numContestants += 1;
    });
    return result;
}