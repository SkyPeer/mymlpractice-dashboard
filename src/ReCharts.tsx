import {useState, useEffect, useContext} from 'react';
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
    ReferenceArea
} from 'recharts';
import {MemoizedModels} from "./Models.tsx";
import {RechartWithArea} from "./RechartWithArea.tsx";
import {TrainingsContext} from './context.ts'
import {LoadingContext} from "./context.ts";
import Progress from "./Progress.tsx";

const blueColor = '#414ba8'
const yellowColor = '#ffb422'
const redColor = '#fa4f58'

export default function ReCharts() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDark, setIsDark] = useState(true); // TODO: need switch by theme
    const [data, setData] = useState([{month: null, temp: null, train: null, predict: null}]);
    const {trainings, setTrainings} = useContext(TrainingsContext);
    const {setLoading} = useContext(LoadingContext);

    const getData = async () => {
        const resJson = await fetch('http://localhost:3000/forecast/data')
        const dataParsed = await resJson.json()
        setData(dataParsed)
    }

    useEffect(() => {
        getData()
        // getTrainings(68)
    }, [])

    const CustomDot = (props: any) => {
        const {cx, cy, payload, index, dataKey} = props;
        const isActive = index == activeIndex;
        if (!payload[dataKey]) {
            return null;
        }

        return (
            <circle cx={cx}
                    cy={cy}
                    r={isActive ? 3 : 2.5}
                    fill={props.fill}
                // stroke="#fff"
                // strokeWidth={0.5}
                    style={{cursor: 'pointer'}}
            />
        );
    };

    return (

        <div
            className={`min-h-screen p-8 transition-colors ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-8 flex items-center justify-center gap-4">
                    <div>
                        <h1 className={`text-4xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            Line Chart
                        </h1>
                        <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                            Highlighting, Gradient Areas, and Interactive Features
                        </p>
                    </div>
                    {/*<button*/}
                    {/*    onClick={() => setIsDark(!isDark)}*/}
                    {/*    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${*/}
                    {/*        isDark*/}
                    {/*            ? 'bg-slate-700 text-white hover:bg-slate-600'*/}
                    {/*            : 'bg-slate-800 text-white hover:bg-slate-700'*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    {isDark ? '☀️ Light' : '🌙 Dark'}*/}
                    {/*</button>*/}
                </div>

                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>

                    {/*<RechartWithArea />*/}

                    <MemoizedModels onTrainingDone={async () => {
                        await getData()
                    }}
                    />

                    {/*    onChangeModel={(modelId: number) => {*/}
                    {/*        return getTrainings(modelId)*/}
                    {/*    }}*/}
                    {/*    // onChangeModel={getTrainings(modelId)}*/}
                    {/*/>*/}
                    <Progress />
                    <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Random Temperature Char
                    </h2>

                    {/*<button onClick={() => {*/}
                    {/*    getData();*/}
                    {/*    // getTrainings(68)*/}
                    {/*}}>UpdateData*/}
                    {/*</button>*/}

                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}
                            // onMouseDown={(e) => console.log({start: e.activeLabel, end: null})}
                            // onMouseUp={(e) => console.log({start: e.activeLabel, end: null})}
                        >
                            <defs>
                                <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="2%" stopColor={blueColor} stopOpacity={0.8}/>
                                    <stop offset="99%" stopColor={blueColor} stopOpacity={0.03}/>
                                </linearGradient>
                                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={yellowColor} stopOpacity={0.8}/>
                                    <stop offset="99%" stopColor={yellowColor} stopOpacity={0.03}/>
                                </linearGradient>
                                <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={redColor} stopOpacity={0.8}/>
                                    <stop offset="99%" stopColor={redColor} stopOpacity={0.03}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3"
                                           stroke={isDark ? '#475569' : '#e2e8f0'}/>
                            <XAxis dataKey='month' stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <YAxis type="number" domain={[13, 30]} stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            <Legend/>
                            <Area dataKey="temp"
                                  type="natural"
                                  stroke={blueColor}
                                  strokeWidth={2}
                                  fillOpacity={1}
                                  fill="url(#colorA)"
                                  name="tempature"
                                  dot={<CustomDot fill={blueColor}/>}
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
                                  strokeWidth={activeIndex !== null ? 2 : 2}
                                  name="train"
                                // dot={false}
                                  dot={<CustomDot fill={redColor}/>}
                                // dot={{ fill: '#3b82f6', r: 1.5 }}
                                // activeDot={{ r: 8, fill: '#2563eb' }}
                            />
                            {/*<ReferenceArea*/}
                            {/*    x1={5}*/}
                            {/*    x2={10}*/}
                            {/*    y1={12}*/}
                            {/*    y2={27}*/}
                            {/*    fill="rgba(0, 255, 0, 0.3"*/}
                            {/*    fillOpacity={1}*/}
                            {/*    strokeOpacity={0}*/}
                            {/*    // style={{backgroundColor: "green", borderRadius: 15}}*/}
                            {/*/>*/}
                        </AreaChart>
                    </ResponsiveContainer>
                    <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Trainings
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={trainings}>
                            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3"
                                           stroke={isDark ? '#475569' : '#e2e8f0'}/>
                            <XAxis dataKey='epoch' stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <YAxis type="number" domain={[-50, 500]}
                                   stroke={isDark ? '#94a3b8' : '#64748b'}/>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            <Legend/>
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
                </div>
            </div>
        </div>

    );
}