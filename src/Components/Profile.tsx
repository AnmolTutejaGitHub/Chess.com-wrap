import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import { useLocation } from 'react-router-dom';

interface SubStat {
    rating: number,
    win: number,
    loss: number,
    draw: number
}

interface Stats {
    Rapid: SubStat,
    Blitz: SubStat,
    Bullet: SubStat,
    Fide: number
}

interface MonthGames {
    accuracy: number,
    gamesPlayed: number,
    win: number,
    loss: number,
    draw: number
}

function Profile() {
    const location = useLocation();
    const { username } = location.state || {};
    const [year, setYear] = useState<string>('2024');
    const [stats, setStats] = useState<Stats | null>(null);
    const [YearStats, setYearSats] = useState<MonthGames[]>([]);

    async function getStats(): Promise<void> {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}/stats`);
        const data: any = response.data;
        const stat: Stats = {
            Rapid: { rating: data.chess_rapid.last.rating, win: data.chess_rapid.record.win, loss: data.chess_rapid.record.loss, draw: data.chess_rapid.record.draw },
            Blitz: { rating: data.chess_bullet.last.rating, win: data.chess_bullet.record.win, loss: data.chess_bullet.record.loss, draw: data.chess_bullet.record.draw },
            Bullet: { rating: data.chess_blitz.last.rating, win: data.chess_blitz.record.win, loss: data.chess_blitz.record.loss, draw: data.chess_blitz.record.draw },
            Fide: data.fide
        }
        console.log(stat);
        setStats(stat);
    }

    async function getMonthGamesData(i: number): Promise<MonthGames> {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}/games/${year}/${i}`);
        const data: any = response.data;

        let accuracyTotal: number = 0;
        let wins: number = 0;
        let losses: number = 0;
        let draws: number = 0;
        let MatchedReviewed = 0;

        for (const match of data.games) {
            const color: string = match.white.username === username ? "white" : "black";
            console.log(color);
            accuracyTotal += match?.accuracies?.[color] ?? 0;
            if (match?.accuracies?.[color]) MatchedReviewed++;
            if (match[color]?.result == "win") wins++;
            else if (match[color]?.result === "draw" ||
                match[color]?.result === "repetition" ||
                match[color]?.result === "stalemate" ||
                match[color]?.result === "agreed" ||
                match[color]?.result === "50-move-rule" ||
                match[color]?.result === "insufficient-material") draws++;
            else losses++;
        }

        const monthData: MonthGames = {
            gamesPlayed: data.games.length,
            accuracy: data.games.length > 0 ? accuracyTotal / MatchedReviewed : 0,
            win: wins,
            loss: losses,
            draw: draws
        }

        return monthData;
    }

    async function getYearData(): Promise<void> {
        const statsArray: MonthGames[] = [];
        for (let i = 10; i <= 12; i++) {
            const monthData: MonthGames = await getMonthGamesData(i);
            statsArray.push(monthData);
        }
        console.log(statsArray);
        setYearSats(statsArray);
    }

    useEffect(() => {
        getStats();
        getYearData();
    }, [])

    return <div className="p-4">
        <Navbar />
        <div>
            <div className="text-center p-4 text-[#374151]">
                <div className="font-bold"> {username}'s </div>
                <div className="text-2xl">2024 Chess.com Wrapped</div>
            </div>

            <div className="flex justify-center">
                <div className="w-[60%] h-[40%] bg-gray-100 p-4 mt-8">
                    <BarGraph
                        labels={['Rapid', 'Blitz', 'Bullet', 'Fide']}
                        data={[
                            stats?.Rapid.rating ?? 0,
                            stats?.Blitz.rating ?? 0,
                            stats?.Bullet.rating ?? 0,
                            stats?.Fide ?? 0,
                        ]}
                        datasetLabel="chess.com Ratings" />
                </div>
            </div>


            <div className="p-4 flex justify-around w-full items-center flex-wrap">
                <div className="w-[40%]">
                    <div className="h-[40%] bg-gray-100 p-4 mt-8">
                        <BarGraph
                            labels={['October', 'November', 'December']}
                            data={[
                                YearStats[0]?.accuracy ?? 0,
                                YearStats[1]?.accuracy ?? 0,
                                YearStats[2]?.accuracy ?? 0,
                            ]}
                            datasetLabel="Average Accuracy in given Month (For Match Reviewed only)" />
                    </div>
                </div>

                <div className="w-[40%]">
                    <div className="h-[40%] bg-gray-100 p-4 mt-8">
                        <BarGraph
                            labels={['Wins', 'Losses', 'Draws']}
                            data={[
                                YearStats[0]?.win + YearStats[1]?.win + YearStats[2]?.win ?? 0,
                                YearStats[0]?.loss + YearStats[1]?.loss + YearStats[2]?.loss ?? 0,
                                YearStats[0]?.draw + YearStats[1]?.draw + YearStats[2]?.draw ?? 0,
                            ]}
                            datasetLabel={`Out of ${YearStats[0]?.gamesPlayed + YearStats[1]?.gamesPlayed + YearStats[2]?.gamesPlayed} games played in last 3 months`} />
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap p-4">
                <div className="w-1/3 p-2">
                    <PieChart
                        labels={['win', 'loss', 'draw']}
                        data={[
                            stats?.Rapid?.win ?? 0,
                            stats?.Rapid?.loss ?? 0,
                            stats?.Rapid?.draw ?? 0
                        ]}
                        chartTitle="All Time Rapid Stats"
                    />
                </div>
                <div className="w-1/3 p-2">
                    <PieChart
                        labels={['win', 'loss', 'draw']}
                        data={[
                            stats?.Blitz?.win ?? 0,
                            stats?.Blitz?.loss ?? 0,
                            stats?.Blitz?.draw ?? 0
                        ]}
                        chartTitle="All Time Blitz Stats"
                    />
                </div>
                <div className="w-1/3 p-2">
                    <PieChart
                        labels={['win', 'loss', 'draw']}
                        data={[
                            stats?.Bullet?.win ?? 0,
                            stats?.Bullet?.loss ?? 0,
                            stats?.Bullet?.draw ?? 0
                        ]}
                        chartTitle="All Time Bullet Stats"
                    />
                </div>
            </div>

            <div className="bg-[#F2F5F7] p-4 border-l-8 border-red-500">
                <p className="pb-2 font-bold">Note</p>
                This Wrapper is supposed to be of whole year but due to chess.com API restrictions we display some data (mentioned specifically) of last 3 months
            </div>

        </div>
    </div>;
}

export default Profile;