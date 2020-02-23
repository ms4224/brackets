import { TournamentDataService, iContestants, iTournamentRoundData } from "./tournamentDataService"
import { createContestantDataFromStringList } from './tournamentTestHelpers'

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
        previousRound: undefined
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
        previousRound: undefined
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

    it('Next step -- figure out how to handle odd number rounds while adding win handling.', () => {

    })
})