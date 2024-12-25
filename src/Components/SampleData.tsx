import Arjun from '../assets/Arjun wins WR Masters_7BC81_1366x1567.jpeg';
import Hikaru from '../assets/HikaruN.jpeg';
import Fabiano from '../assets/fabiano.jpeg';
import Magnus from '../assets/Magnus.png';


interface ExampleData {
    user: string,
    username: string,
    profilePic?: string
}

const SampleData: React.FC = () => {

    const sampleData: ExampleData[] = [
        { user: "Magnus Carlsen", username: "MagnusCarlsen", profilePic: Magnus },
        { user: "Hikaru Nakamura", username: "Hikaru", profilePic: Hikaru },
        { user: "Arjun Erigaisi", username: "GHANDEEVAM2003", profilePic: Arjun },
        { user: "Fabiano Caruana", username: "FabianoCaruana", profilePic: Fabiano }
    ]

    const renderData = sampleData.map((data) => {
        return <div className="bg-gray-100 p-6 rounded-sm hover:bg-gray-200 flex gap-2 justify-center cursor-pointer">
            <div>
                <img
                    src={data.profilePic}
                    alt={`${data.user}'s profile`}
                    className="w-20 h-20 rounded-full object-cover"
                />
            </div>
            <div className='flex flex-col'>
                <div className="text-[#374151] font-bold">{data.user}</div>
                <div className='text-sm'>@{data.username}</div>
            </div>
        </div>
    })

    return (<div className="pt-16 pb-16 p-2">
        <div className="text-center text-3xl text-gray-700">See Some Examples</div>
        <div className="flex justify-around p-4 pt-8">{renderData}</div>
    </div>)
}
export default SampleData;