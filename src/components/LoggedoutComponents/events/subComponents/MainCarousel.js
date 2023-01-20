import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


export function MainCarousel(props) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  const mystyle={ 
          height:0.7*window.innerHeight,
          objectFit:"contain",
          transform:"scale(1.5)"
          // -ms-transform:"scale(1.5)"
          // -moz-transform:"scale(1.5)"
          // -webkit-transform:"scale(1.5)"
          // -o-transform:"scale(1.5)"
        }
          
  const outline = {textShadow:"-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000"}

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{backgroundColor:"black"}}>
      {(props.img.map((img,index)=>{
        return(
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img.url}
              style={mystyle}
              alt={img.name}
            />
            <Carousel.Caption>
              <h3 style={outline}>
                {img.name}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }))}
      
    </Carousel>
  );
}
