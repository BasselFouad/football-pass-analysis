import { PASSING_SITUATION } from "../../enums/passingSituation";
import { AnalyticsTracker, IPlayer } from "../../interfaces";
import PassingCombinationsSankeyChart from "./passingCombinationsSankeyChart";
import PasserValueChart from "./passerValueBarChart";
import PassingCombinationsBarChart from "./passingCombinationsBarChart";

interface ChartContainerProps {
    analyticsTracker: AnalyticsTracker | null;
    allPlayers: IPlayer[];
}

const ChartContainer: React.FC<ChartContainerProps> = ({
    analyticsTracker,
    allPlayers,
}) => {
    return (
        <div className="bg-white py-2 sm:py-4 max-w-full">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
                <div className="max-w-2xl text-left float-left mb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Analytics
                    </h2>
                    <p className="mt-2 mb-8 text-lg leading-8 text-gray-600">
                        Think you watched the game? Look closer.
                    </p>
                </div>
                <div>
                    <p className="text-m font-bold tracking-tight text-gray-900 sm:text-2xl mb-8">
                        Passing Combinations Stats
                    </p>
                    <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <PassingCombinationsSankeyChart
                            analyticsTracker={analyticsTracker}
                        />
                        <PassingCombinationsBarChart
                            analyticsTracker={analyticsTracker}
                            allPlayers={allPlayers}
                        />
                    </div>
                </div>
                <div>
                    <p className="text-m font-bold tracking-tight text-gray-900 sm:text-2xl mt-20">
                        Top Passers and Receivers
                    </p>
                    <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <PasserValueChart
                            analyticsTracker={analyticsTracker}
                            situation={PASSING_SITUATION.PASSER}
                        />
                        <PasserValueChart
                            analyticsTracker={analyticsTracker}
                            situation={PASSING_SITUATION.RECIPIENT}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChartContainer;
