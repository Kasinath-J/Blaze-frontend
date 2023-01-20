import React,{ useState } from "react";
import { Card, Modal } from "react-bootstrap";
import '../portfolio.css'
import {Carousel,restrict_display} from "./utils"

function ExpModal(props) {
  return (
    <Modal id="portfolioExperienceCard" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>  
        {
          props.exp.companyName&&
          (<Modal.Title >
            {props.exp.companyName}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
      {
        props.exp.title&&
        (<Modal.Title id="contained-modal-title-vcenter">
          {props.exp.title}
        </Modal.Title>)
      }

      {
        props.exp.period&&
        (<Modal.Title class="text-muted">
          {props.exp.period}
        </Modal.Title>)
      }
        
      {props.exp.description&&
      (
        <p>
          {props.exp.description}
        </p>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function ExpCard(props) {

  const [modalShow, setModalShow] = useState(false);
  const {actual_display,total_count} = restrict_display(props.exp.description,props.display_count)

  return (
    <div id="portfolioExperienceCard" style={{color: "white",borderRadius: "6px",paddingBottom: "1rem",}}>      
      <button  className="darkshadow" onClick={() => setModalShow(true)} style={{border:"None",margin:"0",padding:"0"}} >

        <Card style={{border:"None",backgroundColor: props.bgcolor,color:"white",display:"flex",flexDirection:"column",justifyContent:"space-evenly", textAlign:"left",padding:"4%"}}>
          <Card.Body>
            <p className="h6 my-0">
              {props.exp.title!=null&&(props.exp.title)}
            </p>
            <p >
              {props.exp.companyName!=null&&(props.exp.companyName)}
              {props.exp.period!=null&&( " (" +  props.exp.period + ") ")}
            </p>

            {
              props.exp.description!=null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <ExpModal        
                exp = {props.exp}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

export function Experience(props) {
  if (props.experiences === null || props.experiences.length===0) return;
  else {
    return (
      <div id="portfolioExperience" className="subLinkedinContainer">
        <div className="mb-4" >
          <span className="h4 mb-4">Experience</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>        
        {
          (props.experiences.length === 1) ? 
          (<ExpCard exp={props.experiences[0]} bgcolor={props.bgcolor} display_count={25}/>) 
          :
          (
            <Carousel data={
              props.experiences.map((exp,index)=>{
                return(
                  <ExpCard key={index} exp={exp} bgcolor={props.bgcolor} display_count={props.display_count}/>
                );
              })
            }/>
          )
        }
        
      </div>
    );
  }
}

