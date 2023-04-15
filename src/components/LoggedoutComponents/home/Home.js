import { useState,useEffect } from "react";

import Card from 'react-bootstrap/Card';

import { axiosInstance } from "../../axios/loggedoutAxios";
import tce_csbs_image from "../../../images/home/tce_csbs.png"
import tce_logo from "../../../images/home/tce_logo.png"
import unknown_image from "../../../images/home/unknown.jpg"
import working_image from "../../../images/home/working.png"
import asi_logo from "../../../images/home/ASI.png"


function Photo(props) {
    return (
    <>
      <Card style={{ height: '80%', margin:"3% 15%" }}>
        {
            props.data.img?
            <Card.Img variant="top" src={props.data.img} height="80%" alt={props.data.position}/>
            :
            <Card.Img variant="top" src={unknown_image} height="80%" alt={props.data.position}/>
        }
        <Card.Body className="px-0">
            <div  style={{textAlign:"center",padding:"0",margin:"0",fontSize:"0.85rem",fontWeight:"500"}}>
                {props.data.name}
            </div>
        </Card.Body>
      </Card>
      <p className="my-2" style={{fontSize:"0.9rem",fontWeight:"400",textAlign:"center",}}>{props.data.position}</p>
    </>
    );
  }

export function Home(){

    const [data,setData] = useState(null);

    useEffect(() => {
		axiosInstance.get('office/officebearer/')
        .then((res) => {
            setData(res.data);
		})
	}, []);

    return(
        <>
            <section id="home_main_image">
                <img src={tce_csbs_image} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="tce_csbs" />
            </section>

            <section id="home_about_tce">
                <div style={{backgroundColor:"#a9917a",padding:"8%",color:"white"}}>
                    <div className="container" >
                        <div className="row justify-content-center" >
                            <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center" style={{textAlign:"center"}}>
                                <img src={tce_logo} width="100%" alt="" />
                            </div>
                            <div className="col-lg-9 col-12" >
                                <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About TCE</h1>
                                <p className="lead">Spread across 143 acres, The institution and hostels are located near Thirupparankundram on the outskirts of Madurai, 8 kilometres south-west of the city of Madurai. With the motto of "வினையே உயிர்" (Duty is Life), TCE aims at creating quality professionals to meet the emerging industrial and social needs through innovative teaching, applied research and industrial interaction.</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>

            <section id="home_about_csbs">
                <div style={{backgroundColor:"white",padding:"8%",color:"black"}}>
                    <div className="container" >
                        <div className="row justify-content-center" >
                            <div className="col-lg-9 col-12 order-3 order-lg-1" >
                                <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About CSBS</h1>
                                <p className="lead">TCE offers a four-year Bachelor of Technology (B.Tech.) degree programme in Computer Science and Business Systems (CSBS) in association with Tata Consultancy Services (TCS) from the academic year 2020-21. This Programme is approved by AICTE.  The curriculum is designed with the support from Tata Consultancy services and is customized in CDIO framework of our Institution. The students are trained in emerging topics such as Analytics, Machine Learning, Cloud Computing, Cyber security, Internet of Things etc to make them industry ready.</p>
                            </div>
                            <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center order-2" style={{textAlign:"center"}}>
                                <img src={working_image} width="100%" alt="working_image" />
                            </div>
                        </div> 
                    </div>
                </div>
            </section>

            <section id="home_about_csbs_association">
                <div style={{backgroundColor:"black",padding:"8%",color:"white"}}>
                    <div className="container" >
                        <div className="row justify-content-center" >
                            <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center" style={{textAlign:"center"}}>
                                <img src={tce_logo} width="100%" alt="" />
                            </div>
                            <div className="col-lg-9 col-12" >
                                <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About CSBS Association</h1>
                                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque perspiciatis, ex quam quas deserunt suscipit minus commodi corporis animi vitae aperiam, a sint ipsum rem recusandae maiores. Excepturi, eaque velit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nemo cupiditate alias quidem, corrupti repellat perspiciatis eligendi possimus velit quas quae itaque ex pariatur rem, nesciunt ipsam id expedita laborum.</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
            
            <section id="home_csbs_office_bearers">
                {data&&data.length>0&&
                    <div style={{backgroundColor:"white",padding:"8%",color:"black"}}>
                        <div className="container" >

                            <div style={{padding:"3% 0 5%",textAlign:"center"}}>
                                <h1 className="display-3" style={{fontWeight:"500"}}>
                                    CSBSA Office Bearers
                                </h1>
                                <h3><small className="text-muted">Of Academic Year {data[0].present_academic_year}</small></h3>    
                                </div>
                            
                            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                            {
                                data.sort((a,b)=>a.rank-b.rank).filter((d)=>{return d.officetype==='CSBSA'}).map((d)=>{
                                    return <div className="col-6 col-md-3" key={d.id}>
                                                <Photo data={d}/>
                                            </div>
                                })
                            }
                            </div>
                                

                        </div>
                    </div>
                }
            </section>

            <section id="home_about_asi_association">
                <div style={{backgroundColor:"black",padding:"8%",color:"white"}}>
                    <div className="container" >
                        <div className="row justify-content-center" >
                            <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center" style={{textAlign:"center"}}>
                                <img src={asi_logo} width="100%" alt="" />
                            </div>
                            <div className="col-lg-9 col-12" >
                                <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About ASI</h1>
                                <p className="lead">Analytics Society of India is the first and largest body of analytics professionals and organisations in India. It is a nationallevel not-for-profit organization. The society has been founded by eminent personalities from Indian Institute ofScience, Bangalore (IISc) and Indian Institute of Management, Bangalore (IIMB) with an objective of promoting andpropagating knowledge in the area of analytics. Various blue-chip corporate organisations, educational institutionsand individuals from across the country are members of this society. ASI provides a platform for organisations andpeople to come together to share their knowledge, resources and address their challenges in the field of analytics. It promotes research and application in this domain. ASI regularly organizes workshops, seminars, conferences, andtechnical talks for the benefit of professionals in analytics domain.</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
            
            <section id="home_asi_office_bearers">
                {data&&data.length>0&&
                    <div style={{backgroundColor:"white",padding:"8%",color:"black"}}>
                        <div className="container" >

                            <div style={{padding:"3% 0 5%",textAlign:"center"}}>
                                <h1 className="display-3" style={{fontWeight:"500"}}>
                                    ASI Office Bearers
                                </h1>
                                <h3><small className="text-muted">Of Academic Year {data[0].present_academic_year}</small></h3>    
                                </div>
                            
                            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                            {
                                data.sort((a,b)=>a.rank-b.rank).filter((d)=>{return d.officetype==='ASI'}).map((d)=>{
                                    return <div className="col-6 col-md-3" key={d.id}>
                                                <Photo data={d}/>
                                            </div>
                                })
                            }
                            </div>
                                

                        </div>
                    </div>
                }
            </section>

            <section id="home_footer">
                <div style={{backgroundColor:"black",padding:"4%",color:"white",borderTop:"1px solid white"}}>
                    <div className="container" >
                        <div className="row">
                            <div className="col-md-6 col-12 mb-3" style={{overflowWrap: "break-word"}}>
                                <h4>Official Website : </h4>
                                <a target="_blank" rel="noreferrer" href="https://www.tce.edu/academics/departments/computer-science-and-business-system">https://www.tce.edu/academics/departments/computer-science-and-business-system</a>
                            </div>
                            <div className="col-md-6 col-12 mb-3">
                                <h4>Developer : </h4>
                                <a className="lead" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/kasinath-j-2881a6200/">Kasinath J</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
