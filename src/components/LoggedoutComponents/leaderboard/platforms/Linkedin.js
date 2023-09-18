import { useState, useEffect } from 'react';
import { GenericGraph } from '../../../Utils/GenericGraph';
import { Loading } from '../../../Utils/Loading';
import {UserTable} from '../UserTable';
import {Filter} from '../filter/Filter';
import { Counter } from '../../../Utils/Counter';
import { axiosInstance } from "../../../axios/loggedoutAxios";
import { graph_height, rearrangeTable, axisX, axisY, blackToolTip } from './utils';
import './platforms.css'


export function LinkedinDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(localStorage.getItem("search"))       //used for filtering data of diiferent members

    useEffect(() => {
        axiosInstance.get(`platforms/linkedin/`)
            .then(resp => resp.data)
            .then((resp) => {
                setData(resp)
                setYear(resp)
            })
        }, [])

    if(data===null)
    {
        return <div className="col-lg-6 col-sm-8 " >
                    <Loading/>
                </div>
    }

    const options_1 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Total Connections" ,
            fontFamily: "verdana",   
        },
        axisY: axisY({interval: 150,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),
        colorSet:"blackToRed",	
        data: [
            {        
                type: "column",  
                dataPoints : year.filter(user=>Number.isInteger(user.connectionsCount))
                            .sort((a,b)=>{return b.connectionsCount - a.connectionsCount})
                            .map((user)=>{
                                    if(user.email===search)
                                        return {y:user.connectionsCount, label:user.name, color:"black"};
                                    return {y:user.connectionsCount, label:user.name};
                            })

            }
        ]
    }

    
    
    var Experience = year.filter(user => {
                                    if (search===null)
                                        return Array.isArray(user.experience)

                                    return user.email===search
                                })
                    .reduce((accumulator,user)=> accumulator + user['experience'].length,0)

    var Certifications = year.filter(user => {
                        if (search===null)
                            return Array.isArray(user.certifications)

                        return user.email===search
                    })
                    .reduce((accumulator,user)=> accumulator + user['certifications'].length,0)

    var Projects = year.filter(user => {
                        if (search===null)
                            return Array.isArray(user.projects)

                        return user.email===search
                    })
                    .reduce((accumulator,user)=> accumulator + user['projects'].length,0)

    var Publications = year.filter(user => {
                        if (search===null)
                            return Array.isArray(user.publications)

                        return user.email===search
                    })
                    .reduce((accumulator,user)=> accumulator + user['publications'].length,0)



    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Certifications" ,
            fontFamily: "verdana",   
        },
        axisY: axisY({interval: 4,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),
        
        data: [
            {        
                color: search===null?"#e5b3fe":"#f7e8ff",
                type: "splineArea",  
                dataPoints : year.filter(user => Array.isArray(user.certifications))
                                .sort((a,b)=>{return b.certifications.length - a.certifications.length})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {y:user.certifications.length, label:user.name,color:"#e5b3fe",markerSize:15};

                                    return {y:user.certifications.length, label:user.name};
                                })
            },
        ]
    }

    var table = year.filter(user=>typeof user.linkedin_score == "number")
                    .map((user)=>{return {name:user.name,
                        value: Math.round(user.linkedin_score),email:user.email}
                    })
                    .sort(function(a,b) {
                        return b.value - a.value;
                    }); 

    table = rearrangeTable(table,search);

    var subbox_styles={
           backgroundColor:"white", 
           borderRadius:"5px",
           padding:"3%",
           margin:"2%",
           textAlign:"center",
    };

    var subvalue_style={
        fontSize:"2.5rem",
    }

    return(
    <>
        <div className="col-lg-6 col-sm-8 graphContainer" id="LeaderboardLinkedinGraph">
            <Filter data = {data} setYear = {setYear} year={year} setSearch={setSearch} search={search} />
            
            <div className='graphs'><GenericGraph options={options_3}/></div>

            <section id="LinkedinBoxDetails">
                <div style={{display:"flex",flexWrap: "wrap",justifyContent:"space-evenly"}}>
                    <div className="sub_box_details" id="total_experience" style={subbox_styles}>
                        <div className="sub_value" style={subvalue_style}>
                            <Counter value={Experience} duration={2.5} year={year} search={search}/>
                        </div>
                        <div className="explanation">Experience</div>
                    </div>
                    <div className="sub_box_details" id="total_projects" style={subbox_styles}>
                        <div className="sub_value" style={subvalue_style}>
                            <Counter value={Projects} duration={2.5} year={year} search={search}/>
                        </div>
                        <div className="explanation">Projects</div>
                    </div>                    
                    <div className="sub_box_details" id="total_publication" style={subbox_styles}>
                        <div className="sub_value" style={subvalue_style}>
                            <Counter value={Publications} duration={2.5} year={year} search={search}/>
                        </div>
                        <div className="explanation">Publication</div>
                    </div>
                    <div className="sub_box_details" id="total_certifications" style={subbox_styles}>
                        <div className="sub_value" style={subvalue_style}>
                            <Counter value={Certifications} duration={2.5} year={year} search={search}/>
                        </div>
                        <div className="explanation">Certification</div>
                    </div>
                    
                </div>
            </section>

            
        </div>

        <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4 userContainer" id="LeaderboardLeetcodeUser">
            <UserTable user_values={table} bgcolor="#F1F5F7" total={year.length}/>
        </div>
    </>
    );
}




