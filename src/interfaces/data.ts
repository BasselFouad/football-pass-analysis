import { IMatch, IFormationPlayer, IPass } from '../interfaces';

export interface IData {
    matches: IMatch[];
    formationPlayers: IFormationPlayer[];
    passes: IPass[];
}