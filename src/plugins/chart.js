import axios from 'axios'
import Chart from 'chart.js/auto'

const getColors = () => {
    // axios.get('https://www.colr.org/json/colors/random/20').then(res => {
    //     console.log(JSON.stringify(res.data.colors.map(el => '#' + el.hex)))
    // })
    return ["#ced8d7","#e7c8b3","#296184","#f5e5dc","#c9e4ee","#3b4349","#d7b1d2","#ffe6c3","#e0e5e7","#c29f9d","#744957","#fffac0","#5d6571","#bdb5bb","#86968b","#dbd9d7","#8db6cf","#c8c6bb","#e4d8d4"]

}



const chart = (ctx = HTMLElement , type = String, data = Object, args = {}) => {
    const colors = getColors()

    const choices = {
        bar_chart: {
            type: 'bar',
            data: {
                labels: data.map(el => {
                    return el.value
                }),
                datasets: [{
                    label: 'Verdeling leeftijd',
                    backgroundColor: colors[2],

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
                        backgroundColor: colors[index],

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
        }
    }

    
    const chartType = choices[type].type
    const chartOptions = choices[type].options
    const chartData = choices[type].data

    return new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: chartOptions,
        ...args
    })
}
export { chart, Chart }