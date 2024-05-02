export interface IPass {
    matchId: number;
    period: number;
    minute: number;
    second: number;
    teamId: number;
    teamName: string;
    playerId: number;
    playerName: string;
    locationX: number;
    locationY: number;
    outcomeName: string;
    passEndLocationX: number;
    passEndLocationY: number;
    passRecipientId: number | null;
    passRecipientName: string | null;
    obvAdded: number;
    teamFormationId: number;
    oppFormationId: number;
}