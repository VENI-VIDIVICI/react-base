import VirtualList from "."

function Demo() {
    const data = new Array(120).fill(0).map((_,i) => i)
    return (
        <VirtualList height={300} itemHeight={20} data={data}>
            {({item}) => {
                return <div style={{width:"100px",  border: "1px solid", height: item % 2 == 0 ? "30px":"50px"}}>{item}</div>
            }}
        </VirtualList>
    )
}
export default Demo