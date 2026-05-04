export interface StatsModalProps {
    cachedStats: number;
    setCachedStats: (round: number) => void;
    setShowStats: (state: boolean) => void;
}
