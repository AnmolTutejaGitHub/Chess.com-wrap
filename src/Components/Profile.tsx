import Navbar from "./Navbar";

interface ProfileProps {
    username: string;
}

function Profile({ username }: ProfileProps) {
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