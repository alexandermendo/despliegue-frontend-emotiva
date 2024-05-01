import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSliderData, url } from '../../../../../../../common/utils';
import './slider.css';

export const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => { fetchSliderData(setSliderData, setError); }, []);

  return (
    <div className="slider-test">
      {sliderData.length > 0 ? (
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            {sliderData.map((slide, index) => (
              <Link to={`/news/${slide._id}`} key={index} className="slider-card">
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={`${url}/${slide.image}`} className="img-sli d-block w-100" alt={slide.title} />
                  <div className="carousel-caption">
                    <div className="text-slider">
                      <h3>{slide.title}</h3>
                      <p>{slide.subtitle}</p>
                      <h1 className="text-sl">Haz clic sobre la imágen para ver más información</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <div>{error ? `Error: ${error}` : 'Cargando datos...'}</div>
      )}
    </div>
  );
};
