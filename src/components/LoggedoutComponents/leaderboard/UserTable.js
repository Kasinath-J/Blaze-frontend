import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

export function UserTable(props){
    var user_data=[];
    var iteration = Math.min(10,props.user_values.length);
    for(let i=0;i<iteration;i++)
    {
        user_data.push(
            <tr key={i}>
                <td style={{padding:"5% 3% 5% 5%",fontSize:"0.95rem",textAlign:"center"}}>
                    <Link to={"/user/" + props.user_values[i].email}>
                        {props.user_values[i].name}
                    </Link>
                </td>
                {/* <td style={{padding:"3%",fontSize:"0.95rem"}}>{props.user_values[i].value}</td> */}
            </tr>)
    }
    return(
        <div style={{borderRadius:"3px",backgroundColor:"white"}}>
            <h3 style={{fontSize:"1.5rem",padding:"5% 0 2%",margin:"0",textAlign:"center",backgroundColor:props.bgcolor}}>
                Top {iteration} Users
                <p style={{fontSize:"15px",fontWeight:"400",marginTop:"5px"}}>Total : {props.total}</p>
            </h3>
            <div>
                <Table striped bordered hover style={{margin:"0",padding:"0"}}>
                    <thead>
                        <tr>
                            <th style={{padding:"5%",textAlign:"center"}}>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user_data}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
