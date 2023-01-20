import { useState, useEffect } from 'react';
import { GenericGraph } from '../../../Utils/GenericGraph';
import { Loading } from "../../../Utils/Loading";
import {UserTable} from '../UserTable';
import {Filter} from '../filter/Filter';
import { axiosInstance } from "../../../axios/loggedoutAxios";
import { graph_height, rearrangeTable, axisX, axisY, sharedTooltip, blackToolTip } from './utils';
import './platforms.css'


export function LeetcodeDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(localStorage.getItem("search"))       //used for filtering data of diiferent members
  
    useEffect(() => {
        axiosInstance.get(`api/leetcode/`)
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
        title: {
            text: "Total No. of questions solved",
            fontFamily: "verdana",
        },
        axisY: axisY({includeZero: false,interval: 60}),
        axisX: axisX({title:"Name"}),        
        toolTip: sharedTooltip({shared: true,reversed: true}),

        legend: {
            dockInsidePlotArea: true,
			verticalAlign: "top",
			horizontalAlign: "right",               
            maxHeight: 13,
            reversed: true,
        },
        data: [
        {
            type: "stackedColumn",
            name: "Easy",
            showInLegend: true,
            color: search===null?"#66cfc3":"#ccefeb" ,
            dataPoints: year.filter(user=>typeof user.no_easy_qns == "number")
                            .sort((a,b)=>{return (b.no_easy_qns+b.no_medium_qns+b.no_difficult_qns) -( a.no_easy_qns+a.no_medium_qns+a.no_difficult_qns)})
                            .map((user)=>{               
                                if(user.email===search)
                                    return {label: user.name, y: user.no_easy_qns, color:"#66cfc3"};
                                
                                return {label: user.name, y: user.no_easy_qns}
                            })
        },
        {
            type: "stackedColumn",
            name: "Medium",
            showInLegend: true,
            color:search===null?"#FFB800":"#ffdc80",
            dataPoints: year.filter(user=>typeof user.no_medium_qns == "number")
                            .sort((a,b)=>{return (b.no_easy_qns+b.no_medium_qns+b.no_difficult_qns) -( a.no_easy_qns+a.no_medium_qns+a.no_difficult_qns)})
                            .map((user)=>{
                                if(user.email===search)
                                    return {label: user.name, y: user.no_easy_qns, color:"#ffb800"};

                                return {label: user.name, y: user.no_medium_qns}
                            })
        },
        {
            type: "stackedColumn",
            name: "Hard",
            showInLegend: true,
            color:search===null?"#EF4743":"#f9b5b4",
            dataPoints: year.filter(user=>typeof user.no_difficult_qns == "number")
                            .sort((a,b)=>{return (b.no_easy_qns+b.no_medium_qns+b.no_difficult_qns) -( a.no_easy_qns+a.no_medium_qns+a.no_difficult_qns)})
                            .map((user)=>{
                                if(user.email===search)
                                    return {label: user.name, y: user.no_easy_qns, color:"#EF4743"};

                                return {label: user.name, y: user.no_difficult_qns}
                            })
        },]
    }
    
    const options_2 = {
        animationEnabled: true,
        height:graph_height,
        title: {
            text: "Contest Rating",
            fontFamily: "verdana"
        },
        subtitles:[
            {
                text: "Lower rating => Better Coder",
                fontFamily: "verdana",   
                fontSize: 12,
            }
        ],
        axisY: axisY({interval: 2000,includeZero: false}),
        axisX: axisX({title:"Name"}),
        toolTip: {
            enabled: true, 
            fontSize:13,
            contentFormatter: function ( e ) {
                console.log(e);
                return e.entries[0].dataPoint.label + " " + Math.round(e.entries[0].dataPoint.y*1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
            },  
            borderThickness: 0,
            backgroundColor: "rgba(255,255,255,0.75)",
            borderColor: "rgba(255,255,255,0.75)",
            animationEnabled: true,
        },
        data: [{
            type: "splineArea",
            highlightEnabled: true,
            legendText: "Overall Ranking",
            color:search===null?"#83a7d0":"#dae5f1",
            dataPoints: year.filter(user=>typeof user.overall_raking == "number")
                            .sort((a,b)=>{return a.overall_raking - b.overall_raking})
                            .map((user)=>{
                                if(user.email===search)
                                    return {label: user.name, y: user.overall_raking/1000, color:"#83a7d0", markerSize:15};
                                return {label: user.name, y: user.overall_raking/1000}
                            })
        }]
    }
    
    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title: {
            text: "Total No. of Skills",
            fontFamily: "verdana"
        },
        axisY: axisY({interval: 10,includeZero: true}),
        axisX:axisX({title:"Name"}),
        toolTip: blackToolTip(),
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            reversed: true,
            dockInsidePlotArea: true,
        },
        data: [{
            type: "column",
            color:search===null?"#ff4d6d":"#ffb8c5",
            legendText: "No. of Badges",
            dataPoints: year.filter(user=>typeof user.skills_len == "number")
                            .sort((a,b)=>{return b.skills_len - a.skills_len})
                            .map((user)=>{
                                if(user.email===search)
                                    return {label: user.name, y: user.no_easy_qns, color:"#ff4d6d"};
                                return {label: user.name, y: user.skills_len}
                            })
        }]
    }

    var table = year.filter(user=>typeof user.leetcode_score == "number")
                    .map((user)=>{
                        return {name:user.name,value: Math.round(user.leetcode_score/1000),email:user.email}
                    })
                    .sort(function(a,b) {
                        return a.value - b.value;
                    }); 

    table = rearrangeTable(table,search);

    return(
        <>
            <div className="col-lg-6 col-sm-8 graphContainer" id="LeaderboardLeetcodeGraph">
                <div>
                    <Filter data = {data} setYear = {setYear} year={year} setSearch={setSearch} search={search} />
                    <div className='graphs'><GenericGraph options={options_1} /></div>
                    <div className='graphs'><GenericGraph options={options_2}/></div>
                    <div className='graphs'><GenericGraph options={options_3}/></div>
                </div>
            </div>

            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4 userContainer" id="LeaderboardLeetcodeUser">
                <UserTable user_values={table} bgcolor="#F1F5F7" total={year.length}/>
            </div>
        </>

    );

}
