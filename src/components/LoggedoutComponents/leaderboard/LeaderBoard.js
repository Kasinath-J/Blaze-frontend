import React,{Component} from "react";
import Button from 'react-bootstrap/Button';

import { LeetcodeDisplay } from "./platforms/Leetcode";
import { GithubDisplay } from "./platforms/Github";
import { LinkedinDisplay } from "./platforms/Linkedin";
import { HackerrankDisplay} from "./platforms/Hackerrank"
import { CodechefDisplay} from "./platforms/Codechef"
import { CodeforcesDisplay } from "./platforms/Codeforces";

import "./leaderboard.css"

function display(platform)
{
    switch(platform)
    {
        case "Leetcode":
            return <LeetcodeDisplay />;
        case "Github":
            return <GithubDisplay />
        case "LinkedIn":
            return <LinkedinDisplay />
        case "Hackerrank":
            return <HackerrankDisplay />
        case "Codechef":
            return <CodechefDisplay />
        case "Codeforces":
            return <CodeforcesDisplay />
        default:
            return <LeetcodeDisplay />;
    }
}

export class LeaderBoard extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            platform : localStorage.getItem("platform")!==null ? localStorage.getItem("platform") : "Github"
        }
        this.platform = this.platform.bind(this);
    }

    componentWillUnmount(){
        localStorage.removeItem("search");
        localStorage.removeItem("platform");
    }

    platform(val) {
        this.setState({
            platform : val
        })
        localStorage.setItem("platform",val)
    }

    render(){
        var all_platforms = ["Github","Leetcode","LinkedIn","Hackerrank","Codechef","Codeforces"]
        var fontsize = "1rem";
        var window_innerWidth = window.innerWidth;

        if(window_innerWidth<300)
            fontsize = "0.7rem"
        else if(window_innerWidth<420)
            fontsize = "0.8rem"
        else if(window_innerWidth<576)
            fontsize = "0.95rem"
        else
            fontsize = "1.2rem"


        var largeButtonStyle={height:"12%",minHeight:"30px",color:"black",fontSize:fontsize,backgroundColor:"white"}
        var smallButtonStyle={height:"35px",color:"black",fontSize:fontsize,backgroundColor:"white"}

        var largeButtons = all_platforms.map((platform,index)=>{
            return <Button key={index} className={`${this.state.platform===platform?"highlight":"normal"} btn`} style={largeButtonStyle} variant="outline-light" onClick={()=>{this.platform(platform)}}>{platform}</Button>
        })

        var smallButtons = all_platforms.map((platform,index)=>{
            return <Button key={index} className={`${this.state.platform===platform?"highlight":"normal"} btn`} style={smallButtonStyle} variant="outline-light" onClick={()=>{this.platform(platform)}}>{platform}</Button>
        })

        return(
            <div style={{backgroundColor:"#F1F5F7"}}>
            <div className="container-fluid px-md-5 px-sm-3 px-1">    
                <div className="row">

{/*###############################-----------------Buttons--------------###############################*/}
                    {window_innerWidth>=576?
                        <div id="leaderBoardLargeButtons" className="col-lg-3 col-sm-4 col-12" style={{position:"sticky",top:"11.5%",height:window.innerHeight*0.88,borderRadius:"3px",marginTop:"1%"}}>
                                <div style={{fontWeight:"600",fontSize:fontsize,padding:"10% 0",textAlign:"center"}}>PLATFORMS</div>
                                <div style={{display:"flex",flexDirection:"column",height:"80%",justifyContent:"space-between"}}>
                                    {largeButtons}
                                </div>
                        </div>
                        :
                        <div className="col-0 hide_scrollbar" style={{position:"sticky",top:"10%",height:"45px",padding:"1%",zIndex:"99",backgroundColor:"#F1F5F7",pverflow:"scroll"}}>
                            <section id="leaderBoardSmallButtons">
                                <div style={{display:"flex",flexDirection:"row",overflow:"scroll"}}>
                                    {smallButtons}
                                </div>                              
                            </section>
                        </div>
                    }
                    
{/*############################-----------------Graph and Table--------------##########################*/}                    
                    {/* <section id="leaderBoardGraphandTable"> */}
                        {display(this.state.platform)}
                    {/* </section> */}

                </div>
            </div>
            </div>
        );
    }
}

