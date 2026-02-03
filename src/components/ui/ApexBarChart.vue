<template>
  <apexchart
    type="bar"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import { darkModeState } from '../../composables/useDarkMode'

/**
 * ApexBarChart Component
 * Reusable bar chart with dark mode support
 * 
 * @component
 * @props {Array} series - Chart data series
 * @props {Array} categories - X-axis categories
 * @props {Array} colors - Chart bar colors (optional)
 * @props {String|Number} height - Chart height (default: 280)
 * @props {Function} yAxisFormatter - Y-axis label formatter function (optional)
 * @props {Function} tooltipFormatter - Tooltip value formatter function (optional)
 */
export default {
  name: 'ApexBarChart',
  
  props: {
    series: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: {
      type: Array,
      default: () => ['#3C50E0']
    },
    height: {
      type: [String, Number],
      default: 280
    },
    yAxisFormatter: {
      type: Function,
      default: (value) => value
    },
    tooltipFormatter: {
      type: Function,
      default: (value) => value
    },
    columnWidth: {
      type: String,
      default: '60%'
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
          type: 'bar',
          toolbar: { show: false },
          fontFamily: 'inherit',
          background: 'transparent'
        },
        colors: this.colors,
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: this.columnWidth
          }
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: this.categories,
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: this.isDark ? '#94a3b8' : '#64748b'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: this.yAxisFormatter,
            style: {
              colors: this.isDark ? '#94a3b8' : '#64748b'
            }
          }
        },
        grid: {
          borderColor: this.isDark ? '#334155' : '#f1f5f9',
          strokeDashArray: 5
        },
        tooltip: {
          theme: this.isDark ? 'dark' : 'light',
          y: {
            formatter: this.tooltipFormatter
          }
        }
      }
    }
  }
}
</script>
