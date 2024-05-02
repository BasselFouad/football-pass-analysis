import { PASSING_SITUATION } from "../enums/passingSituation";
import {
    IMatch,
    IData,
    areMatchesEqual,
    PlayerPassValueStats,
    PassCombinationsAccumulator,
    AnalyticsTracker,
    IPlayer,
} from "../interfaces";
import { addPassCombination } from "./passingCombinations";
import { addPlayerPass } from "./topPasserRecipient";

export const filterData = (
    data: IData,
    match: IMatch | null,
    player: IPlayer | null
): IData => {
    try {
        const resultObject: IData = { ...data };
        if (match) {
            resultObject.matches = data.matches.filter((currentMatch) =>
                areMatchesEqual(currentMatch, match)
            );
        }
        resultObject.passes = data.passes.filter((currentPass) => {
            if (match && player) {
                return (
                    currentPass.playerId == player.playerId &&
                    currentPass.matchId == match.matchId
                );
            }
            if (match) {
                return currentPass.matchId == match.matchId;
            }
            if (player) {
                return currentPass.playerId == player?.playerId;
            }
        });
        resultObject.formationPlayers = data.formationPlayers.filter(
            (formationPlayer) => {
                if (match && player) {
                    return (
                        formationPlayer.playerId == player.playerId &&
                        formationPlayer.matchId == match.matchId
                    );
                }
                if (match) {
                    return formationPlayer.matchId == match.matchId;
                }
                if (player) {
                    return formationPlayer.playerId == player?.playerId;
                }
            }
        );
        console.log(data);
        console.log(resultObject);
        return resultObject;
    } catch (error) {
        console.log(error);
        return data;
    }
};

export const parseAnalytics = (data: IData): AnalyticsTracker => {
    const playerPassValueAccumulator: PlayerPassValueStats[] = [];

    const playerPassCombinationsAccumulator: PassCombinationsAccumulator = {};

    try {
        data.passes.forEach((pass) => {
            addPlayerPass(
                playerPassValueAccumulator,
                pass.playerId,
                pass.playerName,
                pass.obvAdded,
                PASSING_SITUATION.PASSER
            );
            addPlayerPass(
                playerPassValueAccumulator,
                pass.passRecipientId,
                pass.passRecipientName,
                pass.obvAdded,
                PASSING_SITUATION.RECIPIENT
            );
            addPassCombination(
                playerPassCombinationsAccumulator,
                pass.playerId,
                pass.passRecipientId,
                pass.playerName,
                pass.passRecipientName,
                pass.obvAdded
            );
        });
        return { playerPassValueAccumulator, playerPassCombinationsAccumulator };
    } catch (error) {
        console.log(error);
        return {
            playerPassValueAccumulator: [],
            playerPassCombinationsAccumulator: {},
        };
    }
};

