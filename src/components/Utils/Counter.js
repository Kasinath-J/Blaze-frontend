import { useEffect } from "react";
import {useState} from "react";

export function Counter(props)
{
    const [curr,setCurr] = useState(0);
    const value = props.value;
    var duration = props.duration*1000;
    var increment = duration/value;
    
    useEffect(()=>{
        if(curr<value)
        {
            setTimeout(()=>{setCurr(curr+1)},increment);
        }
    },[curr])

    useEffect(()=>{
        if(curr===0 && props.value>0)
            setCurr(1);    
        else
            setCurr(0);
    },[props.year,props.search])

    return Math.ceil(curr);
}