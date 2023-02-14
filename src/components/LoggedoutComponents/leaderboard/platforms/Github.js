import { useState, useEffect } from 'react';
import { GenericGraph } from '../../../Utils/GenericGraph';
import { Loading } from '../../../Utils/Loading';
import {UserTable} from '../UserTable';
import {Filter} from '../filter/Filter';
import { axiosInstance } from "../../../axios/loggedoutAxios";
import { graph_height, rearrangeTable, axisX, axisY, blackToolTip, sharedTooltip } from './utils';
import './platforms.css'

// pie chart data calculation
function pieDataCalculation(data){
    var language_collections = {}
    data.filter(user => Array.isArray(user.tech_stack)).map((user)=>{
        var data = user.tech_stack
        for(var lang in data)
        {
            if(data[lang] in language_collections)
                language_collections[data[lang]]+=1;
            else
                language_collections[data[lang]]=1;
        }
    })

    var pie_data = []
    for (const [key, value] of Object.entries(language_collections)) {
        pie_data.push(
            {
                "y":value,
                "indexLabel":key,
            }
        )
    }
    return pie_data
}



export function GithubDisplay(){

    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(localStorage.getItem("search"))       //used for filtering data of diiferent members

    useEffect(() => {
        axiosInstance.get(`platforms/github/`)
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
            text: "Total No. of Repositories",
            fontFamily: "verdana"
        },
        axisY: axisY({interval: 10,includeZero: false,}),
        axisX: axisX({title:"Name",}),
        toolTip: blackToolTip(),
        data: [{
                type: "column",
                color:search===null?"#8367c7":"#dad1ee",
                name: "No. of Repos",
                legendText: "No. of Repos",
                dataPoints: year.filter(user=>typeof user.no_of_repositories == "number")
                                .sort((a,b)=>{return b.no_of_repositories - a.no_of_repositories})
                                .map((user)=>{
                                    if(user.email===search)
                                        return {label: user.name, y: user.no_of_repositories, color:"#8367c7"}
                                        
                                    return {label: user.name, y: user.no_of_repositories}
                                })
            }]
    }
       
    const options_2 = {
        title:{
            text: "Most languages used in Repositories",
            fontFamily: "verdana",
            fontSize: 17,
        },	
        colorSet:"blueToBlack",	
        data: [
        {       
            type: "pie",
            toolTipContent: "{y} - #percent %",
            yValueFormatString: "#",
            legendText: "{indexLabel}",
            dataPoints: pieDataCalculation(year),
        }
        ]
    }
        
    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title: {
            text: "Total Strength of connection",
            fontFamily: "verdana"
        },
        axisY: axisY({title: "No. of Followers + Following",interval: 10,includeZero: false,}),
        axisX: axisX({title:"Name",}),
        toolTip: sharedTooltip({shared: true,reversed: true}),
        legend: {
            dockInsidePlotArea: true,
			verticalAlign: "top",
			horizontalAlign: "right",               
            maxHeight: 13,
        },
        data: [
        {
            type: "stackedColumn",
            name: "Follower",
            showInLegend: true,
            color: search===null?"#1a7431":"#bad5c1",
            dataPoints: year.filter(user=>typeof user.no_of_followers == "number")
                            .sort((a,b)=>{return (b.no_of_followers+b.no_of_following) - (a.no_of_followers+a.no_of_following)})
                            .map((user)=>{
                                if(user.email===search)
                                    return {label: user.name, y: user.no_of_followers, color:"#1a7431"}

                                return {label: user.name, y: user.no_of_followers}
                            })
        },
        {
            type: "stackedColumn",
            name: "Following",
            color:search===null?"#6bd425":"#d3f2be",
            showInLegend: true,
            dataPoints: year.filter(user=>typeof user.no_of_following == "number")
                            .sort((a,b)=>{return (b.no_of_followers+b.no_of_following) - (a.no_of_followers+a.no_of_following)})
                            .map((user)=>{
                                if(user.email===search)
                                    return {label: user.name, y: user.no_of_following,color:"#6bd425"}

                                return {label: user.name, y: user.no_of_following}
                            })
        },]
    }

    
    var table = year.filter(user=>typeof user.github_score=="number")
                    .map((user)=>{
                        return {name:user.name,value: Math.round(user.github_score),email:user.email}
                    })
                    .sort(function(a,b) {
                        return b.value - a.value;
                    });

    table = rearrangeTable(table,search)

    return(
        <>
            <div className="col-lg-6 col-sm-8 graphContainer" id="LeaderboardGithubGraph">
                <div>
                <Filter data = {data} setYear = {setYear} year={year} setSearch={setSearch} search={search} />
                    <div className='graphs'><GenericGraph options={options_1}/></div>
                    <div className='graphs'><GenericGraph options={options_2}/></div>
                    <div className='graphs'><GenericGraph options={options_3}/></div>
                </div>
            </div>
            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4 userContainer" id="LeaderboardGithubUser">
                <UserTable user_values={table} bgcolor="#F1F5F7" total={year.length}/>
            </div>
        </>
    );
}

