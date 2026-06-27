// @ts-ignore
const CardsFlex = ({children, cols=1, marginTop=2, marginBottom=2}) => {
    return (<div
        // style={{marginTop, marginBottom}}
        className={`grid grid-cols-${cols} gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card`}>
        {children}
    </div>)
}

export {CardsFlex}