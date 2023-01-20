//https://codeforces.com/blog/entry/3064
export function CodeforcesUser(props)
{
    return  <div id="portfolioCodeforces">
                <div style={{fontSize:"1.75rem"}}>Codeforces</div>
                {props.data.rank&&<p>
                    {props.data.rank}
                    </p>}
            </div>
    
}