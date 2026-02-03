<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{{ t('dashboard.title') }}</h1>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ t('dashboard.subtitle') }}</p>
    </div>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Customers Card -->
      <StatCard
        :title="t('dashboard.totalCustomers')"
        value="3,782"
        change="+11.01%"
        :label="t('dashboard.fromLastMonth')"
        trend="up"
        variant="primary"
      >
        <template #icon>
          <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </template>
      </StatCard>
      
      <!-- Orders Card -->
      <StatCard
        :title="t('dashboard.totalOrders')"
        value="5,359"
        change="+9.05%"
        :label="t('dashboard.fromLastMonth')"
        trend="up"
        variant="success"
      >
        <template #icon>
          <svg class="w-7 h-7 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </template>
      </StatCard>
      
      <!-- Revenue Card -->
      <StatCard
        :title="t('dashboard.totalRevenue')"
        value="$48.5K"
        change="+23.1%"
        :label="t('dashboard.fromLastMonth')"
        trend="up"
        variant="warning"
      >
        <template #icon>
          <svg class="w-7 h-7 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </template>
      </StatCard>
      
      <!-- Products Card -->
      <StatCard
        :title="t('dashboard.totalProducts')"
        value="1,234"
        change="-2.4%"
        :label="t('dashboard.fromLastMonth')"
        trend="down"
        variant="danger"
      >
        <template #icon>
          <svg class="w-7 h-7 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </template>
      </StatCard>
    </div>
    
    <!-- Charts and Tables Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Monthly Sales Chart -->
      <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ t('dashboard.monthlySales') }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{{ t('dashboard.salesPerformance') }}</p>
          </div>
          <select 
            v-model="selectedPeriod"
            class="text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option>{{ t('dashboard.thisMonth') }}</option>
            <option>{{ t('dashboard.lastMonth') }}</option>
            <option>{{ t('dashboard.thisYear') }}</option>
          </select>
        </div>
        <ApexBarChart
          :series="barChartSeries"
          :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
          :colors="['#3C50E0']"
          :yAxisFormatter="(value) => '$' + (value / 1000).toFixed(1) + 'K'"
          :tooltipFormatter="(value) => '$' + value.toLocaleString()"
          height="280"
        />
      </div>
      
      <!-- Monthly Target -->
      <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ t('dashboard.monthlyTarget') }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{{ t('dashboard.targetDescription') }}</p>
        </div>
        <ApexRadialChart
          :series="radialChartSeries"
          :labels="[t('dashboard.targetAchieved')]"
          :colors="['#3C50E0']"
          height="320"
        />
        <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div class="text-center">
            <p class="text-xs text-slate-600 dark:text-slate-400 mb-1">{{ t('dashboard.target') }}</p>
            <p class="text-lg font-bold text-slate-900 dark:text-slate-100">$20K</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-600 dark:text-slate-400 mb-1">{{ t('dashboard.revenue') }}</p>
            <p class="text-lg font-bold text-success-600">$15.1K</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-slate-600 dark:text-slate-400 mb-1">{{ t('dashboard.today') }}</p>
            <p class="text-lg font-bold text-primary-600">$1.2K</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Additional Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Trend -->
      <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ t('dashboard.revenueTrend') }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{{ t('dashboard.revenueTrendDescription') }}</p>
        </div>
        <ApexAreaChart
          :series="areaChartSeries"
          :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
          :colors="['#10B981']"
          :yAxisFormatter="(value) => '$' + (value / 1000).toFixed(0) + 'K'"
          :tooltipFormatter="(value) => '$' + value.toLocaleString()"
          height="280"
        />
      </div>
      
      <!-- Sales by Category -->
      <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ t('dashboard.salesByCategory') }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{{ t('dashboard.categoryDescription') }}</p>
        </div>
        <ApexDonutChart
          :series="donutChartSeries"
          :labels="[t('dashboard.electronics'), t('dashboard.clothing'), t('dashboard.foodBeverage'), t('dashboard.others')]"
          :colors="['#3C50E0', '#10B981', '#F59E0B', '#EF4444']"
          :totalLabel="t('dashboard.totalSales')"
          height="280"
        />
      </div>
    </div>
    
    <!-- Recent Orders Table -->
    <div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ t('dashboard.recentOrders') }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{{ t('dashboard.recentOrdersDescription') }}</p>
          </div>
          <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">{{ t('common.viewAll') }}</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{{ t('dashboard.product') }}</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">{{ t('dashboard.category') }}</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{{ t('dashboard.price') }}</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">{{ t('common.status') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
            <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0"></div>
                  <div>
                    <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{{ order.product }}</p>
                    <p class="text-xs text-slate-600 dark:text-slate-400">{{ order.variants }} {{ t('dashboard.variants') }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 hidden sm:table-cell">
                <span class="text-sm text-slate-600 dark:text-slate-400">{{ order.category }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ order.price }}</span>
              </td>
              <td class="px-6 py-4 hidden md:table-cell">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  order.status === 'Delivered' ? 'bg-success-100 text-success-700' :
                  order.status === 'Pending' ? 'bg-warning-100 text-warning-700' :
                  'bg-danger-100 text-danger-700'
                ]">
                  {{ t('dashboard.' + order.status.toLowerCase()) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from '../components/ui/StatCard.vue'
import ApexBarChart from '../components/ui/ApexBarChart.vue'
import ApexAreaChart from '../components/ui/ApexAreaChart.vue'
import ApexRadialChart from '../components/ui/ApexRadialChart.vue'
import ApexDonutChart from '../components/ui/ApexDonutChart.vue'
import { languageState } from '../composables/useLanguage'
import { translate } from '../locales'

/**
 * Dashboard View
 * Main dashboard page with statistics and charts
 * 
 * @component
 * @description Displays various charts using ApexCharts library including bar, area, radial, and donut charts
 */
export default {
  name: 'Dashboard',
  
  components: {
    StatCard,
    ApexBarChart,
    ApexAreaChart,
    ApexRadialChart,
    ApexDonutChart
  },
  
  data() {
    return {
      selectedPeriod: 'This Month',
      languageState,
      
      recentOrders: [
        { id: 1, product: 'Macbook pro 13"', variants: 2, category: 'Laptop', price: '$2,399.00', status: 'Delivered' },
        { id: 2, product: 'Apple Watch Ultra', variants: 1, category: 'Watch', price: '$879.00', status: 'Pending' },
        { id: 3, product: 'iPhone 15 Pro Max', variants: 2, category: 'SmartPhone', price: '$1,869.00', status: 'Delivered' },
        { id: 4, product: 'iPad Pro 3rd Gen', variants: 2, category: 'Electronics', price: '$1,699.00', status: 'Canceled' },
        { id: 5, product: 'Airpods Pro 2nd Gen', variants: 1, category: 'Accessories', price: '$240.00', status: 'Delivered' }
      ],
      
      // Bar Chart Configuration
      barChartSeries: [{
        name: 'Sales',
        data: [6500, 4500, 8000, 6000, 7500, 5000, 9000, 5500, 7000, 4000, 8500, 9500]
      }],
      
      // Radial Chart Series
      radialChartSeries: [75.55],
      
      // Area Chart Series
      areaChartSeries: [{
        name: 'Revenue',
        data: [12000, 15000, 13000, 18000, 16000, 22000, 19000, 25000, 23000, 28000, 26000, 32000]
      }],
      
      // Donut Chart Series
      donutChartSeries: [44, 28, 18, 10]
    }
  },
  
  methods: {
    /**
     * Translate helper
     */
    t(key) {
      return translate(this.languageState.currentLang, key)
    }
  }
}

</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
