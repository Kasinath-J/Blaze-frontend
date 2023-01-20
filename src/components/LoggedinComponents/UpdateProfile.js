import React,{ useState ,useEffect} from "react";
import {Row,Col,Form,Button} from 'react-bootstrap';
import { axiosInstance } from "../axios/loggedinAxios";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../../images/updatePortfolio/upload.png"

import codechefSteps from "../../images/updatePortfolio/Codechef.png"
import codeforcesSteps from "../../images/updatePortfolio/Codeforces.png"
import githubSteps from "../../images/updatePortfolio/Github.png"
import leetcodeSteps from "../../images/updatePortfolio/Leetcode.png"
import hackerrankSteps from "../../images/updatePortfolio/Hackerrank.png"
import linkedinSteps from "../../images/updatePortfolio/Linkedin.png"
import nameSteps from "../../images/updatePortfolio/Name.png"

import { Loading } from "../Utils/Loading";

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

    var window_height = window.innerHeight;
    const navigate = useNavigate();

    useEffect(() => {
		axiosInstance.get('api/profile/'+localStorage.getItem('email')+'/')
        .then((res) => {
            setData(res.data);
		})
        .catch((err)=>{
            navigate('/');
        })
	}, []);

        

    const initialErr = {
        name:null,
        leetcode:null,
        github:null,
        hackerrank:null,
        linkedin:null,
        codechef:null,
        codeforces:null
    }
    const [err,setErr] = useState(initialErr);

    const initialClasses = {
        name:"",
        leetcode:"",
        github:"",
        hackerrank:"",
        linkedin:"",
        codechef:"",
        codeforces:"",
    }
    const [classes,setClasses] = useState(initialClasses);
    const stepOptions = {
        name: nameSteps,
        leetcode: leetcodeSteps,
        github: githubSteps,
        hackerrank: hackerrankSteps,
        linkedin: linkedinSteps,
        codechef: codechefSteps,
        codeforces: codeforcesSteps,
    }
    const [steps,setSteps] = useState(stepOptions.linkedin)


    const upload_img = <img src={uploadIcon} height="37px" width="37px" style={{padding:"0px",margin:"0"}} alt="upload"/>;
    const loading_img = <div className="spinner-grow text-primary" role="status">
                             <span className="visually-hidden">Loading...</span>
                         </div>

    const initialUpload = {
        name:upload_img,
        leetcode:upload_img,
        github:upload_img,
        hackerrank:upload_img,
        linkedin:upload_img,
        codechef:upload_img,
        codeforces:upload_img,
    }

    const[uploadOrLoad,setUploadOrLoad] = useState(initialUpload);

	function handleChange(e){
		setData({
			...data,
			[e.target.name]: e.target.value.trim(),
		});
	};

    function handleFocus(e){
        const name = e.target.name;
        setSteps(stepOptions[name]);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        var name = e.currentTarget.name;
        var value = data[name]
        var sendData = {
            id:data.id,
            [name]:value
        }
        
        setUploadOrLoad({
            ...uploadOrLoad,
            [name]:loading_img,
        })


        axiosInstance.put('api/profile/'+localStorage.getItem('email')+'/', sendData)
			.then((res) => {
                if(res.status===200)
                {
                    setErr({
                        ...err,
                        [name]:null,
                    })
                    setClasses({
                        ...classes,
                        [name]:'is-valid'
                    })
                }
			})
            .catch(
                (error)=>{
                    console.log(error)
                    if (error.response.status>=400 && error.response.status<500)
                    {
                        logout()
                    }
                        
                    setErr({
                        ...err,
                        [name]:error.response.data[name],
                    })
                    setClasses({
                        ...classes,
                        [name]:'is-invalid'
                    })
                }
            )
            .finally(
                ()=>{
                    setUploadOrLoad({
                        ...uploadOrLoad,
                        [name]:upload_img,
                    })
                }
            )
    }


    if(data===null )
        return <Loading/>;    
            
    var labels = [
        {display:"Name",name:"name"},
        {display:"Leetcode",name:"leetcode",front_URL:"https://leetcode.com/",back_URL:"/"},
        {display:"Github",name:"github",front_URL:"https://github.com/",back_URL:""},
        {display:"Linkedin",name:"linkedin",front_URL:"https://www.linkedin.com/in/",back_URL:"/"},
        {display:"Hackerrank",name:"hackerrank",front_URL:"https://www.hackerrank.com/",back_URL:""},
        {display:"Codechef",name:"codechef",front_URL:"https://www.codechef.com/users/",back_URL:""},
        {display:"Codeforces",name:"codeforces",front_URL:"https://codeforces.com/profile/",back_URL:""}
    ]

    var form = labels.map((label,index)=>{
        return <Form key={index}>
                    <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                        <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>{label.display}</Form.Label>
                        <Col sm="7" xs="9">
                            <Form.Control className={classes[label.name]} name={label.name} type="text" onChange={handleChange} onFocus={handleFocus} value={data[label.name]}/>
                        </Col>
                        <Col sm="1" xs="1" style={{paddingLeft:"0px",paddingTop:"3px"}}>
                            {
                                label.name!=="name"&&<a target="_blank" rel="noreferrer" href={label.front_URL+data[label.name]+label.back_URL}  >
                                    <img src="https://img.icons8.com/ios/50/000000/open-in-window.png" height="28px" width="28px" alt="verify"/>
                                </a>
                            }                        
                        </Col>
                        <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                            <Button type="submit" onClick={handleSubmit} name={label.name} style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                {uploadOrLoad[label.name]}
                            </Button>
                        </Col>
                        {
                            err[label.name]!==null&&
                            <Row>
                                <Col sm="3"></Col>
                                <Col sm="8">
                                    <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err[label.name]}</p>
                                </Col>
                            </Row>
                        }
                    </Form.Group>
                </Form>
                })

    return (
        <div style={{backgroundImage:"linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%)",minHeight:window_height*0.92,padding:"3% 5%"}} >
            <div className="container">                                
          
                <div className="row" style={{backgroundColor:"white",margin:"auto"}}>
                    <div className="col-md-5 col-12" style={{display:"flex",flexDirection:"column",justifyContent:"space-around",overflow:"hidden"}} >
                        <img src={steps} width="100%" style={{marginLeft:"20px"}} alt={steps}/>
                    </div>
                    <div className="col-md-7 col-12" style={{padding:"4% 3%"}} >
                        <h2 className="mb-4">Update details 
                            <div className="lead " style={{display:"inline-block",paddingLeft:"5px"}}> by tomorrow</div>
                        </h2>                                
                        {form}
                    </div>
                </div>
                
                

            </div>
        </div>
    )
    
}


