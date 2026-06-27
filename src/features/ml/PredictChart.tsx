import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line, MouseHandlerDataParam,
    ReferenceArea,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {Fragment, useRef, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const blueColor = '#414ba8'
const yellowColor = '#ffb422'
const redColor = '#fa4f58'
const greenColor = 'rgba(102,187,107,0.64)'

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

const PredictChart = ({data}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [startValue, setStartValue] = useState<number | undefined>(undefined);
    const [endValue, setEndValue] = useState<number | undefined>(undefined);
    // const [isDark, setIsDark] = useState(true); // TODO: need switch by theme
    const ref = useRef({isFirstClick: false});

    const CustomDot = (props: any) => {
        const {cx, cy, payload, index, dataKey, r = 1} = props;
        const isActive = index == activeIndex;
        if (!payload[dataKey]) {
            return null;
        }

        return (
            <circle cx={cx}
                    cy={cy}
                // r={isActive ? 3 : 2.5}
                    r={r}
                    fill={props.fill}
                // stroke="#fff"
                // strokeWidth={0.5}
                    style={{cursor: 'pointer'}}
            />
        );
    };

    const handleMouseDown = (e: MouseHandlerDataParam) => {
        const val = Number(e.activeLabel);
        const isFirstClick = ref.current?.isFirstClick;
        ref.current.isFirstClick = !isFirstClick;

        console.log('ref.current.isFirstClick', ref.current.isFirstClick)

        if (ref.current.isFirstClick) {
            console.log('setStartVale')
            setStartValue(val)
            setEndValue(val)
        } else {
            console.log('setEndVale')
            setEndValue(val)
            ref.current.isFirstClick = false;
        }
    }

    const handleMouseMove = (e: MouseHandlerDataParam) => {
        const val = Number(e.activeLabel);
        const isFirstClick = ref.current?.isFirstClick;
        if (isFirstClick) {
            console.log('handleMouseMove setEndVale', val)
            setEndValue(val)
        }
    }

    return (
        <Fragment>
            <div ref={ref}>
                <Card className="pt-0">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardTitle>Temperature Forecast</CardTitle>
                            <CardDescription>
                                Actual vs predicted temperature — click to select training range
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer config={chartConfig}
                                        className="aspect-auto h-[250px] w-full">
                            <AreaChart data={data}
                                       onMouseDown={handleMouseDown}
                                       onMouseMove={handleMouseMove}>
                                <defs>
                                    <linearGradient id="colorA" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="5%" stopColor={greenColor} stopOpacity={0.2}/>
                                        <stop offset="99%" stopColor={greenColor} stopOpacity={0.001}/>
                                    </linearGradient>
                                    <linearGradient id="colorB" x1="1" y1="0" x2="0" y2="0">
                                        <stop offset="5%" stopColor={yellowColor} stopOpacity={0.2}/>
                                        <stop offset="99%" stopColor={yellowColor} stopOpacity={0.001}/>
                                    </linearGradient>
                                    <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={redColor} stopOpacity={0.8}/>
                                        <stop offset="99%" stopColor={redColor} stopOpacity={0.03}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid horizontal={true} vertical={false}
                                               strokeDasharray="3 3"
                                />
                                <XAxis dataKey='month'
                                       tickLine={false}
                                       axisLine={false}
                                       tickMargin={8}
                                       minTickGap={32}
                                />
                                {/*<YAxis label={{*/}
                                {/*    value: 'Temperature (°C)', angle: -90, position: 'insideLeft',*/}
                                {/*    // style: {textAnchor: 'middle', fill: 'white', fontSize: 14}*/}
                                {/*}}*/}
                                {/*       type="number" domain={[13, 30]} stroke={isDark ? '#94a3b8' : '#64748b'}*/}
                                {/*/>*/}
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:  '#1e293b',
                                        border: 'none',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Legend style={{marginTop: 5}}/>
                                <Area dataKey="temp"
                                      type='natural'
                                      stroke={greenColor}
                                      strokeWidth={2}
                                      fillOpacity={0.8}
                                      fill="url(#colorA)"
                                      name="temperature"
                                      dot={<CustomDot r={3} fill={greenColor}/>}
                                />
                                <Area dataKey="predict"
                                      type="natural"
                                      stroke={yellowColor}
                                      strokeWidth={2}
                                      fillOpacity={1}
                                      fill="url(#colorB)"
                                      name="predict"
                                      dot={<CustomDot fill={yellowColor}/>}
                                />
                                <Line dataKey="train"
                                      type="natural"
                                      stroke={redColor}
                                      strokeWidth={activeIndex !== null ? 3 : 3}
                                      name="train"
                                    // dot={false}
                                      dot={<CustomDot fill={redColor}/>}
                                    // dot={{ fill: '#3b82f6', r: 1.5 }}
                                    // activeDot={{ r: 8, fill: '#2563eb' }}
                                />
                                <ReferenceArea
                                    x1={startValue}
                                    x2={endValue}
                                    fill={yellowColor}
                                    fillOpacity={0.3}
                                    strokeOpacity={0.8}
                                />

                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardHeader className="flex items-center space-y-0 border-t py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardTitle>Weather data was provided by:</CardTitle>
                            <CardDescription>Open-Meteo API <a href="https://open-meteo.com">https://open-meteo.com</a></CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </Fragment>
    )
}

export {PredictChart};