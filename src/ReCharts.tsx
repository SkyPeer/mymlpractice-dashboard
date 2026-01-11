import {useState, useEffect, useContext, useRef} from 'react';
import {
    LineChart,
    Line,
    Area,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Scatter,
    ComposedChart,
    ZAxis,
    ReferenceArea, MouseHandlerDataParam
} from 'recharts';
import {MemoizedModels} from "./Models.tsx";
import {TrainingsContext} from './context.ts'
import Progress from "./Progress.tsx";

const blueColor = '#414ba8'
const yellowColor = '#ffb422'
const redColor = '#fa4f58'
const greenColor = 'rgba(102,187,107,0.64)'

export default function ReCharts() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDark, setIsDark] = useState(true); // TODO: need switch by theme
    const [data, setData] = useState([{month: null, temp: null, train: null, predict: null}]);
    const {trainings} = useContext(TrainingsContext);

    // ---------------------------------------------------------
    const [startValue, setStartValue] = useState<number | null>(null);
    const [endValue, setEndValue] = useState<number | null>(null);
    const ref = useRef({isFirstClick: false});
    const getData = async () => {
        const res = await fetch('http://localhost:3000/forecast/data')
        const data = await res.json()
        // TODO: Will be delete!
        if (data[36]) {
            data[36].train = data[36].predict
        }

        setData(data)
    }

    useEffect(() => {getData()}, [])

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

        if(ref.current.isFirstClick) {
            console.log('setStartVale')
            setStartValue(val)
            setEndValue(val)
        } else {
            console.log('setEndVale')
            setEndValue(val)
            ref.current.isFirstClick = false;
        }
    };

    const handleMouseMove = (e: MouseHandlerDataParam) => {
        const val = Number(e.activeLabel);
        const isFirstClick = ref.current?.isFirstClick;
        if(isFirstClick) {
            console.log('handleMouseMove setEndVale', val)
            setEndValue(val)
        }
    }

    return (

        <div
            className={`min-h-screen p-8 transition-colors ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`} ref={ref}>
                    <MemoizedModels onTrainingDone={async () => {
                        await getData()
                    }}/>
                    <Progress/>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}
                                   onMouseDown={handleMouseDown}
                                   onMouseMove={handleMouseMove}
                                   // onMouseUp={handleMouseUp}
                        >
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
                            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3"
                                           stroke={isDark ? '#475569' : '#e2e8f0'}/>
                            <XAxis dataKey='month' stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <YAxis label={{
                                value: 'Temperature (°C)', angle: -90, position: 'insideLeft',
                                style: {textAnchor: 'middle', fill: 'white', fontSize: 14}
                            }}
                                   type="number" domain={[13, 30]} stroke={isDark ? '#94a3b8' : '#64748b'}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
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

                    </ResponsiveContainer>
                    <div style={{display: 'flex', justifyContent: 'center', color: 'gray'}}>
                        <span>Weather data was provided by Open-Meteo API https://open-meteo.com/</span>
                    </div>

                    <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Trainings
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={trainings}>
                            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3"
                                           stroke={isDark ? '#475569' : '#e2e8f0'}/>
                            <XAxis
                                label={{
                                    value: 'Epoch', position: 'insideBottom', offset: -2,
                                    style: {textAnchor: 'middle', fill: 'white', fontSize: 14}
                                }}
                                dataKey='epoch' stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <YAxis
                                label={{
                                    value: 'Loss', angle: -90, position: 'insideLeft',
                                    style: {textAnchor: 'middle', fill: 'white', fontSize: 14}
                                }}
                                type="number" domain={[-50, 500]}
                                stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            {/*<Legend/>*/}
                            <Area dataKey="loss"
                                  type="natural"
                                  stroke={yellowColor}
                                  strokeWidth={2}
                                  fillOpacity={1}
                                  fill="url(#colorB)"
                                  name="training"
                                  dot={<CustomDot fill={yellowColor}/>}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div></div>
                </div>
            </div>
        </div>

    );
}