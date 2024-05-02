import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { AnalyticsTracker, IPlayer, PassCombination } from "../../interfaces";
import { findBestPassingCombinations } from "../../data/passingCombinations";

interface PassingCombinationsBarChartProps {
    analyticsTracker: AnalyticsTracker | null;
    allPlayers: IPlayer[];
}

const PassingCombinationsBarChart: React.FC<
    PassingCombinationsBarChartProps
> = ({ analyticsTracker, allPlayers }) => {
    const [topPassingCombinations, setTopPassingCombinations] = useState<
        PassCombination[]
    >([]);

    const getPlayerName = (playerId: number): string => {
        return allPlayers[playerId].playerName;
    };
    useEffect(() => {
        if (analyticsTracker) {
            setTopPassingCombinations(
                findBestPassingCombinations(
                    analyticsTracker.playerPassCombinationsAccumulator
                )
            );
        }
    }, [analyticsTracker]);


    return (
        <div className="flex flex-col items-start justify-between">
            <Chart
                width={"30rem"}
                height={"30rem"}
                chartType="BarChart"
                data={[
                    ["Player Name", `Accumulative Pass Value`, { role: "annotation" }],
                    ...topPassingCombinations.map((passCombination) => [
                        getPlayerName(passCombination.passerId),
                        passCombination.passValue,
                        getPlayerName(passCombination.recipientId),
                    ]),
                ]}
                options={{
                    hAxis: {
                        slantedText: true,
                        slantedTextAngle: 90,
                    },
                    annotations: {
                        alwaysOutside: true,
                        textStyle: {
                            fontSize: 14,
                            auraColor: "none",
                            color: "black",
                        },
                    },
                    colors: ["green"],
                }}
            />
        </div>
    );
};

export default PassingCombinationsBarChart;
