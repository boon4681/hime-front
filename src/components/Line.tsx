import React from "react";
import * as d3 from "d3"

const generateRanNum = (size: number) => {
    return [...new Array(size)].map(a => Math.random() * 25 + 75)
}

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
export default class Line extends React.Component {
    svg: React.RefObject<SVGSVGElement> = React.createRef<SVGSVGElement>()
    componentDidMount() {
        //@ts-ignore
        const svg = d3.select(this.svg.current)
        let input: dataset = {
            dataset: [
                {
                    data: [...new Array(100)].map((a, i) => {
                        return { "x": i * 10, "y": Math.random() * 25 + 75 };
                    }),
                    config: {
                        color: "salmon"
                    }
                },
                {
                    data: [...new Array(100)].map((a, i) => {
                        return { "x": i * 10, "y": Math.random() * 25 + 75 };
                    })
                }
            ],
            x: (d: any) => d.x,
            y: (d: any) => d.y
        }
        const data = input.dataset
        const color = (d: any) => (d.config) ? (d.config.color) ? d.config.color : "#85929E" : "#85929E"
        const areas = (d: any) => (d.config) ? (d.config.area) ? d.config.area : false : false
        //@ts-ignore
        const maxX = Math.max(...data.map(a => a.data.map(input.x)).flat(Infinity))
        //@ts-ignore
        const maxY = Math.max(...data.map(a => a.data.map(input.y)).flat(Infinity))
        const x = d3.scaleLinear().domain([0, maxX]).range([0, 200])
        const y = d3.scaleLinear().domain([0, maxY]).range([100, 0])
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
        const path = group
            .append("path")
            .attr("fill", "none")
            .attr("stroke", color)
            .attr('stroke-width', strokeWidth * 0.8)
            .attr("d", d => {
                //@ts-ignore
                return line(d.data)
            })
            .attr("clip-path", "url(#animate)")
        const path2 = group.append("path")
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
    render(): React.ReactNode {
        return (
            <>
                <svg ref={this.svg} viewBox={'0 0 200 100'}></svg>
            </>
        )
    }
}