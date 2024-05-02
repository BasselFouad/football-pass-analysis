export interface IMatch {
    matchDate: string;
    homeTeamId: number;
    homeTeamName: string;
    awayTeamId: number;
    awayTeamName: string;
    matchId: number
}


export const areMatchesEqual = (firstMatch: IMatch, secondMatch: IMatch): boolean => {
    return firstMatch.matchDate === secondMatch.matchDate &&
        firstMatch.homeTeamId === secondMatch.homeTeamId &&
        firstMatch.homeTeamName === secondMatch.homeTeamName &&
        firstMatch.awayTeamId === secondMatch.awayTeamId &&
        firstMatch.awayTeamName === secondMatch.awayTeamName;
}