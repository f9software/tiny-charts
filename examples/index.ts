import {Line} from '../src/Line';

window.onload = () => {

    const line = new Line({
        id: 'chart1',
        width: 100,
        height: 15,
        values: [0, 1, 4, 2, 8, 6, 10, 12, 15, 4, 3, 2, 1],
        stroke: '#ff2828',
        strokeWidth: 2.5
        // maxY: 15
    });
    line.render();

    const line2 = new Line({
        id: 'chart1',
        width: 100,
        height: 15,
        values: [60, 19, 44, 28, 86, 65, 109, 122, 9, 44, 28, 86, 65, 109, 122, 9, 44, 28, 86, 65, 109, 122, 15, 94, 23, 42, 11],
        stroke: 'green',
        strokeWidth: 1.5,
        maxY: 122
        // maxY: 15
    });
    line2.render();
};
