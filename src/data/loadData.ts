import { IData } from '../interfaces';
import myData from './dbData/data.json';



export const loadData = (): IData => {
    try {
        const data: IData = {
            matches: myData.matches,
            formationPlayers: myData.formation_players,
            passes: myData.passes
        };
        return data;
    } catch (error) {
        console.log(error);
        return { matches: [], formationPlayers: [], passes: [] };
    }
};