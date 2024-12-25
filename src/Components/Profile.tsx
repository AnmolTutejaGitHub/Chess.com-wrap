import Navbar from "./Navbar";

interface ProfileProps {
    username: string;
}

function Profile({ username }: ProfileProps) {
    return <div>
        <Navbar />
        {username}
    </div>;
}

export default Profile;