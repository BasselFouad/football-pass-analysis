import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import {
    AnalyticsTracker,
    PassCombination,
    PassCombinationsAccumulator,
} from "../../interfaces";
import {
    filterPassCombinationsByTopPassers,
    findBestPassingCombinations,
} from "../../data/passingCombinations";

interface PassingCombinationsSankeyChartProps {
    analyticsTracker: AnalyticsTracker | null;
}

const PassingCombinationsSankeyChart: React.FC<
    PassingCombinationsSankeyChartProps
> = ({ analyticsTracker }) => {
    const [passingCombinations, setPassingCombinations] =
        useState<PassCombinationsAccumulator>({});
    const [topPassingCombinations, setTopPassingCombinations] = useState<
        PassCombination[]
    >([]);

    useEffect(() => {
        if (analyticsTracker) {
            setPassingCombinations(
                filterPassCombinationsByTopPassers(
                    analyticsTracker?.playerPassCombinationsAccumulator,
                    topPassingCombinations
                )
            );
        }
    }, [topPassingCombinations]);

    useEffect(() => {
        if (analyticsTracker) {
            setTopPassingCombinations(
                findBestPassingCombinations(
                    analyticsTracker?.playerPassCombinationsAccumulator
                )
            );
        }
    }, [analyticsTracker]);

    const chartData = [];
    for (const playerId in passingCombinations) {
        for (const key in passingCombinations[playerId]) {
            if (key != "playerName") {
                chartData.push([
                    `${passingCombinations[playerId].playerName}-P`,
                    `${passingCombinations[playerId][key].recipientName}-R`,
                    passingCombinations[playerId][key].passAddedValue,
                ]);
            }
        }
    }

    return (
        <div className="flex flex-col items-start justify-between">
            <Chart
                width={"32rem"}
                height={"40rem"}
                chartType="Sankey"
                data={[
                    ["Passer Name", `Pass Recipient Name`, "Value Added"],
                    ...chartData,
                ]}
                options={{
                    title: "Pass Value Added Analysis",
                    hAxis: {
                        slantedText: true,
                        slantedTextAngle: 90,
                    },
                }}
            />
        </div>
    );
};

export default PassingCombinationsSankeyChart;
