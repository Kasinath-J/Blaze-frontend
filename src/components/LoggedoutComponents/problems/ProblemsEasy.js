import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/loggedoutAxios";
import { Loading } from "../../Utils/Loading";

function IndividualQns(props) {
  return (
    <div className="row problemsEasyQns" style={{boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",}} >
      <div className="col-4">
        <div className="h6" style={{textAlign:"center",padding:"1.5%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
          {(props.topic.map((t,index)=>{return <p key={index}><a href={t.url} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"black",fontSize:"1.2rem"}}>{t.name}</a></p>;})).slice(0,2)}
        </div>
      </div>

      <div className="col-8" style={{backgroundColor:"#fdfaff",textAlign:"center",padding:"1.5%",margin:"0.5% 0",fontSize:"1.3rem"}} >
        <p>
          <a href={props.link} target="_blank" rel="noreferrer">{props.name}</a>
        </p>
      </div>

    </div>
  );
}

export function ProblemsEasy() {
  const [data,setData] = useState(null)
  useEffect(() => {
    axiosInstance.get("api/problemseasy/")
     .then(resp => resp.data)
     .then(resp => {
        setData(resp);
     })
    }, [])

  if(data===null)
  {
    return <Loading />;
  }
  var qns = data.map((d,index)=>{
    return <IndividualQns key={index} topic={d["tag"]} link={d["url"]} name={d["name"]}/>;
  });

  return (
    <div style={{ backgroundColor: "#f2e9f9", height:window.innerHeight*0.92}}>
      <div className="container">
          <h3 className="display-3 py-2" >
            Try these Easy Questions
          </h3>
        <div
          className="container"
          style={{height:window.innerHeight*0.72, display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}
        >
          { qns }
        </div>
      </div>
    </div>
  );

  
}


