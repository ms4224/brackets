import { TournamentDataService, iContestants, iTournamentRoundData } from "./tournamentDataService"

describe('tournamentDataService', () => {
    const fakeContestantSetEven: iContestants = {
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
    const fakeContestantSetOdd: iContestants = {
        contestantsList: [
            'john',
            'jill',
            'bill',
            'noob',
            'mario',
            'bowser',
            'peach',
        ],
        numContestants: 8
    }
    const odd1stRoundData: iTournamentRoundData = {
        matches: [
            {
                player1: 'john',
                player2: 'jill',
                winner: undefined
            },
            {
                player1: 'bill',
                player2: 'noob',
                winner: undefined
            },
            {
                player1: 'mario',
                player2: 'bowser',
                winner: undefined
            },
            {
                player1: 'peach',
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
                player1: 'john',
                player2: 'jill',
                winner: undefined
            },
            {
                player1: 'bill',
                player2: 'noob',
                winner: undefined
            },
            {
                player1: 'mario',
                player2: 'bowser',
                winner: undefined
            },
            {
                player1: 'peach',
                player2: 'yoshi',
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