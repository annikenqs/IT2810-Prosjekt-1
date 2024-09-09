import "./JokeCard.css"

function JokeCard({quote, author}:{
        quote:string,
        author:string,
    }
){
    return (
        <>
            <div className="card" role="figure">
                <h3>{quote}</h3>
                <p>- {author}</p>
            </div>
        </>
    )

}

export default JokeCard