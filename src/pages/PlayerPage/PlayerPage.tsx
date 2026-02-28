import { useParams } from "react-router-dom";
import MainHeader from "../../components/Atoms/MainHeader/MainHeader";
import LoadingSpinner from "../../components/Atoms/LoadingSpinner/LoadingSpinner";
import ErrorSpan from "../../components/Atoms/ErrorSpan/ErrorSpan";
import RowContainer from "../../components/Atoms/RowContainer/RowContainer";
import ContentHeader from "../../components/Atoms/ContentHeader/ContentHeader";
import ContentNumber from "../../components/Atoms/ContentNumber/ContentNumber";
import { useFetch } from "../../hooks/useFetch";
import StatCard from "../../components/Molecules/StatCard/StatCard";

const PlayerPage = () => {

    const { playerId } = useParams();
    const playersURL = import.meta.env.VITE_API_URL + 'players/' + playerId

    const { data, error, loading } = useFetch<ApiResponse<PlayersData>>(playersURL)

    return (
        <section className="flex flex-col gap-4">
                <MainHeader text={data ? `${data.data['Player Name']}` : 'Stats'} />
                {loading && <LoadingSpinner />}
                {error && <ErrorSpan message={error.message} />}
                <RowContainer>
                    {data && Object.keys(data.data).filter(key => key !== 'Player Name').map(stat =>
                        <StatCard key={stat}>
                            <ContentHeader text={stat} />
                            <ContentNumber value={data.data[stat]} />
                        </StatCard>
                    )}
                </RowContainer>
            </section>
    )
}
export default PlayerPage
