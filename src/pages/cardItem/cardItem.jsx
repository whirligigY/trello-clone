import IMG from './abstract1.jpeg';

const CardItem = ({ text }) => {
  function handleOver(e) {
    e.target.style.opacity = '0.7';
  }

  function handleOut(e) {
    e.target.style.opacity = '0';
  }
  return (
    <div className="card" style={style.card}>
      <div style={style.bdClipboard}>
        <i
          className="bi bi-pencil btn-secondary"
          style={style.btnClipboard}
          onMouseOver={(e) => handleOver(e)}
          onMouseOut={(e) => handleOut(e)}
        ></i>
      </div>
      <img
        className="card-img-top"
        src={IMG}
        alt="Card image cap"
        style={style.img}
      />

      <div className="card-body">
        <p className="card-text">{text}</p>
        <a href="#" className="card-link btn btn-secondary p-1">
          <i className="bi bi-clock-fill"></i>
          <span style={style.ml}>23 янв</span>
        </a>
        <a href="#" className="card-link" style={style.descrip}>
          <i className="bi bi-justify-left btn-light"></i>
        </a>
        <a href="#" className="card-link">
          <i className="bi bi-link-45deg btn-light"></i>
        </a>
        <a href="#" className="card-link" style={style.link}>
          <i className="bi bi-check2-square btn-light"></i>
          <span className="btn-light" style={style.ml}>
            2/2
          </span>
        </a>
      </div>
    </div>
  );
};

const style = {
  card: {
    width: '256px',
    borderRadius: 3,
    minHeight: ' 80px',
    boxShadow: '0 1px 0 #091e4240',
    border: 'none',
    marginBottom: '10px',
  },
  img: {
    width: '256px',
    height: '153px',
    objectFit: 'fill',
  },
  bdClipboard: {
    position: 'relative',
    float: 'right',
  },
  btnClipboard: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: '10',
    display: 'block',
    padding: '0.25rem 0.5rem',
    color: '#818a91',
    cursor: 'pointer',
    backgroundColor: 'lightgrey',
    border: 0,
    borderRadius: '0.25rem',
    opacity: 0,
    '&:hover': {
      backgroundColor: 'white',
      opacity: 1,
    },
  },
  link: {
    textDecoration: 'none',
  },
  ml: {
    marginLeft: '10px',
  },
};

export default CardItem;

//Dots : <i className="bi bi-three-dots"></i>
