import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { axiosInstance } from "../../axios/loggedoutAxios";
import { Loading } from "../../Utils/Loading";

import leetcodeLogo from "../../../images/portfolio/contact/leetcode.png";
import codechefLogo from "../../../images/portfolio/contact/codechef.png";
import codeforcesLogo from "../../../images/portfolio/contact/codeforces.png";
import githubLogo from "../../../images/portfolio/contact/github.png";
import linkedinLogo from "../../../images/portfolio/contact/linkedin.png";
import hackerrankLogo from "../../../images/portfolio/contact/hackerrank.png";
import gmailLogo from "../../../images/portfolio/contact/gmail.png"

import asiLogo from "../../../images/home/ASI.png"

import { About } from "./linkedin/About";
import { Experience } from "./linkedin/Experience";
import { Education } from "./linkedin/Education";
import { Certifications } from "./linkedin/Certifications";
import { Projects } from "./linkedin/Projects";
import { Honors } from "./linkedin/Honors";
import { Publications } from "./linkedin/Publications";

import { LeetcodeUser } from "./platform/LeetcodeUser";
import { GithubUser } from "./platform/GithubUser";
import { HackerrankUser } from "./platform/HackerrankUser";
import { CodechefUser } from "./platform/CodechefUser";
import { CodeforcesUser } from "./platform/CodeforcesUser";
import { PageNotFound } from "../../Utils/PageNotFound";


export function Portfolio() {
  const { email } = useParams();
  var window_height = Math.floor(window.innerHeight*0.92);
  var window_width = Math.floor(window.innerWidth);
  var iconStyles = {
    width: "12%",
    height: "12%",
    margin: "2%",
  };

  var color_palatte = ["#f72585","#b5179e","#7209b7","#560bad","#480ca8","#3a0ca3","#3f37c9","#4361ee","#4895ef","#6daaf2"]
    
  const [data,setData] = useState(null)
  const [notUser,setNotUser] = useState(false)
  useEffect(() => {
    axiosInstance.get(`portfolio_detail/${email}/`)
     .then(resp=>resp.data)
     .then((resp) => {
        setData(resp);
      })
      .catch((err)=>{
        if(err.response.status===404)
          setNotUser(true);
      })     
    }, [])

  if(notUser===true)
    return <PageNotFound/>


  if(data===null)
    return <Loading/>;
  
  var contactData = [{platform:"linkedin",icon:linkedinLogo},{platform:"github",icon:githubLogo},{platform:"hackerrank",icon:hackerrankLogo},{platform:"leetcode",icon:leetcodeLogo},{platform:"codeforces",icon:codeforcesLogo},{platform:"codechef",icon:codechefLogo},]
  var contactJS = contactData.map((d,index)=>{
    return ((data["profile"][d.platform] !== null && data["profile"][d.platform] !== "") && (
      <a key={index} href={data["profile"][d.platform]} target="_blank" rel="noreferrer">
        <img src={d.icon} style={iconStyles} alt={d.platform} />
      </a>
    ))
  })

  return (
    // <div style={{ background:"linear-gradient(to right, black , #1c1056, #494078, #605889, #bbb7cc)"}}>
    <div style={{ background:"linear-gradient(135deg, #6a11cb 10%, #2575fc 100%)"}}>
      <div className="container-fluid" >
        <div className="row" style={{ color: "white",height:window_width<=992?null:window_height}}>
          {/* left container */}
          <section id="portfolioLeft" className="col-lg-4 col-md-5 col-12" style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",position:window_width<=767?"static":"fixed",top:"8%" ,height: window_height,padding: "6% 0 5% 3%" }}>
              <div>
                {/* name */}
                <section id="portfolioIntro">
                  <p className="h1 display-4 text-break" style={{ fontWeight: "360" }}>
                    {data["name"]}
                  </p>
                  {
                    data['linkedin']&&data['linkedin']["headline"]&&(<div className=" pt-3" style={{paddingRight:"5%"}}> 
                    <p className="lead">
                      {data['linkedin']["headline"]} 
                    </p>
                  </div>)
                  }

                  {
                    data['office_bearer']!==null &&
                    <div className="lead">
                      {data['office_bearer']['position']} of {data['office_bearer']['officetype']}
                    </div>
                  }

                  {
                    data['year']&&<p className="lead">
                      Batch {data['year']} - {data['year']-2000+4}
                    </p>
                  }

                  {
                    data['asi']===true &&
                    <div style={{padding:"0",margin:"0 0 2%"}}>
                      <img src={asiLogo} alt="asi logo" height="40px"/>
                      <p className="lead mx-2" style={{display:"inline-block"}}>
                        ASI Member
                      </p>
                    </div>  
                  }

                </section>
    
              {/* contact */}
              <section id="portfolioContact">
                {(data["profile"] && (data["profile"]["leetcode"] || data["profile"]["github"] || data["profile"]["hackerrank"] || data["profile"]["linkedin"] || data["profile"]["codechef"] || data["profile"]["codeforces"])) 
                && (
                  <>
                    {contactJS}
                  </>
                )}
                
                <p>
                  <img src={gmailLogo} style={{width: "6%", height: "6%", margin: "2%"}} alt="gmail" /> : {email}
                </p>
                
              </section>

            </div>
          </section>

          {/* middle container */}
          <div id="portfolioCenter"  className="col-lg-5 offset-lg-4 col-md-7 offset-md-5 col-12 py-5 px-3" style={{height:window_width<=991?null:window_height,overflow:"scroll"}} >
          {
            data['linkedin']&&
            <>
              <About about = {data['linkedin']['aboutus']} bgcolor={color_palatte[0]}/>
              <div className="my-4"></div>
              <Experience experiences = {data['linkedin']['experience']} display_count={15} bgcolor={color_palatte[2]}/>
              <div className="my-5"></div>
              <Education educations = {data['linkedin']['education']} bgcolor={color_palatte[3]}/>
              <div className="my-5"></div>
              <Certifications certifications = {data['linkedin']['certifications']} bgcolor={color_palatte[4]}/>
              <div className="my-5"></div>
              <Projects projects = {data['linkedin']['projects']} bgcolor={color_palatte[5]} display_count={15}/>
              <div className="my-5"></div>
              <Honors honors = {data['linkedin']['honors']} bgcolor={color_palatte[6]} display_count={15}/>
              <div className="my-5"></div>
              <Publications publications = {data['linkedin']['publications']} bgcolor={color_palatte[7]} display_count={10}/>
            </>
          }
          </div>

          {/* right container */}
          <div id="portfolioRight" className="col-lg-3 col-md-7 col-12 ms-md-auto py-5 px-4 " style={{height:window_width<=991?null:window_height,overflow:"scroll"}}>
            {
              data.hackerrank&&((data.hackerrank.badges&&Object.keys(data.hackerrank.badges).length !== 0)||(data.hackerrank.certificates&&data.hackerrank.certificates.length!==0))&&(
                <>
                  <HackerrankUser data={data["hackerrank"]} />
                  <hr />
                </>
              )
            }
            {
              data.github&&((data.github.own_repo&&data.github.own_repo!==0)||data.github.no_of_repositories!==0)&&(
                <>
                  <GithubUser data={data["github"]} />
                  <hr />
                </>
              )
            }
            {
              data.leetcode&&(data.leetcode.no_easy_qns + data.leetcode.no_medium_qns > 23)&&(
                <>
                  <LeetcodeUser data={data["leetcode"]} />
                  <hr />
                </>
              )
            } 
            {
              data.codechef&&data.codechef.badges&&data.codechef.badges.length!==0&&(
                <>
                  <CodechefUser data={data["codechef"]} />
                  <hr />
                </>
              )
            }
            {
              data.codeforces&&data.codeforces.rank!==null&&data.codeforces.rank!=="newbie"&&(
                <>
                  <CodeforcesUser data={data["codeforces"]} />
                  <hr />
                </>
              )
            }
          </div>
          
        </div>     
      </div>
    </div> 
  );
}

