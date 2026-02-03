<template>
  <apexchart
    type="donut"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import { darkModeState } from '../../composables/useDarkMode'

/**
 * ApexDonutChart Component
 * Reusable donut/pie chart with dark mode support
 * 
 * @component
 * @props {Array} series - Chart data series (numeric values)
 * @props {Array} labels - Chart segment labels
 * @props {Array} colors - Chart segment colors (optional)
 * @props {String|Number} height - Chart height (default: 280)
 * @props {String} donutSize - Donut inner size (default: '65%')
 * @props {Function} valueFormatter - Value formatter for center display (optional)
 * @props {String} totalLabel - Label for total display (optional)
 */
export default {
  name: 'ApexDonutChart',
  
  props: {
    series: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      default: () => ['#3C50E0', '#10B981', '#F59E0B', '#EF4444']
    },
    height: {
      type: [String, Number],
      default: 280
    },
    donutSize: {
      type: String,
      default: '65%'
    },
    valueFormatter: {
      type: Function,
      default: (val) => val + '%'
    },
    totalLabel: {
      type: String,
      default: 'Total'
    }
  },
  
  data() {
    return {
      darkModeState
    }
  },
  
  computed: {
    isDark() {
      return this.darkModeState.isDark
    },
    
    chartOptions() {
      return {
        chart: {
          type: 'donut',
          fontFamily: 'inherit',
          background: 'transparent'
        },
        colors: this.colors,
        labels: this.labels,
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          labels: {
            colors: this.isDark ? '#94a3b8' : '#64748b'
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: this.donutSize,
              labels: {
                show: true,
                name: {
                  fontSize: '14px',
                  color: this.isDark ? '#94a3b8' : '#64748b'
                },
                value: {
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: this.isDark ? '#f1f5f9' : '#1e293b',
                  formatter: this.valueFormatter
                },
                total: {
                  show: true,
                  label: this.totalLabel,
                  fontSize: '14px',
                  color: this.isDark ? '#94a3b8' : '#64748b',
                  formatter: () => {
                    const total = this.series.reduce((a, b) => a + b, 0)
                    return this.valueFormatter(total)
                  }
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        }
      }
    }
  }
}
</script>
