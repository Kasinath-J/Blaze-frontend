import {ReadmoreforSkills} from "./utils";
import '../portfolio.css'

export function Skills(props) {

    if(props.skills===null || props.skills.length===0)
        return;
    else{
        return(
            <div id="portfolioSkills" className="shadow" style={{backgroundColor:props.bgcolor,color:"white",borderRadius:"6px",padding:"1.5rem" }}>
                <p className="h4 mb-3" >Skills </p>
                <ReadmoreforSkills content={props.skills} maxDisplay={12} textColor="white" />                
            </div>
        );
    }
}


