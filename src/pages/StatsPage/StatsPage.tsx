import ContentHeader from "../../components/Atoms/ContentHeader/ContentHeader"
import ContentNumber from "../../components/Atoms/ContentNumber/ContentNumber"
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan"
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner"
import MainHeader from "../../components/Atoms/MainHeader/MainHeader"
import RowContainer from "../../components/Atoms/RowContainer/RowContainer"
import StatCard from "../../components/Molecules/StatCard/StatCard"
import { useFetch } from "../../hooks/useFetch"

const StatsPage = () => {

    const { data, error, loading } = useFetch<ApiResponse<StatsData>>(import.meta.env.VITE_API_URL + 'stats')

    return (
        <>
            <section className="flex flex-col gap-4">
                <MainHeader text="Stats" />
                {loading && <LoadingSpinner />}
                {error && <ErrorSpan message={error.message} />}
                <RowContainer>
                    {data && Object.keys(data.data).map(stat =>
                        <StatCard key={stat}>
                            <ContentHeader text={stat} />
                            <ContentNumber value={data.data[stat]} />
                        </StatCard>
                    )}
                </RowContainer>
            </section>
        </>
    )
}
export default StatsPage
