import { Counter } from "../../../Utils/Counter";

export function GithubUser(props)
{
    return (
        <div>
            <div className="pb-1" style={{fontSize:"1.75rem"}} id="portfolioGithub">Github</div>
            
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    {
                        props.data.own_repo && props.data.own_repo.length!==0 && 
                            <div id="portfolioGithubOwnRepos" style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                                {props.data.own_repo.sort(function(a, b){
                                    return a.name.length - b.name.length;
                                }).map(
                                    (repo,index)=>{return <li key={index}><a href={repo.url} target="_blank" rel="noreferrer" style={{color:"white",textDecoration:"none"}}>{repo.name}</a></li>;}
                                ).slice(0,4)}
                            </div>
                    }
                    {
                        props.data.no_of_repositories!==0&&
                            <div id="portfolioGithubNoOfRepos" style={{"width":"120px"}}>
                                <div style={{color:"purple",backgroundColor:"white",textAlign:"center",borderRadius:"6px"}}>
                                    <p style={{fontSize:"4rem",fontWeight:"700",marginBottom:"0",borderBottom:"grey 1px solid"}}>
                                        <Counter value={props.data.no_of_repositories} duration={2}/>
                                    </p>
                                    <p className="mt-0">Repositories</p>
                                </div>
                            </div>
                    }
                    
                </div>
        </div>
    )
}