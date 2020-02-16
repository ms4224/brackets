import { TournamentDataService, iContestants } from "./tournamentDataService"

describe('tournamentDataService', () => {
    const tourneyService = new TournamentDataService();

    it('create1stTournamentRound correctly creates an even numbered tournament round', () => {
        const fakeSet: iContestants = {
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

        const firstRound = tourneyService['create1stTournamentRound'](fakeSet);
        expect(firstRound).toEqual({
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
            nextRound: undefined
        });
    })

    it('create1stTournamentRound correctly creates an odd numbered tournament round', () => {
        const fakeSet: iContestants = {
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

        const firstRound = tourneyService['create1stTournamentRound'](fakeSet);
        expect(firstRound).toEqual({
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
            nextRound: undefined
        });
    })
})