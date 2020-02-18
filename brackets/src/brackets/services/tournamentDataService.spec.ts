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

    it('expect createNTournamentRounds to create a full tournament with even numbered matches', () => {
        const round2 = tourneyService['createNTournamentRounds'](odd1stRoundData);
        const round3 = round2.nextRound;
        expect(round2.matches.length).toBe(2);
        expect(round2.previousRound).toBe(odd1stRoundData);
        expect(round2.nextRound).toBe(round3);
        expect(round3.matches.length).toBe(1);
        expect(round3.previousRound).toBe(round2)
        expect(round3.nextRound).toBeUndefined();
    })

    it('Next step -- figure out how to handle odd number rounds.', () => {
    })
})