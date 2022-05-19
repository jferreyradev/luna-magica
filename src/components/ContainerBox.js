const ContainerBox = ({ title, text, imgpath }) => {
    return (
        <div className="card bg-dark text-info">
            <img src={imgpath} className="card-img opacity-25" alt="..." />
                <div className="card-img-overlay">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{text}</p>
                </div>
        </div>        
    )        
}

export default ContainerBox;