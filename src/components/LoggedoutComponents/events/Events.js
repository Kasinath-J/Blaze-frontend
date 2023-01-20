import React from 'react';
import {Link} from 'react-scroll'
import { Loading } from '../../Utils/Loading';
import {DateEvent} from './subComponents/DateEvent';
import {MainCarousel} from "./subComponents/MainCarousel";
import { axiosInstance } from '../../axios/loggedoutAxios';

function Scrollbar(props){
    var idList = [];
    for(var event of props.event)
    {
        if(idList[idList.length-1]!==event.detail_date.substring(4,7)+event.detail_date.substring(11,15))
            idList.push(event.detail_date.substring(4,7)+event.detail_date.substring(11,15));
    }
    
    var fillScrollbar = idList.map((id,index)=>{
        // function MouseOver(event) {
        //     event.target.innerHTML = id;
        // }
        // function MouseOut(event){
        //     event.target.innerHTML="";
        // }
        return(
        <Link key={index} to={id} spy={true} offset={-80} style={{margin:"0"}}>
            <button style={{border:"none",backgroundColor:"rgba(0,0,0,0",padding:"0.5rem",margin:"0"}}>
                {/* <div style={{height:"7px", width:"7px", backgroundColor:"black"}} onMouseOver={MouseOver} onMouseOut={MouseOut}></div> */}
                <div style={{height:"0.5rem", width:"0.5rem", backgroundColor:"black",float:"right",borderRadius:"0.5rem"}}></div>
                <p style={{ color:"black",textShadow:" 2px 2px white",marginBottom:"0"}}>{id.substring(0,3)+"_"+id.substring(5,7)}</p>
            </button>
        </Link>
    
        );
    })

    return(
        <div id="eventScrollbar" style={{display:"flex",flexDirection:"column",justifyContent:"space-around",width:"60px",position:"sticky", borderRight:"0.5px black solid",top:"60px",float:"right",zIndex:"100", height:window.innerHeight*0.85}}>
            {fillScrollbar} 
        </div>
    );
}

export class Events extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            events:null,
            DataisLoaded:false,
        }
    }

    componentDidMount(){
        axiosInstance.get(`api/events/`)
        .then(resp => resp.data)
        .then(resp => this.setState({
            events:resp,
            DataisLoaded:true,
        }))
    }

    render()
    {
        if(this.state.DataisLoaded===false)
            return <Loading/>;


        var photos_for_carousel = [];
        var i=0;
        while( i<this.state.events.length && photos_for_carousel.length!==5)  //total 5 images for main carousel
        {
            if(this.state.events[i].imageUrl1!==null)
                photos_for_carousel.push({"url":this.state.events[i].imageUrl1,"name":this.state.events[i].name})
            i++;
        }

        return(
            <div className="container" style={{marginBottom:"6%"}}>
                
                <section id="eventsMaincarousel">
                    {
                        photos_for_carousel.length!==0 && <MainCarousel img={photos_for_carousel}/>
                    }
                </section>


                <section id="eventsGallery">
                    <div className='display-1' id="eventsTitle" style={{"marginTop":"4%"}}>Events</div>
                    <Scrollbar event={this.state.events} /> 
                    {
                        this.state.events.map((event,index)=>{
                        return(
                                <DateEvent event={event} key={index}/>
                            );
                        })
                    }

                </section>                
            </div>
        )
    }
}



