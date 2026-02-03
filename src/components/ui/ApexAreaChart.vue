<template>
  <apexchart
    type="area"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import { darkModeState } from '../../composables/useDarkMode'

/**
 * ApexAreaChart Component
 * Reusable area chart with gradient fill and dark mode support
 * 
 * @component
 * @props {Array} series - Chart data series
 * @props {Array} categories - X-axis categories
 * @props {Array} colors - Chart line colors (optional)
 * @props {String|Number} height - Chart height (default: 280)
 * @props {Function} yAxisFormatter - Y-axis label formatter function (optional)
 * @props {Function} tooltipFormatter - Tooltip value formatter function (optional)
 * @props {Number} strokeWidth - Line stroke width (default: 3)
 */
export default {
  name: 'ApexAreaChart',
  
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
      default: () => ['#10B981']
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
    strokeWidth: {
      type: Number,
      default: 3
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
          type: 'area',
          toolbar: { show: false },
          fontFamily: 'inherit',
          background: 'transparent'
        },
        colors: this.colors,
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        dataLabels: { enabled: false },
        stroke: {
          curve: 'smooth',
          width: this.strokeWidth
        },
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
