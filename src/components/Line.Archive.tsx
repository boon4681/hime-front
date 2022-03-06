import React from "react";
import * as d3 from "d3"

const generateRanNum = (size: number) => {
    return [...new Array(size)].map(a => Math.random() * 25 + 75)
}
const strokeWidth = 1
export default class Line extends React.Component {
    svg: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>()
    componentDidMount() {
        //@ts-ignore
        const svg = d3.select(this.svg.current)
        const data = [...new Array(100)].map((a, i) => {
            return { "x": i * 10, "y": 50 - Math.random() * 10 }
        })
        const group = svg.append("g")
        const x = d3.scaleLinear().domain([0, 1000]).range([0, 200])
        const y = d3.scaleLinear().domain([0, 100]).range([20, 100])
        const line = d3.line()
            //@ts-ignore
            .x(d => x(d.x))
            //@ts-ignore
            .y(d => y(d.y))
            .curve(d3.curveBasis)
        const area = d3.area()
            //@ts-ignore
            .x(d => x(d.x))
            .y0(100)
            //@ts-ignore
            .y1(d => y(d.y))
            .curve(d3.curveBasis)
        const path = group
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "salmon")
            .attr('stroke-width', strokeWidth * 0.8)
            //@ts-ignore
            .attr("d", line(data))
        const clip = group
            .append("clipPath")
            .attr("id", "rectClip")
            .append("rect")
            .attr("width", 0)
            .attr("height", 100)
        const path2 = group.append("path")
            .attr("fill", "salmon")
            .style("opacity", 0.7)
            //@ts-ignore
            .attr("d", area(data))
            .attr("clip-path", "url(#rectClip)")
        const length = path.node()?.getTotalLength()
        //@ts-ignore
        path.attr("stroke-dashoffset", (length, length))
            //@ts-ignore
            .attr("stroke-dasharray", length)
            .transition().duration(2000)
            .attr("stroke-dashoffset", 0)
        clip.transition().duration(2000).attr("width", 200)
    }
    render(): React.ReactNode {
        return (
            <>
                <svg ref={this.svg} viewBox={'0 0 200 100'}></svg>
            </>
        )
    }
}