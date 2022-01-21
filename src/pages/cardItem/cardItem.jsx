import IMG  from './abstract1.jpeg'

const CardItem = ({ text }) => {
  return (
    <div className="card" style={style.card}>
      <img className="card-img-top" src={IMG} alt="Card image cap" style={style.img}/>
      <div className="card-body">
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

const style = {
  card: {
    width: '256px',
    borderRadius: 3,
    minHeight:' 80px',
    boxShadow: '0 1px 0 #091e4240',
    border: 'none',
    marginBottom: '10px',
  },
  img: {
    width: '256px',
    height: '153px',
    objectFit: 'fill',
  }
};

export default CardItem;
