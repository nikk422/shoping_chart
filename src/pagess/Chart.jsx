import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const Chart=({data})=>{
    let chartData = []
    if (data.last7Days !== undefined){
        for (let [k,v] of Object.entries(data.last7Days)){
            chartData = [...chartData,{day:k.slice(0,3)+" "+k.slice(8,10),count:v}]
        };
    };
    return (
        <>
        <ResponsiveContainer width="95%" aspect={3}>
            <LineChart data={chartData.reverse()}>
                <CartesianGrid vertical={false}/>
                <XAxis dataKey="day" interval={"preserveEnd"}/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey="count" activeDot={{r:8}} strokeWidth={4} type="monotone"/>
            </LineChart>
        </ResponsiveContainer>
        </>
    )
}

export default Chart;