import { Readmore } from "./utils";
import '../portfolio.css'

export function About(props){
    if(props.about==null)
        return;
    else if(props.about!=null && props.about.split(" ").length<=6)
    {
        return(    
            <section id="portfolioAbout">
                <div className="shadow" style={{backgroundColor:props.bgcolor,color:"white",borderRadius:"6px",padding:"1.5rem"}}>
                <p className="h4">About</p>
                <p style={{margin:"0"}}>
                    {props.about}
                </p>
                </div>
            </section>
        );
    }
    else
    {
        return(    
            <section id="portfolioAbout">
                <div className="shadow" style={{backgroundColor:props.bgcolor,color:"white",borderRadius:"6px",padding:"1.5rem"}}>
                <p className="h4">About</p>
                <p style={{margin:"0"}}>
                    <Readmore maxDisplay={30} content={props.about.split(" ")} />
                </p>
                </div>
            </section>
        );
    }
}



