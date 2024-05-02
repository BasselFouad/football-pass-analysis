import { IPlayer } from "./player";

export interface IFormationPlayer extends IPlayer {
    matchId: number;
    formationId: number;
    teamId: number;
    teamName: string;
    positionId: number;
    positionName: string;
}