
const Card = ({ header, title, desc, img }) => {
    return (
        <div className="card p-2 text-info bg-transparent " >
            <div className="card-header">
                <h3>{ header }</h3>
            </div>
            <img src={img} className="text-info w-75" alt="..." />
            <div className="card-body  p-2 ">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
            </div>
        </div>
    )
}

export default Card;