import * as d3 from 'd3'
import React from 'react';
import { useEffect, useRef } from 'react';

type inner = { label: string, value: number, color: string | null }
type data = inner[]
type config = { label: boolean }
const arc = (radius: number) => d3
    .arc()
    .innerRadius(radius)
    .outerRadius(radius);
const pie = (radius: number) => d3
    .pie()
    .sort(null)
    .padAngle((0.15 / 50) * radius)
    //@ts-ignore
    .value(d => d.value);
const strokeWidth = 7;
const radius = 50 - strokeWidth / 2;
const center = radius + strokeWidth / 2
const color = (x: any) => x.data.color || "#85929E"
// const d3color = d3.scaleOrdinal(d3.schemeCategory10)
// const colors = (x: any) => d3color(x.index)

export default class Donut extends React.Component<{ data: data, config?: config }>{
    svg?: React.RefObject<SVGSVGElement>
    groupsArcs?: d3.Selection<SVGGElement, d3.PieArcDatum<number | {
        valueOf(): number;
    }>, SVGGElement, unknown>
    group?: any
    constructor(props: any) {
        super(props)
        this.svg = React.createRef<SVGSVGElement>()
    }
    animate = () => {
        if (!this.groupsArcs) return;
        this.groupsArcs
            .selectAll('path')
            .transition()
            .delay((d, i) => i)
            .duration(1000)
            .attrTween('d', function (d, i) {
                //@ts-ignore
                if (!this._current) this._current = { startAngle: 0, endAngle: 0 }
                //@ts-ignore
                const interpolate = d3.interpolate(this._current, d);
                //@ts-ignore
                this._current = interpolate(0);
                return function (t) {
                    //@ts-ignore
                    return arc(radius)(interpolate(t));
                };
            })
            .attr('stroke-dashoffset', 0);
    }
    enter = (e: any) => e
        .append("g")
        .append('path')
        //@ts-ignore
        .attr('d', arc(radius))
        .attr('fill', "none")
        //@ts-ignore
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth * 0.8)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-dasharray', radius * Math.PI * 2)
        .attr('stroke-dashoffset', radius * Math.PI * 2)
    componentDidMount() {
        //@ts-ignore
        const svg = d3.select(this.svg.current)
        this.group = svg
            .append('g')
            .attr('transform', `translate(${100} ${center})`);
        this.group
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', radius)
            .attr('transform', 'rotate(-90)')
            .attr('fill', 'none')
            .attr('stroke', '#EBEDEF')
            .attr('stroke-width', strokeWidth * 0.8)
            .attr('stroke-linecap', 'round')
        this.group
            .selectAll('g')
            //@ts-ignore
            .data(pie(radius)(this.props.data))
            .join(this.enter, (update: any) => update, (exit: any) => { })
        this.groupsArcs = this.group.selectAll('g')

        if (this.props.config?.label == true || !this.props.config) {
            //@ts-ignore
            const groupsText = this.groupsArcs
                .append("g")
                .html(() => '')
                .style('opacity', 0)
                .style('visibility', 'hidden');
            groupsText
                .append('rect')
                .attr('width', 3)
                .attr('height', 3)
                .attr('fill', color)
                .attr('transform', (d, i) => {
                    return `translate(${radius + 10} ${i * 10 - radius + 2.5})`;
                })
            groupsText
                .append('text')
                .attr('font-size', 8)
                .attr('fill', color)
                .attr('transform', (d, i) => {
                    return `translate(${radius + 15} ${i * 10 - radius + strokeWidth})`;
                })
                //@ts-ignore
                .html(({ data: d }) => `<tspan class="select-none" x="0">${d.label}:${d.value}</tspan>`)
            groupsText
                .transition()
                .ease(d3.easeLinear)
                .delay((d, i) => i * 200)
                .duration(200)
                .style('opacity', 1)
                .style('visibility', 'visible');
        }
        this.animate()
    }
    componentDidUpdate() {
        this.group
            .selectAll('g')
            //@ts-ignore
            .data(pie(radius)(this.props.data))
            .join(this.enter,
                (update: any) => {
                    update.select("path")
                }, (exit: any) => {
                    exit.call((exit: any) => {
                        exit.transition().duration(1000).style("opacity", 0).remove()
                    })
                })
        //@ts-ignore
        this.groupsArcs = this.group.selectAll('g')
        this.animate()
    }
    render(): React.ReactNode {
        return (
            //@ts-ignore
            <svg ref={this.svg} viewBox={'0 0 200 100'}></svg>
        )
    }
}