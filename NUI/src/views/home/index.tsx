import Featured from "../../components/featured";
import Hero from "../../components/hero"
import Mission from "../../components/mission-vision";

const HomePage = () => {

    return (
        <>
            <div>
                <Hero />
            </div>
            <div>
                <Featured />
            </div>
            <div>
                <Mission />
            </div>
        </>

    )
}

export default HomePage;