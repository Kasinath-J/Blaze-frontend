import React,{ useState } from "react";
import { Card,Modal } from "react-bootstrap";
import '../portfolio.css'
import {Carousel,restrict_display} from "./utils"

function ProjectModal(props) {
  return (
    <Modal id="portfolioProjectCard" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>  
        {
          props.project.title&&
          (<Modal.Title >
            {props.project.title}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
        
      {props.project.url&&
      (
        <p>Link : 
          <a href={props.project.url} target="blank"> {props.project.url}</a>
        </p>
      )}

      {props.project.period&&
      (
        <p>Period : 
          {props.project.period}
        </p>
      )}

      {props.project.description&&
      (
        <p>
          {props.project.description}
        </p>
      )}

      {props.project.members&&
      (
        <div>
            Members : 
            {
                props.project.members.map((member,index)=>{
                    return(
                            <li key={index}>{member}</li>
                        );
                })
            }
        </div>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function ProjectCard(props) {

  const [modalShow, setModalShow] = useState(false);
  const {actual_display,total_count} = restrict_display(props.project.description,props.display_count)

  return (<div id="portfolioProjectsCard" style={{color: "white",borderRadius: "6px",paddingBottom: "1rem",}}>      
      <button  className="darkshadow" onClick={() => setModalShow(true)} style={{border:"None",margin:"0",padding:"0"}} >
        <Card style={{border:"None",backgroundColor: props.bgcolor,color:"white",display:"flex",flexDirection:"column",justifyContent:"space-evenly", textAlign:"left",padding:"4%"}}>
        <Card.Header>
            <p className="h6 my-0">
              {props.project.title!==null&&(props.project.title)}
            </p>
        </Card.Header>
          <Card.Body>           
            {
              props.project.description!==null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <ProjectModal        
                project = {props.project}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

export function Projects(props) {
  if (props.projects === null || props.projects.length===0) return;
  else {
    return (
      <div id="portfolioProjects" className="subLinkedinContainer">
        <div className="mb-4" >
          <span className="h4">Projects</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        {
          (props.projects.length === 1) ? 
          (<ProjectCard project={props.projects[0]} bgcolor={props.bgcolor} display_count={25}/>) 
          :
          (
            <Carousel data={
                props.projects.map((project,index)=>{
                  return(
                    <ProjectCard key={index} project={project} bgcolor={props.bgcolor} display_count={props.display_count}/>
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
