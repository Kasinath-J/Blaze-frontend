import React,{ useState } from "react";
import { Card,Modal } from "react-bootstrap";
import '../portfolio.css'
import {Carousel,restrict_display} from "./utils"

function HonorModal(props) {
  return (
    <Modal id="portfolioHonorCard" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>  
        {
          props.honor.title&&
          (<Modal.Title >
            {props.honor.title}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
      {
        props.honor.issuer&&
        (<div>
            Issued by : 
            <span className="h5">
                {props.honor.issuer}
            </span>
        </div>)
      }

      {
        props.honor.issueDate&&
        (<Modal.Title class="text-muted">
          {props.honor.issueDate}
        </Modal.Title>)
      }
        
      {props.honor.description&&
      (
        <p>
          {props.honor.description}
        </p>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function HonorCard(props) {

  const [modalShow, setModalShow] = useState(false);
  const {actual_display,total_count} = restrict_display(props.honor.description,props.display_count)

  return (
    <div id="portfolioHonorCard" style={{color: "white",borderRadius: "6px",paddingBottom: "1rem",}}>      
      <button  className="darkshadow" onClick={() => setModalShow(true)} style={{border:"None",margin:"0",padding:"0"}} >
        <Card style={{border:"None",backgroundColor: props.bgcolor,color:"white",display:"flex",flexDirection:"column",justifyContent:"space-evenly", textAlign:"left",padding:"4%"}}>
          <Card.Body>
            <p className="h6 my-0">
              {props.honor.title!=null&&(props.honor.title)}
            </p>
            <p >
              {props.honor.issuer!=null&&(props.honor.issuer)}
              {props.honor.issueDate!=null&&( " (" +  props.honor.issueDate + ") ")}
            </p>

            {
              props.honor.description!=null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <HonorModal        
                honor = {props.honor}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

export function Honors(props) {
  if (props.honors == null || props.honors.length===0) return;
  else {
    return (
      <div id="portfolioHonors" className="subLinkedinContainer">
        <div className="mb-4" >
          <span className="h4">Honors</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        {
          (props.honors.length === 1) ? 
          (<HonorCard honor={props.honors[0]} bgcolor={props.bgcolor} display_count={25}/>) 
          :
          (
            <Carousel data={
              props.honors.map((honor)=>{
                return(
                  <HonorCard honor={honor} bgcolor={props.bgcolor} display_count={props.display_count}/>
                  );
                })
              }
            />
          )
        }
        
      </div>
    );
  }
}

