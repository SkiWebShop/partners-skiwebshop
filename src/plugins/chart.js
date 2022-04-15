import axios from 'axios'
import Chart from 'chart.js/auto'

const getColors = (color = null, alpha = 1) => {
    // axios.get('https://www.colr.org/json/colors/random/20').then(res => {
    //     console.log(JSON.stringify(res.data.colors.map(el => '#' + el.hex)))
    // })
    const colors = [{
            red: 43,
            green: 147,
            blue: 249,
        },
        {
            red: 51,
            green: 246,
            blue: 161,
        },
        {
            red: 25,
            green: 210,
            blue: 225,
        },
        {
            red: 107,
            green: 107,
            blue: 254,
        },
        {
            red: 253,
            green: 132,
            blue: 190,
        },
        {
            red: 253,
            green: 91,
            blue: 110,
        },
        {
            red: 254,
            green: 157,
            blue: 81,
        },
        {
            red: 255,
            green: 193,
            blue: 23,
        },
        {
            red: 255,
            green: 243,
            blue: 28,
        }
    ]

    const getColor = (color = Object) => {
        return `rgba(${Object.values(color).join(',')}, ${alpha})`
    }

    if (color === null) {
        const newColors = colors.map(el => getColor(el))
        return newColors
    }


    if (parseInt(color) > colors.length) {
        const number = colors.length - parseInt(color)
        return number
    } else {
        return getColor(colors[parseInt(color)])
    }
}



const chart = (ctx = HTMLElement, type = String, data = Object, chartArgs = { chart_title: String, chart_label: String, chart_datatype: String }, args = {}) => {

    const choices = {
        bar_chart: {
            type: 'bar',
            data: {
                labels: data.map(el => el.label),
                datasets: [{
                    label: chartArgs.chart_label,
                    backgroundColor: getColors(0),

                    data: data.map(el => el.value)
                }]
            },
        },
        stacked_bar_chart: {
            type: 'bar',
            data: {
                labels: [chartArgs.chart_label],
                datasets: data.map((el, index) => {
                    return {
                        label: el.label,
                        data: [el.value],
                        backgroundColor: getColors(index),

                    }
                })
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        stacked: true,
                        display: false,

                    },
                    y: {
                        stacked: true,
                        display: false,
                    }
                }
            }
        },
        pie_chart: {
            type: 'pie',
            data: {
                labels: data.map(el => el.label),
                datasets: [{
                    label: 'Verdeling leeftijd',
                    backgroundColor: getColors(),
                    borderColor: getColors(null, 0.1),
                    data: data.map(el => el.value)
                }]
            }
        }
    }


    const chartType = choices[type].type
    const chartOptions = choices[type].options
    const chartData = choices[type].data


    const chartObj = {
        type: chartType,
        data: chartData,
        options: {
            plugins: {},
            scales: {},
            ...chartOptions
        },
        ...args
    }

    chartObj['options']['maintainAspectRatio'] = false

    const assign = (obj, keyPath, value) => {
        let lastKeyIndex = keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            let key = keyPath[i];
            if (!(key in obj)) {
                obj[key] = {}
            }
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

    if (chartArgs.chart_title) {
        chartObj['options']['plugins']['title'] = {
            position: 'top',
            display: true,
            text: chartArgs.chart_title
        }
    }

    const datatypes = {
        percentage: {
            properties: (type) => {
                if(!['pie_chart', 'stacked_bar_chart'].includes(type)){
                    assign(chartObj, ['options', 'scales', 'y', 'ticks'], {
                        callback: (val, index) => `${val * 100}%`
                    });
                }
                
                assign(chartObj, ['options','plugins', 'tooltip', 'callbacks', 'label'] , (val) => {
                    return`${val.dataset.label}: ${Math.round(val.raw * 1000000) / 10000}%`
                })
            },
        }
    }

    if (chartArgs.chart_datatype && chartArgs.chart_datatype in datatypes) {
            datatypes[chartArgs.chart_datatype].properties(type)
    }


    chartObj['options']['plugins']['legend'] = {
        position: 'bottom'
    }


    return new Chart(ctx, chartObj)
}
export { chart, Chart }