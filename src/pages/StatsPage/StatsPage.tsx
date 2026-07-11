import { useContext, useEffect } from "react"
import ContentHeader from "../../components/Atoms/ContentHeader/ContentHeader"
import ContentNumber from "../../components/Atoms/ContentNumber/ContentNumber"
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner"
import MainHeader from "../../components/Atoms/MainHeader/MainHeader"
import RowContainer from "../../components/Atoms/RowContainer/RowContainer"
import StatCard from "../../components/Molecules/StatCard/StatCard"
import { BureauContext } from "../../Context/BureauProvider"
import { fetchAllTimeStatsData } from "../../hooks/fetch/fetchStats"

const StatsPage = () => {

    const { state, dispatch } = useContext(BureauContext)

    const fetchStats = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const result = await fetchAllTimeStatsData();
            dispatch({ type: 'SET_STATS', payload: result });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    useEffect(() => {
        if (!state.stats) {
            fetchStats();
        }
    }, [state.stats])

    return (
        <>
            <section className="flex flex-col gap-4">
                <MainHeader text="Stats" />
                {state.loading && <LoadingSpinner />}
                {state.error && <ErrorSpan message={state.error} />}
                <RowContainer>
                    {state.stats && Object.keys(state.stats).map(stat =>
                        <StatCard key={stat}>
                            <ContentHeader text={stat} />
                            <ContentNumber value={state.stats[stat]} />
                        </StatCard>
                    )}
                </RowContainer>
            </section>
        </>
    )
}
export default StatsPage
