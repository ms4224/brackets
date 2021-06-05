import { TournamentDataService } from "./tournamentDataService"
import { autoWin, AUTO_WIN } from '../../constants';

describe('tournamentDataService', () => {
    const fakeContestantSetEven: iContestants = createContestantDataFromStringList([
        'john',
        'jill',
        'bill',
        'noob',
        'mario',
        'bowser',
        'peach',
        'yoshi'
    ]);
    const fakeContestantSetOdd: iContestants = createContestantDataFromStringList([
        'john',
        'jill',
        'bill',
        'noob',
        'mario',
        'bowser',
        'peach',
    ]);
    const fakeContestantSet6: iContestants = createContestantDataFromStringList([
        'john',
        'jill',
        'bill',
        'noob',
        'mario',
        'bowser'
    ]);
    const odd1stRoundData: iTournamentRoundData = {
        matches: [
            {
                player1: {name: 'john'},
                player2: {name: 'jill'},
                winner: undefined
            },
            {
                player1: {name: 'bill'},
                player2: {name: 'noob'},
                winner: undefined
            },
            {
                player1: {name: 'mario'},
                player2: {name: 'bowser'},
                winner: undefined
            },
            {
                player1: {name: 'peach'},
                player2: undefined,
                winner: undefined
            },
        ],
        nextRound: undefined,
        previousRound: undefined,
        numContestants: 7
    }
    const even1stRoundData: iTournamentRoundData = {
        matches: [
            {
                player1: {name: 'john'},
                player2: {name: 'jill'},
                winner: undefined
            },
            {
                player1: {name: 'bill'},
                player2: {name: 'noob'},
                winner: undefined
            },
            {
                player1: {name: 'mario'},
                player2: {name: 'bowser'},
                winner: undefined
            },
            {
                player1: {name: 'peach'},
                player2: {name: 'yoshi'},
                winner: undefined
            },
        ],
        nextRound: undefined,
        previousRound: undefined,
        numContestants: 8
    }
    const tourneyService = new TournamentDataService();

    it('create1stTournamentRound correctly creates an even numbered tournament round', () => {
        const firstRound = tourneyService['create1stTournamentRound'](fakeContestantSetEven);
        expect(firstRound).toEqual(even1stRoundData);
    })

    it('create1stTournamentRound correctly creates an odd numbered tournament round', () => {
        const firstRound = tourneyService['create1stTournamentRound'](fakeContestantSetOdd);
        expect(firstRound).toEqual(odd1stRoundData);
    })

    it('expect createNTournamentRounds to create subsequent matches with even numbered matches', () => {
        const round2 = tourneyService['createNTournamentRounds'](odd1stRoundData);
        const round3 = round2.nextRound;
        expect(round2.matches.length).toBe(2);
        expect(round2.previousRound).toBe(odd1stRoundData);
        expect(round2.nextRound).toBe(round3);
        expect(round3.matches.length).toBe(1);
        expect(round3.previousRound).toBe(round2)
        expect(round3.nextRound).toBeUndefined();
    })

    it('createTournamentData will create tournament with first round data and subsequent empty rounds, combine data into an array', () => {
        const tournament = tourneyService['createTournamentData'](fakeContestantSetEven);
        expect(tournament.length).toBe(3);
        const round1 = tournament[0];
        const round2 = tournament[1];
        const round3 = tournament[2];
        expect(round1.nextRound).toBe(round2);
        expect(round1.matches.length).toBe(4);
        expect(round1.previousRound).toBeUndefined();
        expect(round2.matches.length).toBe(2);
        expect(round2.previousRound).toBe(round1);
        expect(round2.nextRound).toBe(round3);
        expect(round3.matches.length).toBe(1);
        expect(round3.previousRound).toBe(round2)
        expect(round3.nextRound).toBeUndefined();
    })

    it('createTournamentData will set auto wins randomly for subsequent tournament rounds if there are odd number of fighters', () => {
        const tournament = tourneyService['createTournamentData'](fakeContestantSet6);
        expect(tournament.length).toBe(3);
        //check auto win is created on second round brackets
        const round2 = tournament[1];
        expect(oneMatchHasAutoWin(round2)).toBe(true);
        //sanity check
        expect(noMatchHasAutoWin(tournament[2]));
        expect(noMatchHasAutoWin(tournament[0]));
    })

    it('setRandomAutoWinForRoundData randomly sets one match player2 to autowin', () => {
        const tournament = tourneyService['createTournamentData'](fakeContestantSetEven);
        const round2 = tournament[1];
        let result = [];
        tourneyService['setRandomAutoWinForRoundData'](round2);
        expect(oneMatchHasAutoWin(round2)).toBe(true);
    })

    it('setWinner moves the winner of a match to the correct position in the next bracket', () => {
        const fakeRoundData: iTournamentRoundData = {
            previousRound: undefined,
            matches: [
                createFakeMatchFromString('sub-zero', 'scorpion'),
                createFakeMatchFromString('fujin', 'raiden'),
                createFakeMatchFromString('shinnok', 'liu-kang'),
                createFakeMatchFromString('reptile', 'cloud'),
            ],
            nextRound: undefined,
            numContestants: 8,
        };
        const fakeRound2: iTournamentRoundData = {
            previousRound: fakeRoundData,
            matches: [
                createFakeMatchFromString(undefined, undefined),
                createFakeMatchFromString(undefined, undefined)
            ],
            nextRound: undefined,
            numContestants: 4,
        };
        fakeRoundData.nextRound = fakeRound2;
        tourneyService.setWinner(fakeRoundData.matches[0], createPlayer('scorpion'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[1], createPlayer('fujin'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[2], createPlayer('liu-kang'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[3], createPlayer('reptile'), fakeRoundData);
        expect(fakeRoundData.matches[0].winner).toEqual(createPlayer('scorpion'));
        expect(fakeRoundData.matches[1].winner).toEqual(createPlayer('fujin'));
        expect(fakeRoundData.matches[2].winner).toEqual(createPlayer('liu-kang'));
        expect(fakeRoundData.matches[3].winner).toEqual(createPlayer('reptile'));
        expect(fakeRound2.matches[0].player1).toEqual(createPlayer('scorpion'));
        expect(fakeRound2.matches[0].player2).toEqual(createPlayer('fujin'));
        expect(fakeRound2.matches[1].player1).toEqual(createPlayer('liu-kang'));
        expect(fakeRound2.matches[1].player2).toEqual(createPlayer('reptile'));
    })

    it('setWinner moves the winner of a match to the correct position in the next bracket, even if there is an autowin in the next bracket', () => {
        const fakeRoundData: iTournamentRoundData = {
            previousRound: undefined,
            matches: [
                createFakeMatchFromString('sub-zero', 'scorpion'),
                createFakeMatchFromString('fujin', 'raiden'),
                createFakeMatchFromString('shinnok', 'liu-kang')
            ],
            nextRound: undefined,
            numContestants: 8,
        };
        const fakeRound2: iTournamentRoundData = {
            previousRound: fakeRoundData,
            matches: [
                createFakeMatchFromString(undefined, undefined),
                createFakeMatchFromString(undefined, undefined)
            ],
            nextRound: undefined,
            numContestants: 4,
        };
        //simulate auto-win situation in match 0
        fakeRound2.matches[0].player2 = autoWin;
        fakeRoundData.nextRound = fakeRound2;
        tourneyService.setWinner(fakeRoundData.matches[0], createPlayer('scorpion'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[1], createPlayer('fujin'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[2], createPlayer('liu-kang'), fakeRoundData);
        expect(fakeRoundData.matches[0].winner).toEqual(createPlayer('scorpion'));
        expect(fakeRoundData.matches[1].winner).toEqual(createPlayer('fujin'));
        expect(fakeRoundData.matches[2].winner).toEqual(createPlayer('liu-kang'));
        expect(fakeRound2.matches[0].player1).toEqual(createPlayer('scorpion'));
        expect(fakeRound2.matches[0].player2).toEqual(autoWin);
        expect(fakeRound2.matches[1].player1).toEqual(createPlayer('fujin'));
        expect(fakeRound2.matches[1].player2).toEqual(createPlayer('liu-kang'));
    })

    it('setWinner moves the winner of a match to the correct position in the next bracket, even if there is an autowin in the next bracket, testing different position', () => {
        const fakeRoundData: iTournamentRoundData = {
            previousRound: undefined,
            matches: [
                createFakeMatchFromString('sub-zero', 'scorpion'),
                createFakeMatchFromString('fujin', 'raiden'),
                createFakeMatchFromString('shinnok', 'liu-kang')
            ],
            nextRound: undefined,
            numContestants: 8,
        };
        const fakeRound2: iTournamentRoundData = {
            previousRound: fakeRoundData,
            matches: [
                createFakeMatchFromString(undefined, undefined),
                createFakeMatchFromString(undefined, undefined)
            ],
            nextRound: undefined,
            numContestants: 4,
        };
        //simulate auto-win situation in match 0
        fakeRound2.matches[1].player2 = autoWin;
        fakeRoundData.nextRound = fakeRound2;
        tourneyService.setWinner(fakeRoundData.matches[0], createPlayer('scorpion'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[1], createPlayer('fujin'), fakeRoundData);
        tourneyService.setWinner(fakeRoundData.matches[2], createPlayer('liu-kang'), fakeRoundData);
        expect(fakeRoundData.matches[0].winner).toEqual(createPlayer('scorpion'));
        expect(fakeRoundData.matches[1].winner).toEqual(createPlayer('fujin'));
        expect(fakeRoundData.matches[2].winner).toEqual(createPlayer('liu-kang'));
        expect(fakeRound2.matches[0].player1).toEqual(createPlayer('scorpion'));
        expect(fakeRound2.matches[0].player2).toEqual(createPlayer('fujin'));
        expect(fakeRound2.matches[1].player1).toEqual(createPlayer('liu-kang'));
        expect(fakeRound2.matches[1].player2).toEqual(autoWin);
    })

    it('Next step -- figure out how to handle odd number rounds while adding win handling.', () => {

    })
})




function createContestantDataFromStringList(names: string[]): iContestants {
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

function oneMatchHasAutoWin(round: iTournamentRoundData): boolean {
    let result = [];
    round.matches.forEach(match => {
        if (match.player2 && match.player2.name === AUTO_WIN) {
            result.push(true);
        }
    });
    return result.length === 1;
}

function noMatchHasAutoWin(round: iTournamentRoundData): boolean {
    let result = [];
    round.matches.forEach(match => {
        if (match.player2 && match.player2.name === AUTO_WIN) {
            result.push(true);
        }
    });
    return result.length === 0;
}

function createFakeMatchFromString(player1: string, player2: string): iMatch {
    return {
        player1: createPlayer(player1),
        player2: createPlayer(player2),
        winner: undefined
    }
}

function createPlayer(name: string): iPlayerData {
    return {
        name: name
    }
}