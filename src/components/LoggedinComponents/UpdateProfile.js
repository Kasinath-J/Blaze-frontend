import React,{ useState ,useEffect} from "react";
import {Row,Col,Form,Button,ToastContainer,Toast,Spinner} from 'react-bootstrap';
import { axiosInstance } from "../axios/loggedinAxios";
import { useNavigate } from "react-router-dom";

import Carousel from 'react-bootstrap/Carousel';

import codechefSteps from "../../images/updatePortfolio/Codechef.png"
import codeforcesSteps from "../../images/updatePortfolio/Codeforces.png"
import githubSteps from "../../images/updatePortfolio/Github.png"
import leetcodeSteps from "../../images/updatePortfolio/Leetcode.png"
import hackerrankSteps from "../../images/updatePortfolio/Hackerrank.png"
import linkedinSteps from "../../images/updatePortfolio/Linkedin.png"
import nameSteps from "../../images/updatePortfolio/Name.png"

import { Loading } from "../Utils/Loading";

import "./updateprofile.css";

function logout()
{
    localStorage.removeItem("credential");
    localStorage.removeItem("photo");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    window.location.reload();
}

export function UpdateProfile (props) {

    const [data,setData] = useState(null);

    const [submitted,setSubmitted] = useState(null);
    const success_msg = "Successfully saved";

    const [loading,setLoading] = useState(false);
    
    const [toast, setToast] = useState(true);
    const toggleToast = () => setToast(!toast);


    var window_height = window.innerHeight;
    const navigate = useNavigate();

    useEffect(() => {
		axiosInstance.get('users/profiledetail/'+localStorage.getItem('email')+'/')
        .then((res) => {

            if(res.data.name!==null)
                setData(res.data);
            
            else
            {
                setData({
                            ...res.data,
                            "name": res.data.id.split("@")[0]
                        }
                    )
            }
        }) 
        .catch((err)=>{
            navigate('/');
        })
	}, []);

	function handleChange(e){
        if(e.target.name ==="name" && e.target.value.trim()==="")
        {
            return;
        }

		setData({
			...data,
			[e.target.name]: e.target.value.trim(),
		});

        setSubmitted(null);        
	};

    
    function handleBlur(e){
        const name = e.target.name;
        var element = document.getElementById("open_window_"+name);
        element.classList.add("blink");

        var info = document.getElementById("updateProfileInfo1");
        info.classList.add("blink")

        var info = document.getElementById("updateProfileInfo2");
        info.classList.add("blink")

    }
    
    function handleSubmit(e){
        e.preventDefault();
        var sendData = data
        setLoading(true);

        axiosInstance.put('users/profiledetail/'+localStorage.getItem('email')+'/', sendData)
			.then((res) => {
                if(res.status===200)
                {
                    setToast(true);
                    setSubmitted(success_msg)
                }
			})
            .catch(
                (error)=>{

                    if (error.response.status>=400 && error.response.status<500)
                    {
                        logout()
                    }
                    setToast(true);
                    setSubmitted("Error while submitting")
                        
                }
            )
            .finally(()=>{
                setLoading(false);
            })

    }

    // for carousel
    const stepOptions = {"name":[nameSteps,0],"leetcode":[leetcodeSteps,1],"github":[githubSteps,2],"hackerrank":[hackerrankSteps,3],"linkedin":[linkedinSteps,4],"codechef":[codechefSteps,5],"codeforces":[codeforcesSteps,6]}
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    function handleFocus(e){
        var name = e.target.name;
        setIndex(stepOptions[name][1]);
    }

    
    var carousel = <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
        {
            Object.entries(stepOptions).map((k,v)=><Carousel.Item>
                <img
                    key={v}
                    className="d-block w-100"
                    src={k[1][0]}
                    alt="First slide"
                />
            </Carousel.Item>)
        }
    </Carousel>


    if(data===null )
        return <Loading/>;    

    var labels = [
        {display:"Name*",name:"name"},
        {display:"Leetcode",name:"leetcode",front_URL:"https://leetcode.com/",back_URL:"/"},
        {display:"Github",name:"github",front_URL:"https://github.com/",back_URL:""},
        {display:"Linkedin",name:"linkedin",front_URL:"https://www.linkedin.com/in/",back_URL:"/"},
        {display:"Hackerrank",name:"hackerrank",front_URL:"https://www.hackerrank.com/",back_URL:""},
        {display:"Codechef",name:"codechef",front_URL:"https://www.codechef.com/users/",back_URL:""},
        {display:"Codeforces",name:"codeforces",front_URL:"https://codeforces.com/profile/",back_URL:""}
    ]

    var form = labels.map((label,index)=>{
        return <div key={index} >
                    <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                        <Form.Label column sm="3" style={{fontSize:"1rem"}}>{label.display}</Form.Label>
                        <Col sm="8" xs="9">
                            <Form.Control name={label.name} type="text" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} value={data[label.name]} placeholder="Steps in carousel"/>
                        </Col>
                        <Col sm="1" xs="1" style={{padding:"3px 0"}}>
                            {
                                label.name!=="name"&&<a target="_blank" rel="noreferrer" href={label.front_URL+data[label.name]+label.back_URL}  >
                                    <img id={"open_window_"+label.name} src="https://img.icons8.com/ios/50/000000/open-in-window.png" height="28px" width="28px" alt="verify"/>
                                </a>
                            }                        
                        </Col>
                    </Form.Group>
                </div>
                })

    return (
        <div style={{backgroundImage:"linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%)",minHeight:window_height*0.92,padding:"2% 5% 1.5%"}} >
            <div className="container">                                
          
                <div className="row" style={{backgroundColor:"white",margin:"auto"}}>
                    <div className="col-md-5 col-12" style={{display:"flex",flexDirection:"column",justifyContent:"space-around",paddingTop:"10px"}} >
                        {/* <img src={steps} width="100%" alt={steps}/> */}
                        {carousel}
                    </div>
                    <div className="col-md-7 col-12" style={{padding:"4% 3%"}} >
                        <h2 className="mb-4">Update details 
                            <div className="lead " style={{display:"inline-block",paddingLeft:"5px"}}> by tomorrow</div>
                        </h2>    
                        <div id="updateProfileInfo1" style={{marginLeft:"10px",fontSize:"0.85rem",width:"100%"}}>
                                Click <img src="https://img.icons8.com/ios/50/000000/open-in-window.png" height="20px" width="28px" alt="verify" style={{padding:"0 4px"}}/>
                                and verify your username
                        </div>
                        <Form >
                            <div>
                                {form}
                            </div>
                            <div id="updateProfileInfo2" style={{marginLeft:"10px",fontSize:"0.85rem",width:"100%"}}>
                                Click <img src="https://img.icons8.com/ios/50/000000/open-in-window.png" height="20px" width="28px" alt="verify" style={{padding:"0 4px"}}/>
                                and verify your username
                            </div>
                            <Button variant="primary" type="submit" style={{float:"right",marginRight:"20px"}} onClick={handleSubmit}>
                                {loading===false?"Submit":<Spinner animation="border" variant="light" />}
                            </Button>
                        </Form>                            
                    </div>
                </div>
                
                

            </div>
            {
                submitted!==null && <ToastContainer className="p-3" position="bottom-center">
                        <Toast show={toast} onClose={toggleToast} delay={2000} autohide bg={submitted===success_msg?"success":"danger"}>
                            <Toast.Body>
                                <strong className="me-auto" >{submitted}</strong>
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                
            }
        </div>
    )
    
}


