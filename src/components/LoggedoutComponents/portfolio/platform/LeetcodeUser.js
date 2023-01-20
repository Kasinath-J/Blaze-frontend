import { GenericGraph } from "../../../Utils/GenericGraph";


function Level(props){
    return(
        <div className='mt-1' style={{backgroundColor:"white", padding:"0.25rem 0.5rem 0.25rem 0",color:"black"}}>
                <div style={{fontSize:"0.80rem"}}>
                    <span className="text-muted">{props.level}</span>
                    <span className='float-end'>
                        <strong >{props.solved}</strong>
                        <span className="text-muted">/{props.total}</span>
                    </span>
                </div>
                <div>
                    <div className='my-2' style={{width:"95%",height:"3px",backgroundColor:props.backbg}}>
                        <div style={{width:(props.solved/props.total*100).toString(10)+"%",height:"5px",backgroundColor:props.bg,borderRadius:"3px",transform: "translate(0,-1px)"}}></div>
                    </div>
                </div>
            </div>
    );
}

export function LeetcodeUser(props){
    var options_for_problem_solved = {
        height:140,
        subtitles: [{
            text: (props.data.no_easy_qns+props.data.no_medium_qns+props.data.no_difficult_qns).toString(10) + ' Solved',
            verticalAlign: "center",
            fontSize: 11,
            fontColor: "black",
            fontFamily:"verdana",
            dockInsidePlotArea: true
        }],
        data: [
        {
         startAngle: 0,
         type: "doughnut",
         radius: "100%", 
         innerRadius: "85%",
         dataPoints: [
            {  y: props.data.no_easy_qns+props.data.no_medium_qns+props.data.no_difficult_qns, 
                indexLabel: "Solved", color: "orange" },

            {  y: props.data.total_easy+props.data.total_medium+props.data.total_hard, indexLabel: "Total" ,color: "#9da49e"},
         ]
       }
       ]
     }

     var options_for_languages_used = null;
     if(props.data.languages!=null)
     {
        options_for_languages_used={
            height:140,
            data: [
            {       
                type: "pie",
                showInLegend: true,
                indexLabelPlacement: "inside",
                toolTipContent: "{indexLabel} - {y}",
                legendText: "{indexLabel}",
                dataPoints: props.data.languages.map((lang)=>{
                    return(
                        {
                            y:lang.problemsSolved,
                            indexLabel:lang.languageName
                        }
                    );
                }),
            }
            ]
        }
     }
    
    var skills = null;
    if(props.data.skills_advanced) 
    {
        skills = [...props.data.skills_advanced]
    }
    if(props.data.skill_intermediate) 
    {
        skills = [...skills,...props.data.skill_intermediate]
    }

    if(skills)
    {
        skills = skills.sort(function(first, second) {
            return second.problemsSolved - first.problemsSolved;
            }).slice(0,5);
    }
    

    return(
        <div id="portfolioLeetcode">
            <div style={{fontSize:"1.75rem"}}>Leetcode</div>
            <div className='row shadow' style={{borderRadius:"6px",marginTop:"1%",padding:"5px",backgroundColor:"white"}}>
                <div className="col-5">
                    <GenericGraph options={options_for_problem_solved} />
                </div>
                <div className="col-7">
                    <Level level="Easy" solved={props.data.no_easy_qns} total={props.data.total_easy} backbg="#c9f5d5" bg="#3be825" />
                    <Level level="Medium" solved={props.data.no_medium_qns} total={props.data.total_medium} backbg="#fcf1c5" bg="#f5d13d" />
                    <Level level="Hard" solved={props.data.no_difficult_qns} total={props.data.total_hard} backbg="#f6b9b9" bg="#e21414" />
                </div>
            </div>
            <div>
                {
                    props.data.badges&&props.data.badges.length!==0&&(
                        <div>
                            <p className='mt-2'>Badges earned : </p>
                            <div className='mt-2' style={{display:"flex",justifyContent:"space-around"}}>
                                {
                                    props.data.badges.map((badge,index)=>{
                                        return(
                                            <div key={index}>
                                                <img src={badge.icon} alt="icon" height="80px"/>
                                                <p style={{textAlign:"center"}}>{badge.displayName}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                
            </div>
            
            <div>
                    <div className='row'>
                    {   props.data.languages&&props.data.languages.length!==0 &&<div className="col-5" >
                            <p className='mt-2'>Langs used : </p>
                            <GenericGraph options={options_for_languages_used} />
                        </div>
                    }
                    {
                        skills&&skills.length!==0&&<div className="col-7">
                            <p className='mt-2'>Major skills : </p>
                            {
                                skills.map(
                                    (skill,index)=>
                                    {
                                        return <li key={index} style={{fontSize:"0.95rem"}}>{skill.tagName}</li>
                                    }
                                )
                            }
                        </div>
                    }
                    </div>
                </div>
            
            
            
        </div>
    );
}
