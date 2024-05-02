import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { PlayerPassValueStats, AnalyticsTracker } from "../../interfaces";
import { getTopPassRecipients, getTopPassers } from "../../data/topPasserRecipient";
import { PASSING_SITUATION } from "../../enums/passingSituation";

interface PasserValueChartProps {
    analyticsTracker: AnalyticsTracker | null;
    situation: PASSING_SITUATION;
}

const PasserValueChart: React.FC<PasserValueChartProps> = ({
    analyticsTracker,
    situation,
}) => {
    const [topPlayers, setTopPlayers] = useState<PlayerPassValueStats[]>([]);

    useEffect(() => {
        if (analyticsTracker && situation == PASSING_SITUATION.PASSER) {
            setTopPlayers(getTopPassers(analyticsTracker.playerPassValueAccumulator));
        } else {
            if (analyticsTracker && situation == PASSING_SITUATION.RECIPIENT) {
                setTopPlayers(
                    getTopPassRecipients(analyticsTracker.playerPassValueAccumulator)
                );
            }
        }
    }, [analyticsTracker, situation]);


    return (
        <div className="flex flex-col items-start justify-between">
            <Chart
                width={"30rem"}
                height={"30rem"}
                chartType="BarChart"
                data={[
                    ["Player Name", `Pass Value Added as a ${situation}`],
                    ...topPlayers.map((passer) =>
                        situation == PASSING_SITUATION.PASSER
                            ? [passer.playerName, passer.passer]
                            : [passer.playerName, passer.recipient]
                    ),
                ]}
                options={{
                    hAxis: {
                        slantedText: true,
                        slantedTextAngle: 90,
                    },
                }}
            />
        </div>
    );
};

export default PasserValueChart;
