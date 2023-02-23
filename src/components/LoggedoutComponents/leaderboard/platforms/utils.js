
export var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)

graph_height = Math.max(graph_height,175)


export function rearrangeTable(table,search)
{
    for(var i=0;i<table.length;i++)
    {
        if(table[i].email === search)
        {
            var temp = table[i];
            temp.name = '( Rank '+(i+1)+') '+temp.name ;
            table.splice(i,1);
            table.unshift(temp);
            break;
        }
    }
    return table;
}

export function axisY (dict) {
    return {
        title : 'title' in dict ? dict['title'] : null,
        includeZero: dict['includeZero'],
        gridColor: "white",
        interval: dict['interval'],
        labelFontSize: 7,
        labelFontWeight: "lighter",
        titleFontColor: "#595959",
        labelFontColor: "#595959",
        lineColor: "#595959",
        tickLength: 1,
        lineThickness: 0,
    }    
    
}

export function axisX (dict) {
    
    return {
        title:dict['title'],
        labelFontSize: 0,
        tickThickness: 0,
        titleFontColor: "#595959",
        labelFontColor: "#595959",
        lineColor: "#595959",
        lineThickness: 0,
    }    
    
}

export function blackToolTip(){
    return {
        fontColor:"black",
        fontSize:13,
        fontWeight:"lighter",
        borderThickness: 0,
        backgroundColor: "rgba(255,255,255,0.75)",
        borderColor: "rgba(255,255,255,0.75)",
        animationEnabled: true,
    }
}

export function sharedTooltip(dict){
    return {
        shared: dict['shared'],
        fontSize:13,
        fontWeight:"lighter",
        reversed: dict['reversed'],
        borderThickness: 0,
        backgroundColor: "rgba(255,255,255,0.75)",
        borderColor: "rgba(255,255,255,0.75)",
        animationEnabled: true,
    }
}