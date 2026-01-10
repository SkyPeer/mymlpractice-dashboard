import { useState } from 'react';
import Card from '@mui/material/Card';
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ComposedChart, ZAxis } from 'recharts';

export default function ReChartsExample() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDark, setIsDark] = useState(false);

    // Sample data
    const data = [
        { month: 'Jan', seriesA: 2, seriesB: 3 },
        { month: 'Feb', seriesA: 5.5, seriesB: 4 },
        { month: 'Mar', seriesA: 2, seriesB: 6 },
        { month: 'Apr', seriesA: 8.5, seriesB: 5 },
        { month: 'May', seriesA: 1.5, seriesB: 7 },
        { month: 'Jun', seriesA: 5, seriesB: 6 },
        { month: 'Jul', seriesA: 7, seriesB: 8 },
        { month: 'Aug', seriesA: 4, seriesB: 7 },
        { month: 'Sep', seriesA: 6, seriesB: 9 },
        { month: 'Oct', seriesA: 3, seriesB: 8 },
    ];

    // Scatter data points (anomalies or special events)
    const scatterData = [
        { month: 'Feb', value: 5.5, size: 400, label: 'Peak' },
        { month: 'Apr', value: 8.5, size: 600, label: 'Record High' },
        { month: 'Jul', value: 7, size: 300, label: 'Event' },
    ];

    const handleMouseMove = (state) => {
        if (state && state.activeTooltipIndex !== undefined) {
            setActiveIndex(state.activeTooltipIndex);
        }
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (

            <div className={`min-h-screen p-8 transition-colors ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-8 flex items-center justify-center gap-4">
                    <div>
                        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            Line Chart Examples
                        </h1>
                        <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                            Highlighting, Gradient Areas, and Interactive Features
                        </p>
                    </div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            isDark
                                ? 'bg-slate-700 text-white hover:bg-slate-600'
                                : 'bg-slate-800 text-white hover:bg-slate-700'
                        }`}
                    >
                        {isDark ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>

                {/* Example 1: Basic Line with Highlighting */}
                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        1. Line Chart with Hover Highlighting
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={data}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#475569' : '#e2e8f0'} />
                            <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
                            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="seriesA"
                                stroke="#3b82f6"
                                strokeWidth={activeIndex !== null ? 2 : 3}
                                name="Series A"
                                dot={{ fill: '#3b82f6', r: 4 }}
                                activeDot={{ r: 8, fill: '#2563eb' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="seriesB"
                                stroke="#10b981"
                                strokeWidth={activeIndex !== null ? 2 : 3}
                                name="Series B"
                                dot={{ fill: '#10b981', r: 4 }}
                                activeDot={{ r: 8, fill: '#059669' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    {activeIndex !== null && (
                        <p className={`mt-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Hovering over: {data[activeIndex].month}
                        </p>
                    )}
                </div>

                {/* Example 2: Area Chart with Gradient */}
                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        2. Area Chart with Gradient Fill
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#475569' : '#e2e8f0'} />
                            <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
                            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="seriesA"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorA)"
                                name="Revenue"
                            />
                            <Area
                                type="monotone"
                                dataKey="seriesB"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorB)"
                                name="Profit"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Example 3: Combined - Smooth Area with Gradient */}
                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        3. Line Chart + Scatter Chart (ComposedChart)
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data}>
                            <defs>
                                <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#475569' : '#e2e8f0'} />
                            <XAxis
                                dataKey="month"
                                stroke={isDark ? '#94a3b8' : '#64748b'}
                                label={{ value: 'Time Period', position: 'insideBottom', offset: -5, fill: isDark ? '#94a3b8' : '#64748b' }}
                            />
                            <YAxis
                                stroke={isDark ? '#94a3b8' : '#64748b'}
                                label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: isDark ? '#94a3b8' : '#64748b' }}
                            />
                            <ZAxis range={[100, 600]} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="seriesA"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorPurple)"
                                name="Sales Trend"
                            />
                            <Line
                                type="monotone"
                                dataKey="seriesB"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                name="Target"
                                dot={{ fill: '#f59e0b', r: 3 }}
                            />
                            <Scatter
                                data={scatterData}
                                dataKey="value"
                                fill="#ef4444"
                                name="Key Events"
                                shape="star"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <div className={`mt-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <p>💡 This chart combines:</p>
                        <ul className="list-disc list-inside ml-4 mt-2">
                            <li>Area chart (purple gradient) showing sales trend</li>
                            <li>Line chart (orange) showing target values</li>
                            <li>Scatter points (red stars) highlighting key events</li>
                        </ul>
                    </div>
                </div>

                {/* Example 4: Multiple Scatter Series */}
                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        4. Advanced: Line + Multiple Scatter Series
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#475569' : '#e2e8f0'} />
                            <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
                            <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#0f172a'
                                }}
                            />
                            <Legend />

                            {/* Base line */}
                            <Line
                                type="monotone"
                                dataKey="seriesA"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name="Main Metric"
                                dot={false}
                            />

                            {/* Scatter for high values */}
                            <Scatter
                                data={data.filter(d => d.seriesA > 6)}
                                dataKey="seriesA"
                                fill="#10b981"
                                name="Above Target"
                                shape="circle"
                            />

                            {/* Scatter for low values */}
                            <Scatter
                                data={data.filter(d => d.seriesA < 3)}
                                dataKey="seriesA"
                                fill="#ef4444"
                                name="Below Target"
                                shape="triangle"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <div className={`mt-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <p>🎯 This example shows conditional scatter points:</p>
                        <ul className="list-disc list-inside ml-4 mt-2">
                            <li>Green circles mark values above 6 (exceeding target)</li>
                            <li>Red triangles mark values below 3 (needs attention)</li>
                        </ul>
                    </div>
                </div>

                {/* Key Features List */}
                <div className={`rounded-xl shadow-lg p-6 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Key Features Used:
                    </h3>
                    <div className={`grid md:grid-cols-2 gap-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div>
                            <p className="font-semibold text-blue-600 mb-2">Highlighting:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>activeDot prop for hover effects</li>
                                <li>onMouseMove/onMouseLeave for tracking</li>
                                <li>Dynamic strokeWidth changes</li>
                                <li>Dot size scaling on hover</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-green-600 mb-2">Gradients:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>linearGradient in defs section</li>
                                <li>Area component for filled charts</li>
                                <li>fill="url(#gradientId)" pattern</li>
                                <li>stopColor and stopOpacity for effects</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-purple-600 mb-2">Mixed Charts:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>ComposedChart for combining types</li>
                                <li>Mix Line, Area, and Scatter</li>
                                <li>Different shapes: circle, star, triangle</li>
                                <li>Filter data for conditional display</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-orange-600 mb-2">Scatter Features:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>ZAxis for sizing scatter points</li>
                                <li>Custom shapes and colors</li>
                                <li>Separate data arrays for scatter</li>
                                <li>Highlight special data points</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}