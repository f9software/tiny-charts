import * as d3 from 'd3';

export interface Props {
    id: string;
    width: number;
    height: number;
    values: number[];
    maxY?: number;
    percentage?: boolean;
    stroke?: string;
    strokeWidth: number;
}

export class Line {
    public constructor(private props: Props) {}

    render() {
        const props = this.props;
        const el = document.getElementById(props.id);
        const width = props.width;

        const maxY = props.maxY || props.height;
        const ratio = props.height / maxY;

        const svg: d3.Selection<SVGSVGElement, any, any, any> = d3.select(el).append('svg:svg');
        svg.attr('height', props.height);
        svg.attr('width', props.width);
        svg.attr('viewBox', '0 0 ' + props.width + ' ' + props.height);

        const g = svg.append('g');

        const line = d3.line()
            .x(d => d[0])
            .y(d => props.height - ratio * d[1]);

        const segmentSize = width / (props.values.length - 1);
        const data = props.values.map((v: number, index: number) => {
            return [index * segmentSize, v];
        });
    
        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', props.stroke || '#000000')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', props.strokeWidth || 1)
            .attr('d', d => {
                return line(d as [number, number][])
            });
    }
}
