import { useState,useEffect } from "react";

export function Loading()
{
    const[data,setData] = useState(null);
    var apikey = process.env.REACT_APP_TENOR_GIF_API_KEY;
    var lmt = 1;
    var search_term = "coding";
    var clientkey = "blaze";

    var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
            apikey +"&client_key=" + clientkey +  "&limit=" + lmt+"&contentfilter=high&media_filter=minimal&random=true";

    useEffect(()=>{
        fetch(search_url)
        .then(res=>res.json())
        .then(res=>setData(res.results[0]["media_formats"]["gif"]["url"]))
    },[])

    if(data===null)
        return <div style={{textAlign:"center",paddingTop:"100px"}}>
                    <div>Loading ...</div>
                    <div>Mostly you are not connected to Internet  ...</div>
                </div>;

    return <div style={{textAlign:"center",paddingTop:"100px"}}>
                <p>Loading...</p>
                <img src={data} width={Math.min(250,window.innerWidth)} style={{margin:"auto"}} alt="coding GIF"/>
            </div>
}