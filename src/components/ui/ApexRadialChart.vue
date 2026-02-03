<template>
  <apexchart
    type="radialBar"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import { darkModeState } from '../../composables/useDarkMode'

/**
 * ApexRadialChart Component
 * Reusable radial/circular progress chart with dark mode support
 * 
 * @component
 * @props {Array} series - Chart data series (percentage values)
 * @props {Array} labels - Chart labels
 * @props {Array} colors - Chart colors (optional)
 * @props {String|Number} height - Chart height (default: 320)
 * @props {String} hollowSize - Hollow circle size (default: '60%')
 * @props {Function} valueFormatter - Value formatter function (optional)
 */
export default {
  name: 'ApexRadialChart',
  
  props: {
    series: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      default: () => ['Progress']
    },
    colors: {
      type: Array,
      default: () => ['#3C50E0']
    },
    height: {
      type: [String, Number],
      default: 320
    },
    hollowSize: {
      type: String,
      default: '60%'
    },
    valueFormatter: {
      type: Function,
      default: (val) => val.toFixed(2) + '%'
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
          type: 'radialBar',
          fontFamily: 'inherit',
          background: 'transparent'
        },
        colors: this.colors,
        plotOptions: {
          radialBar: {
            hollow: {
              size: this.hollowSize
            },
            dataLabels: {
              name: {
                fontSize: '14px',
                color: this.isDark ? '#94a3b8' : '#64748b',
                offsetY: 25
              },
              value: {
                fontSize: '32px',
                fontWeight: 'bold',
                color: this.isDark ? '#f1f5f9' : '#1e293b',
                offsetY: -10,
                formatter: this.valueFormatter
              }
            }
          }
        },
        labels: this.labels
      }
    }
  }
}
</script>
