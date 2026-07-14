import { useParams } from "react-router-dom";
import MainHeader from "../../components/Atoms/MainHeader/MainHeader";
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner";
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan";
import RowContainer from "../../components/Atoms/RowContainer/RowContainer";
import ContentHeader from "../../components/Atoms/ContentHeader/ContentHeader";
import ContentNumber from "../../components/Atoms/ContentNumber/ContentNumber";
import StatCard from "../../components/Molecules/StatCard/StatCard";
import { fetchAllTimePlayerStats } from "../../hooks/fetch/fetchStats";
import { useContext, useEffect, useState } from "react";
import { BureauContext } from "../../Context/BureauProvider";

const PlayerPage = () => {

    const { playerId } = useParams();

    const { state, dispatch } = useContext(BureauContext)
    const [playerStats, setPlayerStats] = useState(null);

    const fetchPlayerStats = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const result = await fetchAllTimePlayerStats(Number(playerId));
            setPlayerStats(result);
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    useEffect(() => {
        fetchPlayerStats();
    }, [])

    console.log(playerStats)

    return (
        <section className="flex flex-col gap-4">
                <MainHeader text={playerStats ? `${playerStats['Player Name']}` : 'Stats'} />
                {state.loading && <LoadingSpinner />}
                {state.error && <ErrorSpan message={state.error} />}
                <RowContainer>
                    {playerStats && Object.keys(playerStats).filter(key => key !== 'Player Name').map(stat =>
                        <StatCard key={stat}>
                            <ContentHeader text={stat} />
                            <ContentNumber value={playerStats[stat]} />
                        </StatCard>
                    )}
                </RowContainer>
            </section>
    )
}
export default PlayerPage
