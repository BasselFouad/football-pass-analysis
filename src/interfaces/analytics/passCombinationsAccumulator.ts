export interface PassCombinationsAccumulator {
    [playerId: number]: {
        [recipientId: number]: {
            passAddedValue: number,
            recipientName: string
        },
        playerName: string
    };
}