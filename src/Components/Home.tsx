import Navbar from '../Components/Navbar';
import Search from '../Components/Search';
import Footer from '../Components/Footer';
import SampleData from '../Components/SampleData';

const Home: React.FC = () => {
    return <div>
        <Navbar />
        <Search />
        <SampleData />
        <Footer />
    </div>
}
export default Home;