import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <section className="section-hero">
            <div className="row">
                <h1 className="heading heading-primary">You got the travel plans, we got the travel vans.</h1>
                <p className="hero-content">Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your
                    perfect
                    road trip.</p>
                <Link to="vans">Find your van</Link>
            </div>
        </section>
    )
}