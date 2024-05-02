import {
    PassCombination,
    PassCombinationsAccumulator,
} from "../interfaces";

export const findBestPassingCombinations = (
    passCombinationsAccumalator: PassCombinationsAccumulator
): PassCombination[] => {
    const flattenedCombinations: Array<PassCombination> = [];

    for (const playerId in passCombinationsAccumalator) {
        for (const key in passCombinationsAccumalator[playerId]) {
            if (key != "playerName") {
                flattenedCombinations.push({
                    passerId: Number(playerId),
                    recipientId: Number(key),
                    passValue: Number(
                        passCombinationsAccumalator[playerId][key].passAddedValue
                    ),
                });
            }
        }
    }
    flattenedCombinations.sort((a, b) => b.passValue - a.passValue);

    const top10Combinations = flattenedCombinations.slice(0, 5);

    return top10Combinations;
};

export const filterPassCombinationsByTopPassers = (
    passCombinationsAccumalator: PassCombinationsAccumulator,
    topPassCombinations: PassCombination[]
): PassCombinationsAccumulator => {
    return Object.keys(passCombinationsAccumalator)
        .filter((key) =>
            topPassCombinations
                .map((passCombination) => passCombination.passerId)
                .includes(Number(key))
        )
        .reduce((acc, key) => {
            console.log(key);
            acc[Number(key)] = passCombinationsAccumalator[Number(key)];
            return acc;
        }, {} as PassCombinationsAccumulator);
};

export const addPassCombination = (
    playerPassCombinationsAccumulator: PassCombinationsAccumulator,
    passerId: number | null,
    recipientId: number | null,
    passerName: string | null,
    recipientName: string | null,
    passAddedValue: number
) => {
    if (passerId && recipientId && passerName && recipientName) {
        if (
            playerPassCombinationsAccumulator[passerId] &&
            playerPassCombinationsAccumulator[passerId][recipientId]
        ) {
            playerPassCombinationsAccumulator[passerId][recipientId].passAddedValue +=
                passAddedValue;
        } else {
            if (!playerPassCombinationsAccumulator[passerId]) {
                playerPassCombinationsAccumulator[passerId] = {
                    playerName: passerName,
                };
            }
            playerPassCombinationsAccumulator[passerId][recipientId] = {
                passAddedValue,
                recipientName,
            };
        }
    }
};
