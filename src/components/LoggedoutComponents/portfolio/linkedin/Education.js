import Card from "react-bootstrap/Card";
import '../portfolio.css'
import {Carousel} from "./utils"

function EduCard(props) {
  return (
    <Card id="portfolioEducationCard" className="darkshadow" style={{ backgroundColor:props.bgcolor,color:"white",border:"none",marginBottom:"1rem"}}>
      <Card.Body>
        <p className="h5">{props.edu.schoolName}</p>
        <div >
          {
            props.edu.degreeName_fieldOfStudy_grade!=null
            &&
            props.edu.degreeName_fieldOfStudy_grade.split('-').map(
              (d)=><p>{d}</p>
            )
          }  
        </div>
      </Card.Body>
    </Card>
  );
}

export function Education(props) {
  if (props.educations == null || props.educations.length===0) return;
  else {
    return (
      <div id="portfolioEducation" className="subLinkedinContainer">
        <div className="h4 mb-4">Education</div>
        <Carousel data={
            props.educations.map((edu,index)=>{
              return(
                <EduCard key={index} edu={edu} bgcolor={props.bgcolor}/>
              );
            })
          }/>
        
      </div>
    );
  }
}









