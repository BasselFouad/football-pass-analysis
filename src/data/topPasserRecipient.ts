import { PASSING_SITUATION } from "../enums/passingSituation";
import {
    PlayerPassValueStats,
    IFormationPlayer,
    IPlayer,
} from "../interfaces";

export const addPlayerPass = (
    playerValueAccumulator: PlayerPassValueStats[],
    playerId: number | null,
    playerName: string | null,
    passAddedValue: number,
    situation: PASSING_SITUATION
) => {
    if (playerId && playerName) {
        if (playerValueAccumulator[playerId]) {
            playerValueAccumulator[playerId][situation] += passAddedValue;
        } else {
            playerValueAccumulator[playerId] = {
                passer: 0,
                recipient: 0,
                playerId,
                playerName,
            };
            playerValueAccumulator[playerId][situation] += passAddedValue;
        }
    }
};


export const getAllPlayers = (formationPlayers: IFormationPlayer[]) => {
    const playersHash: IPlayer[] = [];
    formationPlayers.forEach((player) => {
        playersHash[player.playerId] = {
            playerName: player.playerName,
            playerId: player.playerId,
        };
    });
    return playersHash;
};
export function getTopPassers(
    data: PlayerPassValueStats[]
): PlayerPassValueStats[] {
    const playersSortedByPassValueAdded = data.sort(
        (a, b) => b.passer - a.passer
    );
    const topPassers = playersSortedByPassValueAdded.slice(0, 5);
    return topPassers;
}

export function getTopPassRecipients(
    data: PlayerPassValueStats[]
): PlayerPassValueStats[] {
    const playersSortedByPassRecipientValueAdded = data.sort(
        (a, b) => b.recipient - a.recipient
    );
    const topPassRecipients = playersSortedByPassRecipientValueAdded.slice(0, 5);
    return topPassRecipients;
}
