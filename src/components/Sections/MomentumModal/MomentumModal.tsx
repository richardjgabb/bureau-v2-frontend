import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  import { useGameState } from "../../../pages/GamePage/useGameState";
import OuterModal from "../../Molecules/OuterModal/OuterModal";
import type { MomentumModalProps } from "./types";
import { useEffect } from "react";
import { fetchScoreboardData } from "../../../hooks/fetch/fetchScoreboard";

  // Register necessary Chart.js components
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const MomentumModal = ({ setShowMomentum, cachedRound, setCachedRound }: MomentumModalProps) => {
    const { state, dispatch } = useGameState();

    const fetchData = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const result = await fetchScoreboardData(Number(state.data?.id));
        dispatch({ type: 'SET_SCOREBOARD', payload: result });
    }

    useEffect(() => {
        if (cachedRound === state.data?.round) {
            return
        }
        fetchData();
        setCachedRound(state.data?.round ?? 1);
    }, [])

    const options = {
      responsive: true,
      maintainAspectRatio: true, // optional but helps with flexbox layouts
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            font: { size: 12, family: "Arial", lineHeight: 1 },
            color: "#222",
            padding: 15,
          },
        },
        title: {
          display: false,
          text: "Momentum",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Score",
            color: "#222",
            font: { size: 14, weight: "bold" },
          },
          grid: {
            color: "rgba(0,0,0,0.1)",
          },
          ticks: {
            color: "#222",
            callback: function (value) {
                return '£' + (value/100).toFixed(2);
              },
          },
        },
        x: {
          title: {
            display: true,
            text: "Rounds",
            color: "#222",
            font: { size: 14, weight: "bold" },
          },
          grid: {
            display: false,
          },
          ticks: {
            color: "#333",
          },
        },
      },
    };

    const createData = (player, scoreboard) => {
      const data = [];

      // Add player's actual scores
      scoreboard.forEach((round) => {
        data.push(round.scores[player.id] ?? null);
      });

      return data;
    };

    const createLabels = (scoreboard = []) => scoreboard.map((round) => round.round);

    const createDataSets = (players = []) => {
      const colors = [
        "#d45028",
        "#1aad81",
        "#d7e60e",
        "#e6960e",
        "#0abfbc",
        "#17ad3c",
        "#9e33cc",
        "#cc33b0",
        "#7d787c",
        "#2940c2",
      ];

      return players.map((player, i) => ({
        label: player.name,
        data: createData(player, state.data?.scoreboard ?? []),
        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length],
        tension: 0.3,
        pointRadius: 3,
        fill: false,
      }));
    };

    const data = {
      labels: createLabels(state.data?.scoreboard ?? []),
      datasets: createDataSets(Object.values(state.data?.players) ?? []),
    };

    return (
      <OuterModal setShowModal={setShowMomentum}>
        <div className="w-full h-fit bg-white/40 rounded-lg p-10">
          <Line options={options} data={data} />
        </div>
      </OuterModal>
    );
  };

  export default MomentumModal;
