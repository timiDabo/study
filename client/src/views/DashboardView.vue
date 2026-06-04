<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, RotateCcw } from 'lucide-vue-next'
import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import PageFooter from '../components/PageFooter.vue'
import VariableSlider from '../components/VariableSlider.vue'

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip)

const oilSupply = ref(100)
const globalDemand = ref(100)
const geopoliticalRisk = ref(50)
const inventoryLevel = ref(100)

function resetVariables() {
  oilSupply.value = 100
  globalDemand.value = 100
  geopoliticalRisk.value = 50
  inventoryLevel.value = 100
}

// 确定性伪随机数：同一输入永远得到同一扰动，保证图形稳定
function seededRandom(seed) {
  const x = Math.sin(seed) * 1e4
  return x - Math.floor(x)
}

const projection = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const supplyFactor = (200 - oilSupply.value) / 100
  const demandFactor = globalDemand.value / 100
  const riskFactor = 1 + (geopoliticalRisk.value - 50) / 200
  const inventoryFactor = (200 - inventoryLevel.value) / 100
  const combined = supplyFactor * demandFactor * riskFactor * inventoryFactor

  let price = 82 * combined
  return months.map((label, i) => {
    const noise = (seededRandom(i * 17 + 3) - 0.5) * 4
    price = price + noise * 0.3 + (combined - 1) * 0.5
    return { label, price: parseFloat(Math.max(20, price).toFixed(2)) }
  })
})

const currentPrice = computed(() => projection.value[projection.value.length - 1]?.price.toFixed(2))
const avgPrice = computed(() =>
  (projection.value.reduce((sum, p) => sum + p.price, 0) / projection.value.length).toFixed(2),
)
const minPrice = computed(() => Math.min(...projection.value.map((p) => p.price)).toFixed(2))
const maxPrice = computed(() => Math.max(...projection.value.map((p) => p.price)).toFixed(2))

const chart = computed(() => ({
  data: {
    labels: projection.value.map((p) => p.label),
    datasets: [
      {
        data: projection.value.map((p) => p.price),
        borderColor: '#C9A84C',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#C9A84C',
        tension: 0.3,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart
          if (!chartArea) return 'transparent'
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(201,168,76,0.3)')
          gradient.addColorStop(1, 'rgba(201,168,76,0)')
          return gradient
        },
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#07091a',
        borderColor: 'rgba(201,168,76,0.3)',
        borderWidth: 1,
        titleColor: 'rgba(255,255,255,0.4)',
        bodyColor: '#fff',
        bodyFont: { weight: 'bold' },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (item) => '$' + item.parsed.y.toFixed(2) + '/bbl',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      },
    },
    interaction: { intersect: false, mode: 'index' },
  },
}))
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <section class="pt-32 sm:pt-44 pb-20 px-6 sm:px-12 lg:px-16">
      <div class="max-w-7xl mx-auto">
        <div class="mb-10">
          <router-link
            to="/"
            class="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Home
          </router-link>
        </div>

        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6"
        >
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]">Interactive Tool</span>
        </div>

        <div class="mb-10">
          <h1 class="text-3xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Commodity Price<br />
            <span class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent">
              Simulator
            </span>
          </h1>
          <p class="text-lg text-white/45">
            Adjust market variables to see real-time impact on oil price projections
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div class="lg:col-span-1">
            <div
              class="rounded-2xl p-6 sm:p-8 border border-[#C9A84C]/20 bg-gradient-to-br from-[#0d1225] to-[#060914] lg:sticky lg:top-24"
            >
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-black text-white">Variables</h2>
                <button
                  class="p-2 hover:bg-[#C9A84C]/10 rounded-lg transition-colors cursor-pointer"
                  title="Reset to defaults"
                  @click="resetVariables"
                >
                  <RotateCcw class="w-5 h-5 text-[#C9A84C]" />
                </button>
              </div>

              <div class="space-y-8">
                <VariableSlider v-model="oilSupply" label="Oil Supply" :min="50" :max="150" />
                <VariableSlider v-model="globalDemand" label="Global Demand" :min="50" :max="150" />
                <VariableSlider v-model="geopoliticalRisk" label="Geopolitical Risk" :min="0" :max="100" />
                <VariableSlider v-model="inventoryLevel" label="Inventory Level" :min="50" :max="150" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 space-y-8">
            <div
              class="rounded-2xl p-6 sm:p-8 border border-[#C9A84C]/20 bg-gradient-to-br from-[#0d1225] to-[#060914]"
            >
              <h2 class="text-2xl font-black text-white mb-6">12-Month Price Projection</h2>
              <div class="h-[300px]">
                <Line :data="chart.data" :options="chart.options" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div
                class="rounded-xl p-4 sm:p-6 border border-[#C9A84C]/25 bg-gradient-to-br from-[#C9A84C]/10 to-[#C9A84C]/[0.03]"
              >
                <div class="text-[10px] sm:text-xs font-black text-[#C9A84C]/60 uppercase tracking-widest mb-1 sm:mb-2">
                  Current
                </div>
                <div class="text-xl sm:text-3xl font-black text-[#C9A84C]">${{ currentPrice }}</div>
                <div class="text-[10px] text-white/30 mt-1">/bbl</div>
              </div>
              <div class="rounded-xl p-4 sm:p-6 border border-white/[0.08] bg-white/[0.03]">
                <div class="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest mb-1 sm:mb-2">
                  Avg
                </div>
                <div class="text-xl sm:text-3xl font-black text-white">${{ avgPrice }}</div>
                <div class="text-[10px] text-white/30 mt-1">12-mo</div>
              </div>
              <div class="rounded-xl p-4 sm:p-6 border border-white/[0.08] bg-white/[0.03]">
                <div class="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest mb-1 sm:mb-2">
                  Range
                </div>
                <div class="text-xs sm:text-sm font-black text-white/70 leading-tight">
                  ${{ minPrice }}<br class="sm:hidden" /><span class="hidden sm:inline"> – </span>${{ maxPrice }}
                </div>
                <div class="text-[10px] text-white/30 mt-1">min–max</div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/5 to-transparent p-8">
          <h3 class="text-xl font-black text-white mb-6">Market Insights</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p class="text-white/50">
                <span class="font-black text-[#C9A84C]">Supply Factor: </span>
                Current oil supply is at {{ oilSupply }}% of baseline.{{
                  oilSupply < 100
                    ? ' Lower supply pressures prices upward.'
                    : oilSupply > 100
                      ? ' Higher supply suppresses prices.'
                      : ' Supply is balanced.'
                }}
              </p>
            </div>
            <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p class="text-white/50">
                <span class="font-black text-[#C9A84C]">Demand Factor: </span>
                Global demand is at {{ globalDemand }}% of baseline.{{
                  globalDemand > 100
                    ? ' Strong demand supports higher prices.'
                    : globalDemand < 100
                      ? ' Weak demand pressures prices lower.'
                      : ' Demand is balanced.'
                }}
              </p>
            </div>
            <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p class="text-white/50">
                <span class="font-black text-[#C9A84C]">Geopolitical Risk: </span>
                Risk level at {{ geopoliticalRisk }}%.{{
                  geopoliticalRisk > 50
                    ? ' Elevated geopolitical tensions create upward price pressure.'
                    : ' Stable geopolitical environment.'
                }}
              </p>
            </div>
            <div class="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <p class="text-white/50">
                <span class="font-black text-[#C9A84C]">Inventory Position: </span>
                Global inventories at {{ inventoryLevel }}% of baseline.{{
                  inventoryLevel < 100
                    ? ' Tight inventories increase price volatility.'
                    : ' Adequate inventory levels provide price stability.'
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <PageFooter year="2024" />
  </div>
</template>
