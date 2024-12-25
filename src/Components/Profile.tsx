import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

interface ProfileProps {
    username: string;
}

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

function Profile({ username }: ProfileProps) {
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

        for (const match of data.games) {
            const color: string = match.white.username === username ? "white" : "black";
            accuracyTotal += match.accuracies[color];
            if (match[color].result == "win") wins++;
            else if (match[color].result == "draw" || match[color].result == "repetition" || match[color].result == "stalemate" || match[color].result == "agreed") draws++;
            else losses++;
        }

        const monthData: MonthGames = {
            gamesPlayed: data.games.length,
            accuracy: data.games.length > 0 ? accuracyTotal / data.games.length : 0,
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
        setYearSats(statsArray);
    }

    useEffect(() => {
        getStats();
        getYearData();
    }, [])

    return <div>
        <Navbar />

        <div>
            <div className="text-center p-4 text-[#374151]">
                <div className="font-bold"> {username}'s </div>
                <div className="text-2xl">2024 Chess.com Wrapped</div>
            </div>
        </div>
    </div>;
}

export default Profile;