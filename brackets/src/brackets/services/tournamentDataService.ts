import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TournamentDataService {
    mockData: iTournamentData = {
        contestants: [
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

    getData(): iTournamentData {
        return this.mockData;
    }

}

export interface iTournamentData {
    contestants: Array<string>;
    numContestants: number;
}