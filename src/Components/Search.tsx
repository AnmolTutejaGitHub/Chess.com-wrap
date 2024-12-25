import Stats from '../assets/stats.png';
import Logo from '../assets/chesscomlogo.png';
const Search: React.FC = () => {
    return (
        <div className="bg-[#3B81F6] p-8">
            <p className="text-white text-3xl text-center">Reflect Your Year With <span className="font-bold">Chess.com Wrapped</span></p>
            <p className="text-white text-center">Made By <span className="font-semibold underline cursor-pointer"><a href="https://www.linkedin.com/in/anmol-tuteja-684b0327b/" target="_blank">Anmol Tuteja</a></span> (not affiliated with GitHub)</p>

            <div className='flex pt-8 justify-around' >
                <div className="bg-gray-300 w-80 p-4 rounded-md flex flex-col gap-3 pb-8">
                    <div>Enter Your Chess.com username</div>
                    {/* <div className='flex justify-center'>
                        <img src={Logo} className='w-10'></img>
                    </div> */}
                    <div className="flex gap-2">
                        <input placeholder="Enter Username" className="p-2 outline-none w-[85%]"></input>
                        <button className="pl-4 pr-4 pt-2 pb-2 bg-[#3B81F6] text-white">Go</button>
                    </div>
                </div>
                <div className='w-96'>
                    <img src={Stats}></img>
                    <p className='text-center text-white'>We analyse Your chess.com games statistically</p>
                </div>
            </div>
        </div >)
}
export default Search;