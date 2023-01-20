import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import "./dateevent.css";

var cardheight="200px";
var window_innerwidth = window.innerWidth;
if(window_innerwidth<425)
  cardheight="160px";

function FullImage(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="imgmodal"  
      centered    
      className="eventFullImage"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body 
        style={{backgroundColor: "rgba(10, 10, 10, 0.5)"}}
      >
        <div style={{display:"flex",justifyContent:"center"}}>
          <img src={props.src} alt="" height={window.innerWidth*0.4} objectFit="contain"/>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function DisplayCard(props) {

  const [modalShow, setModalShow] = useState(false);

  if(props.src===null || props.src==="")
      return;

  return (
    <>
    <button style={{border:"None",margin:"5px 2px",padding:"0",borderRadius:"5px",height:cardheight}} onClick={() => setModalShow(true)}>
      <Card style={{display:"inline-block"}}>
        <Card.Img  src={props.src} style={{objectFit:"cover",height:cardheight}}/>
      </Card>
    </button>

    <FullImage
        className="eventImage"
        show={modalShow}
        onHide={() => setModalShow(false)}
        src={props.src}
      />

    </>
  );
}

function DetailModal(props) {
  return (
    <Modal
      className="eventModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.event.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.event.detail_date}</h4>
        {props.event.description}
        {
          (props.event.winner1!==null&&props.event.winner1!==""&&(
            <div>
              <h5>Winners</h5>
              <ol>
                {props.event.winner1&&<li>{props.event.winner1}</li>}
                {props.event.winner2&&<li>{props.event.winner2}</li>}
                {props.event.winner3&&<li>{props.event.winner3}</li>}
                {props.event.winner4&&<li>{props.event.winner4}</li>}
                {props.event.winner5&&<li>{props.event.winner5}</li>}
              </ol>
            </div>
          ))
        }
      </Modal.Body>
    </Modal>
  );
}

export function DateEvent(props){
  const [modalShow, setModalShow] = useState(false);
    return(
        <div>
            <p className='h6 event_date' id={props.event.detail_date.substring(4,7)+props.event.detail_date.substring(11,15)} 
                style={{"marginTop":"5%"}}>
                {props.event.detail_date.substr(0,15)}
            </p>
            <p className='h4 event_name'>{props.event.name}</p> 
            <br/>
            <div style={{display:"flex",flexWrap: "wrap","marginBottom":"2%"}}>
                 <DisplayCard src={props.event.imageUrl1}  />
                 <DisplayCard src={props.event.imageUrl2}  />
                 <DisplayCard src={props.event.imageUrl3}  />
                 <DisplayCard src={props.event.imageUrl4}  />
                 <DisplayCard src={props.event.imageUrl5}  />

                  {
                    (props.event.description!==null&&props.event.description!=="")&&(
                      <div className='eventDescription' style={{margin:"5px 2px",display:"inline-block",width:"200px", height:cardheight}}>                    
                        <button onClick={() => setModalShow(true)} style={{width:"100%", height:"100%", padding:"0", border:"None", color:"black", textAlign:"left"}}>
                          <Card style={{height:"100%",width:"100%", fontSize:"1rem"}}>  
                            <Card.Body>
                              <h6>{props.event.name}</h6>
                              <Card.Text style={{fontSize:"1rem"}}>{props.event.description.slice(0,Math.min(130-props.event.name.length,Math.round(window.innerWidth/4)-props.event.name.length))} <strong> . . .</strong></Card.Text>
                            </Card.Body>
                          </Card>
                        </button>

                        <DetailModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          event = {props.event}
                        />
                      </div>
                    )
                  } 
                  
                  {
                    (props.event.winner1!==null&&props.event.winner1!=="")&&(
                      <Card className='eventWinners' style={{margin:"5px 2px",width:"200px",fontSize:"1rem"}}>  
                          <Card.Body>      
                          <p className='h6'>Winners</p>                      
                            <ol style={{fontSize:"1rem"}}>
                              {props.event.winner1&&<li>{props.event.winner1}</li>}
                              {props.event.winner2&&<li>{props.event.winner2}</li>}
                              {props.event.winner3&&<li>{props.event.winner3}</li>}
                              {props.event.winner4&&<li>{props.event.winner4}</li>}
                              {props.event.winner5&&<li>{props.event.winner5}</li>}
                            </ol>                          
                          </Card.Body>
                      </Card>
                    )
                  }
             </div> 
             <hr/>
        </div>    
    );
}

