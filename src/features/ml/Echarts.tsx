import {useEffect, useRef, useContext, Fragment, useState, useLayoutEffect} from 'react';
import * as echarts from 'echarts';
import {SidebarContext} from "@/components/ui/sidebar.tsx";

// Reusable hook
function useECharts(ref, option) {
    const chartRef = useRef(null);

    const sideBarCTX = useContext(SidebarContext);
    const open = sideBarCTX?.open

    // TODO: for Resize, need changed on resize bt ResizeObserver || useLayoutEffect
    const [isOpen, setIsOpen] = useState(false);

    // useLayoutEffect(() => {
    //     const { width } = ref.current.getBoundingClientRect();
    //     setTooltipHeight(height);
    // }, []);
    // TODO: -----------------------------------------------------------------------

    useEffect(() => {
        if (!ref.current) return;
        if (!chartRef.current) {
            chartRef.current = echarts.init(ref.current);
        }
        chartRef.current.setOption(option, true);

        const ro = new ResizeObserver(() => chartRef.current?.resize());
        ro.observe(ref.current);
        //setIsOpen(open);
        return () => {
            console.log("ro.disconnect()");
            // ro.disconnect();
        };
    }, [option, open]);

}

// Chart component
const ECharts = ({mainRef}) => {
    const el = useRef(null);
    const sideBarCTX = useContext(SidebarContext);
    const open = sideBarCTX?.open


    useECharts(el, {
        xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
        yAxis: {type: 'value'},
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            },
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320].reverse(),
                type: 'line',
                smooth: true
            }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    });

    useEffect(() => {
        console.log('useEffect isOpen mainRef', mainRef.current.offsetWidth)
    }, [open]);

    return (
        <Fragment>
            {/*<button onClick={()=>setttt(!ttt)}> ttt </button>*/}
            <div ref={el} style={{width: '100%', height: 300}}/>
            <div style={{width: '100%', backgroundColor: 'green'}}> GREEN 100% </div>
            <div><button onClick={()=>console.log('props', mainRef)}> TTT </button></div>
        </Fragment>
    );
}


export {ECharts};