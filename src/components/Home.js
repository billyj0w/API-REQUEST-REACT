import Nav from "./nav/Nav"
import './Home.css'
import HomeBanner from '../assets/home-banner.png'
function Home () {
    return (
        <div className="home" style={{ backgroundImage: `url(${HomeBanner})` }}>
            <div className="homeMain">
                <h1>Welcome To The Pokemon World!</h1>
                <Nav />
            </div>
        </div>
    )
}
export default Home