import React,{ useState } from "react";
import InfiniteCarousel from "react-leaf-carousel";

export function Readmore(props) {
    const [visDisplay, setVisDisplay] = useState(props.maxDisplay);
    var total_count = props.content.length;
    var rm_style = {
        color:"white",
        margin:"0px"
    }

    if (total_count <= props.maxDisplay) 
        return (
            <p style={rm_style}>
                {props.content.join(" ")}
            </p>
        );
    else {
      return (
        <p style={rm_style}>
          {props.content.slice(0, visDisplay).join(" ")}
          <button
            onClick={() => {
              if(visDisplay===props.maxDisplay)
                setVisDisplay(total_count);
              else
              setVisDisplay(props.maxDisplay);
            }}
            style={{ backgroundColor: "rgba(1,1,1,0)",border:"None", color: "white" }}
          >
           <strong> {visDisplay === props.maxDisplay ? "Read more ..." : "Read Less ..."} </strong>
          </button>
        </p>
      );
    }
}

var window_innerwidth = window.innerWidth;
export var slides = 1;
if (window_innerwidth >= 1400) {
  //xxl
  slides = 2;
} else if (window_innerwidth >= 1200) {
  //xl
  slides = 2;
} else if (window_innerwidth >= 992) {
  //lg
  slides = 1;
} else if (window_innerwidth >= 768) {
  //md
  slides = 2;
} else if (window_innerwidth >= 576) {
  //sm
  slides = 3;
} else if (window_innerwidth >= 420) {
  //xs - 1
  slides = 2;
} //xs-2
else {
  slides = 1;
}

export function Carousel(props)
{
  return <InfiniteCarousel
          paging={true}  
          lazyLoad={true}
          showSides={true}
          sidesOpacity={1}
          sideSize={0.1}
          slidesSpacing={3}
          pauseOnHover={true}
          slidesToScroll={slides}
          slidesToShow={slides}
          animationDuration={1000}
          cycleInterval={5000}
          autoCycle={true}
        >
          {props.data}
        </InfiniteCarousel>

}

export function restrict_display(description,display_count){
  var total_count=0;
  if(description!==null)
  {
    total_count = description.split(" ").length;
    if(total_count<display_count)
    {
      return {actual_display:description,total_count}
    }
    else{
      description = description.split(" ").slice(0,display_count).join(" ");
      return {actual_display:description,total_count}
    }
  }
  return {description:null,total_count:0};
}

