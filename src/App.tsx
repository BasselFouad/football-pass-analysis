import { useEffect, useState } from "react";

import "./App.css";
import { loadData } from "./data/loadData";
import {
  PlayerPassValueStats,
  AnalyticsTracker,
  IMatch,
  IData,
  IPlayer,
} from "./interfaces";
import {
  filterData,
  parseAnalytics,
} from "./data/dataUtils";
import ChartContainer from "./components/charts/chartContainer";
import { FilterDropDown } from "./components/dropDown/dropDown";
import { FILTER } from "./enums/filterType";
import { getAllPlayers, getTopPassers } from "./data/topPasserRecipient";

const App = () => {
  const [fullAnalyticsData, setFullAnalyticsData] = useState<IData>();

  const [analyticsTracker, setAnalyticsTracker] =
    useState<AnalyticsTracker | null>(null);

  const [topPassers, setTopPassers] = useState<PlayerPassValueStats[] | []>([]);

  const [matches, setMatches] = useState<IMatch[]>([]);
  const [players, setPlayers] = useState<IPlayer[]>([]);

  const [selectedMatch, setSelectedMatch] = useState<IMatch | null>(null);
  const [selectedPlayer, SetSelectedPlayer] = useState<IPlayer | null>(null);

  useEffect(() => {
    const data = loadData();

    setFullAnalyticsData(data);
    setAnalyticsTracker(parseAnalytics(data));
    setMatches(data.matches);
    setPlayers(getAllPlayers(data.formationPlayers));
  }, []);

  useEffect(() => {
    if (
      (selectedMatch && fullAnalyticsData) ||
      (selectedPlayer && fullAnalyticsData)
    ) {

      const filteredData = filterData(
        fullAnalyticsData,
        selectedMatch,
        selectedPlayer
      );

      setAnalyticsTracker(parseAnalytics(filteredData));
    }
  }, [selectedMatch, selectedPlayer]);

  useEffect(() => {
    if (analyticsTracker) {
      setTopPassers(
        getTopPassers(analyticsTracker?.playerPassValueAccumulator)
      );
    }
  }, [analyticsTracker]);


  return (
    <div className="w-full bg-white shadow-2xl rounded-lg min-w-max">
      <h1 className="text-3xl font-bold text-center mb-2 mt-4 p-4">
        Match Analysis Dashboard
      </h1>
      <div className="mx-20 mt-4 grid max-w-2xl grid-cols-1 gap-x-20 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="mx-16">
          <FilterDropDown
            dataList={matches}
            filterType={FILTER.BY_MATCH}
            selectedItem={selectedMatch}
            setSelectedItem={setSelectedMatch}
          />
        </div>
        <div className="mx-16">
          <FilterDropDown
            dataList={players}
            filterType={FILTER.BY_PLAYER}
            selectedItem={selectedPlayer}
            setSelectedItem={SetSelectedPlayer}
          />
        </div>
      </div>
      <div className="mt-8">
        <ChartContainer
          analyticsTracker={analyticsTracker}
          allPlayers={players}
        />
      </div>
    </div>
  );
};

export default App;
