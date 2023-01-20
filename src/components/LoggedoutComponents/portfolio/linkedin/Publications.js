import React,{ useState } from "react";
import { Card,Modal } from "react-bootstrap";
import '../portfolio.css'
import {Carousel,restrict_display} from "./utils"

function PublicationModal(props) {
  return (
    <Modal id="portfolioPublicatonsCard" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>  
        {
          props.publication.name&&
          (<Modal.Title >
            {props.publication.name}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
      {
        props.publication.publisher&&
        (<div>
            Issued by : 
                {props.publication.publisher}
        </div>)
      }

      {
        props.publication.issueDate&&
        (<Modal.Title class="text-muted">
          {props.publication.issueDate}
        </Modal.Title>)
      }

      {props.publication.url&&
        (<p>Link : 
            <a href={props.publication.url} target="blank"> {props.publication.url}</a>
         </p>)
      }
        
      {props.publication.description&&
      (
        <p>
          {props.publication.description}
        </p>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function PublicationCard(props) {

  const [modalShow, setModalShow] = useState(false);
  const {actual_display,total_count} = restrict_display(props.publication.description,props.display_count)

  return (
    <div id="portfolioPublicationsCard" style={{color: "white",borderRadius: "6px",paddingBottom: "1rem",}}>      
      <button   className="darkshadow" onClick={() => setModalShow(true)} style={{border:"None",margin:"0",padding:"0"}} >
        <Card style={{border:"None",backgroundColor: props.bgcolor,color:"white",display:"flex",flexDirection:"column",justifyContent:"space-evenly", textAlign:"left",padding:"4%"}}>
          <Card.Body>
            <p className="h6 my-0">
              {props.publication.name!==null&&(props.publication.name)}
            </p>
            <p style={{fontWeight:100}}>
              {props.publication.publisher!==null&&(props.publication.publisher.split(" ").slice(0,6).join(" "))}
              {props.publication.issueDate!==null&&( " (" +  props.publication.issueDate + ") ")}
            </p>

            {
              props.publication.description!==null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <PublicationModal        
                publication = {props.publication}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

export function Publications(props) {
  if (props.publications === null || props.publications.length===0) return;
  else {
    return (
      <div id="portfolioPublications" className="subLinkedinContainer">
        <div className="mb-4" >
          <span className="h4">Publications</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        {
          (props.publications.length === 1) ? 
          (<PublicationCard publication={props.publications[0]} bgcolor={props.bgcolor} display_count={25}/>) 
          :
          (
            <Carousel data={
              props.publications.map((publication)=>{
                  return(
                    <PublicationCard publication={publication} bgcolor={props.bgcolor} display_count={props.display_count}/>
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

