import { Button,Badge,Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios/loggedoutAxios';
import { useNavigate } from "react-router-dom";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { LinkContainer } from 'react-router-bootstrap'
import { Loading } from '../../Utils/Loading';
import "./searchPortfolio.css"

export function SearchPortfolio(props)
{
    var window_height = Math.floor(window.innerHeight*0.92);
    const navigate = useNavigate();
    const [options,setOptions] = useState(null);
    const [search,setSearch] = useState("");

    useEffect(() => {
        axiosInstance.get(`users/emaillist/`)
            .then(resp => resp.data)
            .then((resp) => {
                // to show aleast profiles with either linkedin or github
                setOptions(resp.filter((op)=>(op.linkedin!==null || op.github!==null)));
            })
        }, [])

    if(options===null)
        return <Loading />;

    function handleSubmit(e){
        e.preventDefault();
        if(search!=="" && search!==null)
            navigate('/user/'+search);
    }

    var datalist = [];
    if(options)
    {
        datalist = options.map((op)=>{return {id:op.email,value:op.email};})
    }
    
    var available_years = new Map();
    for(var option of options)
    {
        var inst = available_years.has(option.year);
        if(inst===false)
        available_years.set(option.year,1);
        else
        available_years.set(option.year,available_years.get(option.year)+1);
    }
    available_years = Array.from(available_years, ([year, count]) => ({ year, count }));

    
    function getRandomInt(max) {
        var temp =  Math.floor(Math.random() * max);
        return temp;
    }

    function some(data,maxcount){

        var randints = []
        var returnList = [];
        var iteration = Math.min(4,maxcount)
        while(randints.length < iteration)
        {
            var temp = getRandomInt(maxcount);
            if (randints.indexOf(temp)<0)
            {
                randints.push(temp);
                returnList.push(data[temp])
            }
        }
        return returnList;
    }
    
    return <div style={{ background:"linear-gradient(135deg, #6a11cb 10%, #2575fc 100%)",minHeight:window_height,color:"white"}}>
        <div className="container">

            <div className='row'>
                <div className="col-md-7 col-12" id="searchSpecific">
                    <h1 className='my-5'>Search</h1>
                    <Form id="search">
                        <div className="row">
                            <div style={{color:"black",width:"80%",float:"left"}}>
                                <DatalistInput
                                    placeholder="Enter email"
                                    onSelect={(item) => {
                                        setSearch(item.value);
                                    }}
                                    items={datalist}
                                />
                            </div>
                            
                            
                            <Button variant="primary" type="submit" onClick={handleSubmit} style={{width:"18%",float:"right",padding:"0px"}}>
                                Search
                            </Button>
                            
                        </div>

                    </Form>
                </div>
                <div className="col-md-5 col-12" id="randomly suggested">
                    
                    <h1 className='my-5' >Suggested Portfolios</h1>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        {
                            available_years.map((obj,index1)=>
                            {
                                return <div key={index1} style={{margin:"3% 2%"}}>
                                            <h3>Batch {obj.year}</h3>
                                            <div style={{display:"flex",flexWrap:"wrap"}}>
                                                {
                                                    some(options.filter(option=>option.year===obj.year),obj.count)
                                                                .map((option,index2)=>
                                                                {
                                                                    return  <Button key={index2} style={{backgroundColor:"rgba(0,0,0,0)",border:"none",padding:"0",margin:"0"}}>
                                                                                <LinkContainer to={"/user/"+option.email} style={{display:"block"}}>
                                                                                        <h5><Badge bg="secondary" className='p-2 m-2' >
                                                                                            {option.email}
                                                                                        </Badge></h5>
                                                                                </LinkContainer>
                                                                            </Button>
                                                                    
                                                                })
                                                }
                                            </div>
                                    </div>
                            })

                        }
                    </div>
                </div>
            </div>                      
            
        </div>
    </div>
}