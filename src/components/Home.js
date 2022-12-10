import Nav from "./nav/Nav"
import './Home.css'
import HomeBanner from '../assets/home-banner.jpg'
function Home () {
    return (
        <div className="home" style={backgroundImage={HomeBanner}}>
            <Nav />
        </div>
    )
}
export default Home