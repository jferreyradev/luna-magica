
const Card = ({title, desc, img}) => {
    return (
        <div>
            <div className="card text-black" >
                <img src={img} className="text-info bg-dark w-75 card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                    </div>
            </div>
        </div>
    )
}

export default Card;