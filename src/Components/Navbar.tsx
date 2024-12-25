import Logo from '../assets/chesscomlogo.png';

const Navbar: React.FC = () => {
    return (
        <div className="w-full p-4 shadow-sm text-lg text-[#374151]">
            <div className='flex gap-2 items-center'>
                <img src={Logo} className='w-6'></img>
                <p>Chess.com Wrapped</p>
            </div>
        </div>)
}
export default Navbar;