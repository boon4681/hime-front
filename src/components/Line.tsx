import React from "react";
import * as d3 from "d3"

type config = {
    color?: string,
    area?: boolean
}
type data = {
    data: { [key: string]: any }[],
    config?: config
}

type dataset = {
    dataset: data[],
    x: (d: any) => number,
    y: (d: any) => number,
}

const strokeWidth = 2
export default class Line extends React.Component<{ dataset: dataset }> {
    svg: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>()
    lines: any
    areas: any
    get = ({ data, input }: any) => {
        //@ts-ignore
        const maxX = Math.max(...data.map(a => a.data.map(input.x)).flat(Infinity))
        //@ts-ignore
        const maxY = Math.max(...data.map(a => a.data.map(input.y)).flat(Infinity))
        const x = d3.scaleLinear().domain([0, maxX]).range([0, 200])
        const y = d3.scaleLinear().domain([0, maxY + strokeWidth]).range([100, 0])
        const line = d3.line()
            //@ts-ignore
            .x(d => x(d.x))
            //@ts-ignore
            .y(d => y(d.y))
            .curve(d3.curveCardinal)
        const area = d3.area()
            //@ts-ignore
            .x(d => x(d.x))
            .y0(100)
            //@ts-ignore
            .y1(d => y(d.y))
            .curve(d3.curveCardinal)
        return { line, area, maxX, maxY }
    }
    componentDidMount() {
        //@ts-ignore
        const svg = d3.select(this.svg.current)
        let input: dataset = this.props.dataset
        const data = input.dataset
        const color = (d: any) => (d.config) ? (d.config.color) ? d.config.color : "#85929E" : "#85929E"
        const areas = (d: any) => (d.config) ? (d.config.area) ? d.config.area : false : false
        const { area, line } = this.get({ data, input })
        const clip = svg
            .append("clipPath")
            .attr("id", "animate")
            .append("rect")
            .attr("width", 0)
            .attr("height", 100)
        const group = svg
            .selectAll("g")
            .data(data)
            .join("g")
        this.lines = group
            .append("path")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr('stroke-width', strokeWidth * 0.8)
            .attr("d", d => {
                //@ts-ignore
                return line(d.data)
            })
            .attr("clip-path", "url(#animate)")
        this.areas = group.append("path")
            .attr("fill", color)
            .style("opacity", 0.7)
            //@ts-ignore
            .attr("d", d => {
                //@ts-ignore
                return (areas(d)) ? area(d.data) : ""
            })
            .attr("clip-path", "url(#animate)")
        clip.transition().duration(2000).attr("width", 200)
    }
    componentDidUpdate() {
        let input: dataset = this.props.dataset
        const data = input.dataset
        //@ts-ignore
        const svg = d3.select(this.svg.current)
        const { area, line } = this.get({ data, input })
        const group = svg
            .selectAll("g")
            .data(data)
            .join("g", (e: any) => {
                e.select("path")
                    .transition()
                    .duration(500)
                    //@ts-ignore
                    .attr("d", d => {
                        //@ts-ignore
                        return line(d.data)
                    })
                return e
            })

    }
    render(): React.ReactNode {
        return (
            <>
                <svg ref={this.svg} viewBox={'0 0 200 100'}></svg>
            </>
        )
    }
}