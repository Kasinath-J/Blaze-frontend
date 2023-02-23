import { Form,Button } from 'react-bootstrap';
import DatalistInput from 'react-datalist-input';
import { useState} from 'react';
import "./filter.css";
import searchicon from "../../../../images/leaderboard/search.png"
import cancelicon from "../../../../images/leaderboard/cancel.png"

export function Filter(props){

    const [localSearch,setLocalSearch] = useState(null)
    function handleSubmit(e){
        e.preventDefault();
        localStorage.setItem("search",localSearch);
        props.setSearch(localSearch);
    }

    var datalist = props.year.map((op)=>{return {id:op.email,value:op.email};});


    var available_years = new Set()
    for(var d of props.data)
    {
        available_years.add(d.year)
    }
    available_years = Array.from(available_years).sort(function(a, b) {
        return a - b;
      });

    available_years.unshift("All");
    
    function update(year){

        props.setYear(
        props.data.filter(
            (d)=>{
                return d.year===year || year==="All";
            }
        )
    )
    }

    return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginBottom:"5px"}}>

        <div id="filterYear" style={{paddingLeft:"5px",marginTop:"0",display:"flex",flexWrap:"wrap"}}>
            {
                available_years.map((year,index)=>{   
                    var variant = "light";
                    if(props.year.length===props.data.length)
                    {
                        if(year==="All")
                            variant="dark";
                    }
                    else
                    {
                        if(year!=="All" && year===props.year[0].year)
                            variant="dark";
                    }

                    return <Button key={index} className='shadow' variant={variant} style={{margin:"5px 2px",padding:"0px 2px"}} onClick={()=>{update(year)}}>
                                {year==="All"?"All":year%2000}
                            </Button>
                })
            }
        </div>
    
        <Form id="filterSearchUser" className='shadow' style={{fontSize:"0.7rem",padding:"0px",marginRight:"20px"}} >
            <div style={{display:"flex"}}>                    
                <DatalistInput
                    placeholder="Enter email"
                    onSelect={(item) => {
                        setLocalSearch(item.value);
                    }}
                    items={datalist}
                    value=  {props.search}
                    inputProps={localStorage.getItem("search")!==null?{disabled:"disabled"}:{}}
                />                   
                
                    {
                        props.search===null
                        ?
                        <Button variant="primary" type="submit" onClick={handleSubmit} style={{padding:"0 3px"}}>
                            <img src={searchicon} height="15px" width="15px" style={{margin:"0",padding:"0"}} alt="search"/> 
                        </Button>
                        :
                        <Button variant="primary" onClick={()=>{props.setSearch(null);localStorage.removeItem("search")}} style={{padding:"0 3px"}}>
                            <img src={cancelicon} height="15px" width="15px" style={{margin:"0",padding:"0"}} alt="clear"/> 
                        </Button>
                    }
                
            
            </div>
        </Form>
        
    </div>
}