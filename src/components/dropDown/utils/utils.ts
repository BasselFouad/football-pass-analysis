import { IMatch, IPlayer } from "../../../interfaces"

export const getOptionString = (item: IPlayer | IMatch) => {
    if ("matchId" in item) {
        return parseMatchOption(item)
    }
    return item.playerName
}


export const parseMatchOption = (match: IMatch): string => {
    return `${match.homeTeamName} vs ${match.awayTeamName}`
}