

type iContestants = {
    contestantsList: Array<iPlayerData>;
    numContestants: number;
}

type iTournament = Array<iTournamentRoundData>;

type iTournamentRoundData =  {
    previousRound: iTournamentRoundData | null;
    matches: iMatch[];
    nextRound: iTournamentRoundData | undefined;
    numContestants: number;
}

type iMatch =  {
    player1: iPlayerData;
    player2: iPlayerData | undefined;
    winner: iPlayerData | undefined;
    connectionData?: iMatchConnection;
}

type iPlayerData = {
    name: string;
}


type iMatchConnection = {
    bracketIndex: number;
    matchIndex: number;
    front: iCoordinate;
    back: iCoordinate;
  }
  
  type iCoordinate = {
    x: number;
    y: number;
  }
  
  type iLine = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }