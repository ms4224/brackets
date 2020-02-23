import { iContestants } from './tournamentDataService';


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