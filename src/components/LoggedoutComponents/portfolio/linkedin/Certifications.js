import Card from "react-bootstrap/Card";
import '../portfolio.css'
import {Carousel} from "./utils"

export function CertCard(props) {

    var ret_val = <Card id="portfolioCertificationCard" className="darkshadow" style={{ backgroundColor:props.bgcolor,color:"white",border:"none",marginBottom:"1rem"}}>
    <Card.Body>
        <p className="h5">{props.cert.name}</p>
        <p >
        {props.cert.authority!=null&&(props.cert.authority)}  
        <br />
        {props.cert.period!=null&&(props.cert.period)}
        </p>
        {
            props.cert.licenseNumber!=null&&
            (<small class="text-muted">License No. : {props.cert.licenseNumber}</small>)
        }
    </Card.Body>
    </Card>
    if(props.cert.url!=null)
    {
        return(
            <a href={props.cert.url} target="blank" style={{textDecoration:"None"}}>
                {ret_val}
            </a>
        );
    }
    else{
        return ret_val;
    }
}

export function Certifications(props) {
  if (props.certifications == null || props.certifications.length === 0) return;
  else {
    return (
      <div id="portfolioExperience" className="subLinkedinContainer">
        <div className="mb-4" >
          <span className="h4">Certifications</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view certification, if present</span>
        </div>
        <Carousel data={
            props.certifications.map((cert,index)=>{
              return(
                <CertCard key={index} cert={cert} bgcolor={props.bgcolor}/>
              );
            })
          }
        />
      </div>
    );
  }
}


