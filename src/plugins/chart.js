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
        console.log(newColors)
        return newColors
    }


    if (parseInt(color) > colors.length) {
        const number = colors.length - parseInt(color)
        return number
    } else {
        return getColor(colors[parseInt(color)])
    }
}



const chart = (ctx = HTMLElement, type = String, data = Object, title = String, args = {}) => {

    const choices = {
        bar_chart: {
            type: 'bar',
            data: {
                labels: data.map(el => el.label),
                datasets: [{
                    label: 'Verdeling leeftijd',
                    backgroundColor: getColors(0),

                    data: data.map(el => el.value)
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                            callback: function(val, index) {
                                return `${val * 100}%`
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (val) => {
                                return `${Math.round(val.raw * 10000) / 100}%`
                            }
                        }
                    }
                }
            }
        },
        stacked_bar_chart: {
            type: 'bar',
            data: {
                labels: ['alle'],
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
                plugins: {},
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
            },
            options: {
                plugins: {}
            }
        }
    }


    const chartType = choices[type].type
    const chartOptions = choices[type].options
    const chartData = choices[type].data


    const chartObj = {
        type: chartType,
        data: chartData,
        options: chartOptions,
        ...args
    }

    chartObj['options']['responsive'] = true
    chartObj['options']['maintainAspectRatio'] = false

    if (title) {
        chartObj['options']['plugins']['title'] = {
            position: 'top',
            display: true,
            text: title
        }
    }

    chartObj['options']['plugins']['legend'] = {
        position: 'bottom'
    }


    console.log(chartObj)

    return new Chart(ctx, chartObj)
}
export { chart, Chart }