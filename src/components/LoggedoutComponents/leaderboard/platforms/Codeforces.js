import { useState, useEffect } from 'react';
import { GenericGraph } from '../../../Utils/GenericGraph';
import { Loading } from '../../../Utils/Loading';
import {UserTable} from '../UserTable';
import {Filter} from '../filter/Filter';
import { axiosInstance } from "../../../axios/loggedoutAxios";
import { graph_height, rearrangeTable, axisX, axisY, blackToolTip } from './utils';
import './platforms.css'

export function CodeforcesDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(localStorage.getItem("search"))       //used for filtering data of diiferent members

    useEffect(() => {
        axiosInstance.get(`platforms/codeforces/`)
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
        axisY: axisY({interval: 20,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),

        colorSet:"blackToBlue",	
        data: [
            {        
                type: "column",  
                dataPoints : year.filter(user=> typeof user.totalProblemSolved == "number")
                                .sort((a,b)=>{return b.totalProblemSolved - a.totalProblemSolved})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {y:user.totalProblemSolved, label:user.name, color:"#43f7ff"};

                                    return {y:user.totalProblemSolved, label:user.name};
                                })

            }
        ]
    }

    const options_2 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Contest Rating" ,
            fontFamily: "verdana",   
        },
        subtitles:[
            {
                text: "High rating => Better Coder",
                fontFamily: "verdana",   
                fontSize: 12,
            }
        ],
        axisY: axisY({interval: 200,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),

        data: [
            {        
                color: search===null?"#e5b3fe":"#f2d9ff",
                type: "splineArea",  
                dataPoints : year.filter(user=> typeof user.contestRating == "number")
                                .sort((a,b)=>{return b.contestRating-a.contestRating})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {y:user.contestRating, label:user.name, color:"#e5b3fe", markerSize:15};

                                    return {y:user.contestRating, label:user.name};
                                })
            },
        ]
    }

    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Followers Count" ,
            fontFamily: "verdana",   
        },
        axisY: axisY({interval: 10,includeZero: false,}),
        axisX:axisX({title:"Name",}),
        toolTip:blackToolTip(),
        data: [
            {        
                color: search===null?"#7bf1a8":"#d7fbe5",
                type: "line",  
                dataPoints : year.filter(user=> typeof user.friendOfCount == "number")
                                .sort((a,b)=>{return b.friendOfCount - a.friendOfCount})
                                .map((user)=>{
                                    if(user.email === search)
                                        return {y:user.friendOfCount, label:user.name, color:"#7bf1a8",markerSize:15};

                                    return {y:user.friendOfCount, label:user.name};
                                })
            },
        ]
    }

    var table = year.filter(user=> typeof user.codeforces_score === "number" && user.codeforces_score!==0)
                    .map((user)=>{return {name:user.name,
                            value: Math.round(user.codeforces_score),email:user.email}
                        })
                    .sort(function(a,b) {
                        return b.value - a.value;
                    }); 

    table = rearrangeTable(table,search)

    return(
        <>
            <div className="col-lg-6 col-sm-8 graphContainer" id="LeaderboardCodeforcesGraph">
                <div>
                <Filter data = {data} setYear = {setYear} year={year} setSearch={setSearch} search={search} />
                    <div className='graphs'><GenericGraph options={options_1} /></div>
                    <div className='graphs'><GenericGraph options={options_2}/></div>
                    <div className='graphs'><GenericGraph options={options_3}/></div>
                </div>
            </div>

            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4 userContainer" id="LeaderboardCodeforcesUser">
                <UserTable user_values={table} bgcolor="#F1F5F7" total={year.length}/>
            </div>
        </>
    );
}

