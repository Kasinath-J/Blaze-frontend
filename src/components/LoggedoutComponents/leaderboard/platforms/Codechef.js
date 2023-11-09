import { useState, useEffect } from 'react';
import { GenericGraph } from '../../../Utils/GenericGraph';
import { Loading } from '../../../Utils/Loading';
import {UserTable} from '../UserTable';
import {Filter} from '../filter/Filter';
import { axiosInstance } from "../../../axios/loggedoutAxios";
import { graph_height, rearrangeTable, axisX, axisY, blackToolTip } from './utils';
import './platforms.css'


export function CodechefDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(localStorage.getItem("search"))       //used for filtering data of diiferent members

    useEffect(() => {
        axiosInstance.get(`platforms/codechef/`)
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
            text: "Total Problems Solved" ,
            fontFamily: "verdana",   
        },
        axisY: axisY({interval: 75,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),

        colorSet:"blackToGreen",
        data: [
            {        
                type: "column",  
                dataPoints : year.filter(user=> typeof user.problems_solved == "number")
                                .sort((a,b)=>{return a.problems_solved - b.problems_solved})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {label:user.name, y:user.problems_solved,color:"black"};

                                    return {label:user.name, y:user.problems_solved};
                                })
            },
        ]
    }

    
    const options_2 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Contest Particpated" ,
            fontFamily: "verdana",   
        },
        axisY: axisY({interval: 5,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),
        data: [
            {        
                color: search===null?"#ffee93":"#fff7c9",
                type: "splineArea",  
                dataPoints: year.filter(user=> typeof user.contest_participated_count == "number")
                                .sort((a,b)=>{return b.contest_participated_count-a.contest_participated_count})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {label:user.name, y:user.contest_participated_count, color:"#e6d684", markerSize:15};

                                    return {label:user.name, y:user.contest_participated_count};
                                })
            },
        ]
    }

    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Badges won" ,
            fontFamily: "verdana",   
        },
        theme: "light2",
        data: [
            {        
                
                type: "doughnut",  
                dataPoints : year.filter(user=>Array.isArray(user.badges))
                                .map((user)=>{
                                    if(user.email===search)
                                        return {y:user.badges.length, label:user.name, exploded:true};

                                    return {y:user.badges.length, label:user.name};
                                })

            }
        ]
    }

    
    var table = year.filter(user=>typeof user.codechef_score ==="number" && user.codechef_score!==0)
                    .map((user)=>{return {name:user.name,
                        value: Math.round(user.codechef_score),email:user.email}
                    })
                    .sort(function(a,b) {
                        return a.value - b.value;
                    }); 

    table = rearrangeTable(table,search);     

    return(
        <>

            <div className="col-lg-6 col-sm-8 graphContainer" id="LeaderboardCodechefGraph">
                <div>
                    <Filter data = {data} setYear = {setYear} year={year} setSearch={setSearch} search={search} />
                    <div className='graphs'><GenericGraph options={options_1} /></div>
                    <div className='graphs'><GenericGraph options={options_2}/></div>
                    <div className='graphs'><GenericGraph options={options_3}/></div>
                </div>
            </div>

            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4 userContainer" id="LeaderboardCodechefUser">
                <UserTable user_values={table} bgcolor="#F1F5F7" total={year.length} />
            </div>
        </>
    );
}

