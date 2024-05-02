import { PassCombinationsAccumulator } from "./passCombinationsAccumulator";
import { PlayerPassValueStats } from "./playerPassValueStats";

export interface AnalyticsTracker {
    playerPassValueAccumulator: PlayerPassValueStats[],
    playerPassCombinationsAccumulator: PassCombinationsAccumulator
}