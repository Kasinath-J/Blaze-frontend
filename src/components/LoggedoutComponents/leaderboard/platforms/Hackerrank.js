import { useState, useEffect } from 'react';
import { GenericGraph } from '../../../Utils/GenericGraph';
import { Loading } from '../../../Utils/Loading';
import {UserTable} from '../UserTable';
import {Filter} from '../filter/Filter';
import { axiosInstance } from "../../../axios/loggedoutAxios";
import { graph_height, rearrangeTable,axisY,axisX,blackToolTip,sharedTooltip } from './utils';
import './platforms.css'


export function HackerrankDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(localStorage.getItem("search"))       //used for filtering data of diiferent members

    useEffect(() => {
        axiosInstance.get(`api/hackerrank/`)
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
            text: "Total Certificates and Badges" ,
            fontFamily: "verdana",   
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            cursor:"pointer",
            reversed: true,
            dockInsidePlotArea: true,
        },
        toolTip: sharedTooltip({shared:true,reversed:true}),
        axisY: axisY({"includeZero":false,"interval":4}),
        axisX: axisX({title:"Name"}),
        data: [
            {        
                type: "splineArea",  
                showInLegend: true, 
                legendText:"Badges",
                name:"Badges",
                color:search===null?"#5384bd":"#cbdaeb",
                dataPoints : year.sort((a,b)=>{return (b.badges.length+b.certificates.length)-(a.badges.length+a.certificates.length)})
                                .map((user)=>{
                                    if(user.email===search)
                                    {
                                        if (Array.isArray(user.badges))
                                            return {y:user.badges.length, label:user.name, color:"#5384bd",markerSize:15};

                                        return {y:0, label:user.name,color:"#5384bd",markerSize:15};
                                    }
                                    else
                                    {
                                        if (Array.isArray(user.badges))
                                            return {y:user.badges.length, label:user.name};

                                        return {y:0, label:user.name};
                                    }
                                })
            },
            {        
                type: "splineArea",  
                showInLegend: true, 
                legendText:"Certificates",
                name:"Certificates",
                color:search===null?"#c0504e":"#eccbca",
                dataPoints : year.sort((a,b)=>{return (b.badges.length+b.certificates.length)-(a.badges.length+a.certificates.length)})
                .map((user)=>{
                    if(user.email===search)
                    {
                        if (Array.isArray(user.certificates))
                            return {y:user.certificates.length, label:user.name, color:"#c0504e",markerSize:15};

                        return {y:0, label:user.name,color:"#5384bd",markerSize:15};
                    }
                    else
                    {
                        if (Array.isArray(user.certificates))
                            return {y:user.certificates.length, label:user.name};

                        return {y:0, label:user.name};
                    }
                        
                })

            }
        ]
    }

    const options_2 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Followers Count" ,
            fontFamily: "verdana",   
        },
        toolTip:blackToolTip(),
        axisY: axisY({includeZero: false,interval: 10 }),
        axisX: axisX({title:"Name"}),
        data: [
            {        
                color: search===null?"#aacc00":"#e6f0b3",
                type: "line",  
                dataPoints : year.filter(user=>typeof user.followers_count =="number")
                                .sort((a,b)=>{return b.followers_count - a.followers_count})
                                .map((user)=>{
                                        if(user.email===search)
                                            return {y:user.followers_count, label:user.name, color:"#aacc00",markerSize:15};

                                        return {y:user.followers_count, label:user.name};
                                })
            },
        ]
    }

    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Score By Track" ,
            fontFamily: "verdana",   
        },
        axisY: axisY({includeZero: false,interval: 300}),
        axisX: axisX({title:"Name"}),

        toolTip: blackToolTip(),
        data: [
            {        
                color: search===null?"#ffd670":"#fff3d4",
                type: "column",  
                dataPoints : year.filter(user=>typeof user.score_elo =="number")
                                .sort((a,b)=>{return b.score_elo - a.score_elo})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {y:user.score_elo, label:user.name,color:"#ffd670",markerSize:15};

                                    return {y:user.score_elo, label:user.name};
                                })
            },
        ]
    }

    var table = year.filter(user=> typeof user.hackerrank_score=="number")
                    .map((user)=>{return {name:user.name,
                        value: Math.round(user.hackerrank_score),email:user.email}
                    })
                    .sort(function(a,b) {
                        return b.value - a.value;
                    }); 

    table = rearrangeTable(table,search);

    return(
        <>
            <div className="col-lg-6 col-sm-8 graphContainer" id="LeaderboardHackerrankGraph">
                <div>
                    <Filter data = {data} setYear = {setYear} year={year} setSearch={setSearch} search={search} />
                    <div className='graphs'><GenericGraph options={options_1} /></div>
                    <div className='graphs'><GenericGraph options={options_2}/></div>
                    <div className='graphs'><GenericGraph options={options_3}/></div>
                </div>
            </div>

            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4 userContainer" id="LeaderboardHackerrankUser">
                <UserTable user_values={table} bgcolor="#F1F5F7" total={year.length}/>
            </div>
        </>
    );
}



