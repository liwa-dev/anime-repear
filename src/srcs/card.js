import "./card.css";



export default function Card() {
    return (
        <article className="card">
            <div className="cover">
                <div className="cover_text">
                    <h1 className="cover_title">Top 50</h1>
                    <h4 className="cover_subtitle">Global</h4>
                </div>
                <div className="pb-wrapper">
                    <button className="play-button">&#x2bc8</button>
                </div>
                <img src="https://i.scdn.co/image/ab67616d00001e025b326baec6594dd08bdcca07" alt="" className="watermark"></img>
            </div>
            <div className="description">
                <h1 className="p1-name">Global Top 50</h1>
                <p className="p1-about">Your daily update of the most played tracks right now.</p>
            </div>
        </article>
    )
}