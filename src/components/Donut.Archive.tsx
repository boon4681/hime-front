import * as d3 from 'd3'
import React from 'react';
import { useEffect, useRef } from 'react';

type inner = { label: string, value: number, color: string | null }
type data = inner[]
type config = { label: boolean }
const x = ({ data, config }: { data: data, config?: config }) => {
    const r = useRef()
    const strokeWidth = 7;
    const radius = 50 - strokeWidth / 2;
    const center = radius + strokeWidth / 2
    const color = (x: any) => x.data.color || "#85929E"
    useEffect(() => {
        // //@ts-ignore
        // const svg = d3.select(r.current)
        // const strokeWidth = 7;
        // const radius = 50 - strokeWidth / 2;
        // const center = radius + strokeWidth / 2
        // const color = (x: any) => x.data.color || "#85929E"
        // const group = svg
        //     .append('g')
        //     .attr('transform', `translate(${100} ${center})`);
        // const pie = d3
        //     .pie()
        //     .sort(null)
        //     .padAngle((0.15 / 50) * radius)
        //     //@ts-ignore
        //     .value(d => d.value);
        // group.append('circle')
        //     .attr('cx', 0)
        //     .attr('cy', 0)
        //     .attr('r', radius)
        //     .attr('transform', 'rotate(-90)')
        //     .attr('fill', 'none')
        //     .attr('stroke', '#EBEDEF')
        //     .attr('stroke-width', strokeWidth * 0.8)
        //     .attr('stroke-linecap', 'round')
        // const groupsArcs = group
        //     .selectAll('g')
        //     //@ts-ignore
        //     .data(pie(data))
        //     .enter()
        // const arc = d3
        //     .arc()
        //     .innerRadius(radius)
        //     .outerRadius(radius);

        // groupsArcs
        //     .append('path')
        //     //@ts-ignore
        //     .attr('d', arc)
        //     .attr('fill', "none")
        //     .join((e) => e, (e) => e.attr("fill", "lightgrey"), (e) => { e.remove()})
        //     //@ts-ignore
        //     .attr('stroke', color)
        //     .attr('stroke-width', strokeWidth * 0.8)
        //     .attr('stroke-linecap', 'round')
        //     .attr('stroke-linejoin', 'round')
        //     .attr('stroke-dasharray', radius * Math.PI * 2)
        //     .attr('stroke-dashoffset', radius * Math.PI * 2)


        // if (config?.label == true || !config) {
        //     const groupsText = groupsArcs
        //         .append("g")
        //         .html(() => '')
        //         .style('opacity', 0)
        //         .style('visibility', 'hidden');
        //     groupsText
        //         .append('rect')
        //         .attr('width', 3)
        //         .attr('height', 3)
        //         .attr('fill', color)
        //         .attr('transform', (d, i) => {
        //             return `translate(${radius + 10} ${i * 10 - radius + 2.5})`;
        //         })
        //     groupsText
        //         .append('text')
        //         .attr('font-size', 8)
        //         .attr('fill', color)
        //         .attr('transform', (d, i) => {
        //             return `translate(${radius + 15} ${i * 10 - radius + strokeWidth})`;
        //         })
        //         //@ts-ignore
        //         .html(({ data: d }) => `<tspan class="select-none" x="0">${d.label}:${d.value}</tspan>`)
        //     groupsText
        //         .transition()
        //         .ease(d3.easeLinear)
        //         .delay((d, i) => i * 200)
        //         .duration(200)
        //         .style('opacity', 1)
        //         .style('visibility', 'visible');
        // }
        // groupsArcs
        //     .selectAll('path')
        //     .transition()
        //     .delay((d, i) => i)
        //     .duration(1000)
        //     .attrTween('d', function (d) {
        //         //@ts-ignore
        //         const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        //         return function (t) {
        //             //@ts-ignore
        //             return arc(interpolate(t));
        //         };
        //     })
        //     .attr('stroke-dashoffset', 0);
    }, [data]);
    return (
        //@ts-ignore
        <svg ref={r} viewBox={'0 0 200 100'}>
            <g transform={`translate(${100} ${center})`}>
            </g>
        </svg>
    )
}