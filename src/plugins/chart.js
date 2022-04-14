import axios from 'axios'
import Chart from 'chart.js/auto'

const getColors = (color = null) => {
    // axios.get('https://www.colr.org/json/colors/random/20').then(res => {
    //     console.log(JSON.stringify(res.data.colors.map(el => '#' + el.hex)))
    // })
    const colors = [
        'rgb(43, 147, 249)',
        'rgb(51, 246, 161)',
        'rgb(25, 210, 225)',
        'rgb(107, 107, 254)',
        'rgb(253, 132, 190)',
        'rgb(253, 91, 110)',
        'rgb(254, 157, 81)',
        'rgb(255, 193, 23)',
        'rgb(255, 243, 28)',
    ]

    if(color === null) {
        return colors
    }

    if( parseInt(color) > colors.length ) {
        const number = colors.length - parseInt(color)
        return number
    } else {
        return colors[parseInt(color)]
    }
}



const chart = (ctx = HTMLElement , type = String, data = Object, args = {}) => {

    const choices = {
        bar_chart: {
            type: 'bar',
            data: {
                labels: data.map(el => el.label ),
                datasets: [{
                    label: 'Verdeling leeftijd',
                    backgroundColor: getColors(0),

                    data: data.map(el => el.value )
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                            callback: function (val, index) {
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
                labels: data.map(el => el.label ),
                datasets: [{
                    label: 'Verdeling leeftijd',
                    backgroundColor: getColors(),

                    data: data.map(el => el.value )
                }]
            },
            options: {}
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
    console.log(chartObj)

    return new Chart(ctx, chartObj)
}
export { chart, Chart }