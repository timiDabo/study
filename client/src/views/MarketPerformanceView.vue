<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, ChartColumn } from 'lucide-vue-next'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import PageFooter from '../components/PageFooter.vue'

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Filler, Tooltip)

const activeTab = ref('forecast')

const tabs = [
  { id: 'forecast', label: 'Forecast Analytics' },
  { id: 'risk', label: 'Risk Metrics' },
  { id: 'curve', label: 'Term Structure' },
  { id: 'factor', label: 'Factor Model' },
]

const heroPills = [
  'Sharpe Ratio: 3.84',
  'α = 17.7pp',
  '10Y Track Record',
  'VaR-Adjusted',
  'Proprietary Factor Model',
  'Institutional Grade',
]

const statCards = [
  { v: '94.2%', l: 'Forecast Accuracy', sub: 'Season 2026', gold: true },
  { v: '3.84', l: 'Sharpe Ratio', sub: 'Risk-adj.', gold: true },
  { v: '+17.7pp', l: 'Alpha vs. Field', sub: 'Annualised', gold: false },
  { v: '49/52', l: 'Win Rate', sub: "Q1'26", gold: false },
  { v: '1.84', l: 'Sortino Ratio', sub: 'Downside-adj.', gold: false },
  { v: '76.5%', l: 'Field Avg', sub: 'Peer benchmark', gold: false },
  { v: '−8.4%', l: '95% VaR', sub: 'Brent 1M', gold: false },
  { v: '0.987', l: 'Brent/WTI', sub: 'Correlation', gold: false },
]

const accuracyData = [
  { year: 2017, jeffrey: 78, field: 65, alpha: 13 },
  { year: 2018, jeffrey: 81, field: 66, alpha: 15 },
  { year: 2019, jeffrey: 78, field: 62, alpha: 16 },
  { year: 2020, jeffrey: 82, field: 64, alpha: 18 },
  { year: 2021, jeffrey: 85, field: 67, alpha: 18 },
  { year: 2022, jeffrey: 88, field: 70, alpha: 18 },
  { year: 2023, jeffrey: 90, field: 72, alpha: 18 },
  { year: 2024, jeffrey: 91, field: 74, alpha: 17 },
  { year: 2025, jeffrey: 93, field: 75, alpha: 18 },
  { year: 2026, jeffrey: 94.2, field: 76.5, alpha: 17.7 },
]

const quarterlyRecord = [
  { q: "Q1'24", wins: 6, losses: 0, accuracy: 100 },
  { q: "Q2'24", wins: 6, losses: 1, accuracy: 85.7 },
  { q: "Q3'24", wins: 7, losses: 0, accuracy: 100 },
  { q: "Q4'24", wins: 6, losses: 0, accuracy: 100 },
  { q: "Q1'25", wins: 6, losses: 1, accuracy: 85.7 },
  { q: "Q2'25", wins: 6, losses: 0, accuracy: 100 },
  { q: "Q3'25", wins: 6, losses: 1, accuracy: 85.7 },
  { q: "Q4'25", wins: 6, losses: 0, accuracy: 100 },
  { q: "Q1'26", wins: 5, losses: 0, accuracy: 100 },
]

// Radar axis labels (8-factor model)
const radarFactors = [
  { name: 'OPEC+ Supply Discipline', signal: 'Bullish', weight: 18 },
  { name: 'Global Demand Growth', signal: 'Bullish', weight: 15 },
  { name: 'Inventory Draw Rate', signal: 'Bullish', weight: 14 },
  { name: 'Geopolitical Risk Premium', signal: 'Bullish', weight: 13 },
  { name: 'USD / DXY Strength', signal: 'Bearish', weight: 12 },
  { name: 'Refinery Crack Spreads', signal: 'Neutral', weight: 11 },
  { name: 'Speculative Positioning', signal: 'Bullish', weight: 9 },
  { name: 'Seasonality', signal: 'Bullish', weight: 8 },
]

// Factor decomposition bars
const factorScores = [
  { name: 'Supply Tightness', score: 84, weight: 18, signal: 'Bullish' },
  { name: 'Demand Moment...', score: 91, weight: 15, signal: 'Bullish' },
  { name: 'Geopolitical Risk', score: 73, weight: 13, signal: 'Bearish' },
  { name: 'Inventory Deviation', score: 67, weight: 12, signal: 'Neutral' },
  { name: 'Curve Structure', score: 88, weight: 14, signal: 'Bullish' },
  { name: 'Positioning (CoT)', score: 62, weight: 9, signal: 'Caution' },
  { name: 'Macro Correlation', score: 79, weight: 11, signal: 'Bullish' },
  { name: 'Seasonality', score: 55, weight: 8, signal: 'Neutral' },
]

const correlationRows = [
  { pair: 'Brent/WTI', corr: 0.987, regime: 'Structural', regimeColor: 'text-[#C9A84C]', basis: '$4.2/bbl' },
  { pair: 'Brent/Copper', corr: 0.614, regime: 'Cyclical', regimeColor: 'text-blue-400', basis: 'n/a' },
  { pair: 'Brent/Gold', corr: -0.182, regime: 'Hedging', regimeColor: 'text-red-400', basis: 'n/a' },
  { pair: 'TTF/HH Gas', corr: 0.341, regime: 'LNG Arb', regimeColor: 'text-emerald-400', basis: '€18.4/MWh' },
  { pair: 'Copper/Gold', corr: 0.271, regime: 'Risk-On/Off', regimeColor: 'text-purple-400', basis: 'n/a' },
  { pair: 'Uranium/Gas', corr: 0.189, regime: 'Power Mix', regimeColor: 'text-pink-400', basis: 'n/a' },
]

const riskCorrelationRows = [
  { pair: 'Brent/WTI', corr: 0.987, regime: 'Structural', regimeColor: 'text-[#C9A84C]', basis: '$4.2/bbl' },
  { pair: 'Brent/Copper', corr: 0.614, regime: 'Cyclical', regimeColor: 'text-blue-400', basis: 'n/a' },
  { pair: 'Brent/Gold', corr: -0.182, regime: 'Hedging', regimeColor: 'text-red-400', basis: 'n/a' },
  { pair: 'TTF/HH Gas', corr: 0.341, regime: 'LNG Arb', regimeColor: 'text-emerald-400', basis: '€18.4/MWh' },
  { pair: 'Gold/DXY', corr: -0.72, regime: 'Inverse', regimeColor: 'text-orange-400', basis: 'n/a' },
  { pair: 'Copper/Gold', corr: 0.271, regime: 'Risk-On/Off', regimeColor: 'text-purple-400', basis: 'n/a' },
]

const riskRows = [
  { name: 'Brent Crude', var95: -8.4, var99: -14.2, cvar: -15.7, maxDD: -41.3, sortino: 1.84, vol: 28.3 },
  { name: 'WTI Crude', var95: -8.7, var99: -14.8, cvar: -19.1, maxDD: -43.6, sortino: 1.79, vol: 29.1 },
  { name: 'Gold', var95: -3.5, var99: -6.1, cvar: -7.3, maxDD: -18.4, sortino: 2.31, vol: 14.7 },
  { name: 'HG Copper', var95: -6.8, var99: -11.3, cvar: -14.4, maxDD: -38.1, sortino: 1.62, vol: 22.6 },
  { name: 'Henry Hub', var95: -16.2, var99: -28.4, cvar: -36.7, maxDD: -72.3, sortino: 0.84, vol: 55.8 },
  { name: 'TTF Gas', var95: -18.6, var99: -31.2, cvar: -40.1, maxDD: -81.4, sortino: 0.71, vol: 62.4 },
]

// ── Radar chart geometry (SVG) ──
function radarRingPoints(scale) {
  const n = radarFactors.length
  return radarFactors
    .map((_, i) => {
      const ang = (Math.PI * 2 * i) / n - Math.PI / 2
      return `${150 + 120 * scale * Math.cos(ang)},${150 + 120 * scale * Math.sin(ang)}`
    })
    .join(' ')
}

const radarPoints = computed(() => {
  const n = factorScores.length
  return factorScores.map((f, i) => {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2
    const r = (f.score / 100) * 120
    return { x: 150 + r * Math.cos(ang), y: 150 + r * Math.sin(ang) }
  })
})

const radarPolygon = computed(() => radarPoints.value.map((p) => `${p.x},${p.y}`).join(' '))

// ── Forecast accuracy line chart ──
const accuracyChart = computed(() => ({
  data: {
    labels: accuracyData.map((d) => d.year),
    datasets: [
      {
        label: 'J. Currie',
        data: accuracyData.map((d) => d.jeffrey),
        borderColor: '#C9A84C',
        borderWidth: 2.5,
        pointRadius: 3,
        pointBackgroundColor: '#C9A84C',
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
      {
        label: 'Field Avg',
        data: accuracyData.map((d) => d.field),
        borderColor: 'rgba(255,255,255,0.25)',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Sharpe Ratio',
        data: [1.8, 2.1, 2, 2.8, 3.2, 3.1, 3.4, 3.5, 3.7, 3.84].map((v) => v * 5 + 72),
        borderColor: 'rgba(96,165,250,0.7)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#60a5fa',
        tension: 0.3,
        fill: false,
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
          label: (item) => item.dataset.label + ': ' + item.parsed.y + '%',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
      y: {
        min: 55,
        max: 100,
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 }, callback: (v) => v + '%' },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
  },
}))

// ── Quarterly win/loss bar chart ──
const quarterlyChart = computed(() => ({
  data: {
    labels: quarterlyRecord.map((d) => d.q),
    datasets: [
      {
        label: 'Wins',
        data: quarterlyRecord.map((d) => d.wins),
        backgroundColor: '#C9A84C',
        borderRadius: 5,
        maxBarThickness: 36,
      },
      {
        label: 'Losses',
        data: quarterlyRecord.map((d) => d.losses),
        backgroundColor: 'rgba(248,113,113,0.5)',
        borderRadius: 5,
        maxBarThickness: 36,
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
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
  },
}))

// ── Spot price & volatility (instrument selector) ──
const instruments = [
  { id: 'brent', label: 'Brent Crude', unit: '$/bbl', color: '#C9A84C', base: 87.4, vol: 28.3, beta: 1.42 },
  { id: 'wti', label: 'WTI Crude', unit: '$/bbl', color: '#e8c96b', base: 83.1, vol: 29.1, beta: 1.38 },
  { id: 'gold', label: 'Gold (XAUUSD)', unit: '$/oz', color: '#fbbf24', base: 2340, vol: 14.7, beta: -0.08 },
  { id: 'copper', label: 'HG Copper', unit: '¢/lb', color: '#60a5fa', base: 441, vol: 22.6, beta: 1.21 },
  { id: 'natgas', label: 'Henry Hub Gas', unit: '$/MMBtu', color: '#34d399', base: 2.84, vol: 55.8, beta: 0.87 },
  { id: 'ttfgas', label: 'TTF Gas (EU)', unit: '€/MWh', color: '#a78bfa', base: 34.2, vol: 62.4, beta: 0.91 },
  { id: 'uranium', label: 'Uranium (U3O8)', unit: '$/lb', color: '#f472b6', base: 91.5, vol: 18.2, beta: 0.34 },
  { id: 'wheat', label: 'CBOT Wheat', unit: '¢/bu', color: '#f87171', base: 548, vol: 31.4, beta: 0.29 },
]

const activeInstrument = ref('brent')
const activeRange = ref('1y')

const ranges = [
  { id: '6m', label: '6M', months: 6 },
  { id: '1y', label: '1Y', months: 12 },
  { id: '3y', label: '3Y', months: 36 },
  { id: '5y', label: '5Y', months: 60 },
  { id: '10y', label: '10Y', months: 120 },
]

function seededRandom(seed) {
  const x = Math.sin(seed) * 1e4
  return x - Math.floor(x)
}

function buildSeries(instrument, count) {
  let price = instrument.base * (0.92 + seededRandom(instrument.id.charCodeAt(0)) * 0.06)
  return Array.from({ length: count }, (_, i) => {
    const label = new Date(2026, 3 - (count - 1 - i), 1).toLocaleDateString('en-US', {
      month: 'short',
      year: count > 24 ? '2-digit' : undefined,
    })
    const seed = i * 41 + instrument.id.charCodeAt(0) * 7
    const swing = instrument.base * 0.025
    const drift = i > count * 0.4 ? swing * 0.35 : 0
    price = Math.max(instrument.base * 0.75, price + (seededRandom(seed) - 0.47) * swing + drift)
    const vol = instrument.vol * (0.7 + seededRandom(seed + 99) * 0.6)
    return { label, price: parseFloat(price.toFixed(2)), vol: parseFloat(vol.toFixed(1)) }
  })
}

const currentInstrument = computed(() => instruments.find((i) => i.id === activeInstrument.value))
const series = computed(() =>
  buildSeries(currentInstrument.value, ranges.find((r) => r.id === activeRange.value).months),
)
const periodHigh = computed(() => Math.max(...series.value.map((d) => d.price)))
const periodLow = computed(() => Math.min(...series.value.map((d) => d.price)))
const periodAvg = computed(() =>
  (series.value.reduce((sum, d) => sum + d.price, 0) / series.value.length).toFixed(2),
)
const lastPrice = computed(() => series.value[series.value.length - 1]?.price)
const firstPrice = computed(() => series.value[0]?.price)
const pctChange = computed(() => (((lastPrice.value - firstPrice.value) / firstPrice.value) * 100).toFixed(1))

const periodStats = computed(() => [
  { l: 'Period High', v: periodHigh.value.toLocaleString(), u: currentInstrument.value.unit },
  { l: 'Period Low', v: periodLow.value.toLocaleString(), u: currentInstrument.value.unit },
  { l: 'Period Avg', v: periodAvg.value, u: currentInstrument.value.unit },
  { l: 'Implied Vol', v: currentInstrument.value.vol + '%', u: 'annualised' },
])

const spotChart = computed(() => ({
  data: {
    labels: series.value.map((d) => d.label),
    datasets: [
      {
        label: currentInstrument.value.label,
        data: series.value.map((d) => d.price),
        borderColor: currentInstrument.value.color,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: currentInstrument.value.color,
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart
          if (!chartArea) return 'transparent'
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, currentInstrument.value.color + '30')
          gradient.addColorStop(1, currentInstrument.value.color + '00')
          return gradient
        },
      },
      {
        label: 'Realised 3M Vol %',
        data: series.value.map((d) => d.vol),
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1.5,
        borderDash: [5, 4],
        pointRadius: 0,
        tension: 0.3,
        fill: false,
        yAxisID: 'y1',
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
        borderColor: currentInstrument.value.color + '50',
        borderWidth: 1,
        titleColor: 'rgba(201,168,76,1)',
        titleFont: { weight: 'bold', size: 12 },
        bodyColor: '#fff',
        bodyFont: { weight: 'bold' },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          title: (items) => items[0].label.toUpperCase(),
          label: (item) =>
            item.datasetIndex === 0
              ? currentInstrument.value.label +
                ' (' +
                currentInstrument.value.unit +
                '): ' +
                item.parsed.y.toLocaleString()
              : 'Realised 3M Vol %: ' + item.parsed.y,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 }, maxTicksLimit: 12 },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
      y: {
        position: 'left',
        min: 0,
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
      y1: {
        position: 'right',
        min: 0,
        max: Math.ceil(currentInstrument.value.vol * 1.5),
        ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 10 }, callback: (v) => v + '%' },
        grid: { drawOnChartArea: false },
      },
    },
  },
}))

// ── Term structure (forward curve) ──
const curveData = Array.from({ length: 13 }, (_, i) => ({
  month: i === 0 ? 'Spot' : 'M+' + i * 5,
  brent: parseFloat((87.4 - i * 0.35 + Math.sin(i) * 0.8).toFixed(2)),
  wti: parseFloat((83.1 - i * 0.32 + Math.sin(i + 1) * 0.7).toFixed(2)),
}))

const curveChart = computed(() => ({
  data: {
    labels: curveData.map((d) => d.month),
    datasets: [
      {
        type: 'bar',
        label: 'Basis',
        data: curveData.map((d) => parseFloat((d.brent - d.wti).toFixed(2))),
        backgroundColor: curveData.map((d) =>
          d.brent - d.wti > 4 ? 'rgba(248,113,113,0.6)' : 'rgba(248,113,113,0.35)',
        ),
        borderRadius: 3,
        maxBarThickness: 24,
        yAxisID: 'y1',
        order: 2,
      },
      {
        type: 'line',
        label: 'ICE Brent',
        data: curveData.map((d) => d.brent),
        borderColor: '#C9A84C',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#C9A84C',
        tension: 0.3,
        fill: false,
        yAxisID: 'y',
        order: 1,
      },
      {
        type: 'line',
        label: 'NYMEX WTI',
        data: curveData.map((d) => d.wti),
        borderColor: '#60a5fa',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#60a5fa',
        tension: 0.3,
        fill: false,
        yAxisID: 'y',
        order: 1,
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
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
      y: {
        position: 'left',
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 }, callback: (v) => '$' + v },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
      y1: {
        position: 'right',
        ticks: { color: 'rgba(255,255,255,0.15)', font: { size: 10 }, callback: (v) => '$' + v },
        grid: { drawOnChartArea: false },
      },
    },
  },
}))
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <section class="pt-28 sm:pt-40 pb-10 sm:pb-12 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[130px]"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a6e]/15 rounded-full blur-[100px]"></div>
        <div
          class="absolute inset-0 opacity-[0.018]"
          style="
            background-image: linear-gradient(rgba(201, 168, 76, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 168, 76, 1) 1px, transparent 1px);
            background-size: 60px 60px;
          "
        ></div>
      </div>

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
          <ChartColumn class="w-4 h-4 text-[#C9A84C]" />
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]"
            >Proprietary Quantitative Dashboard · Restricted Access</span
          >
        </div>

        <h1 class="text-3xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
          Market<br />
          <span class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
            >Performance</span
          >
        </h1>
        <p class="text-white/45 text-lg max-w-3xl leading-relaxed mb-6">
          Multi-factor quantitative analytics platform tracking Jeffrey Currie's prediction alpha, risk-adjusted
          return attribution, cross-commodity correlation regimes, and forward curve dynamics across 8 benchmark
          instruments. Full proprietary model access available to institutional clients only.
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="pill in heroPills"
            :key="pill"
            class="px-3 py-1 rounded-full border border-[#C9A84C]/20 text-[#C9A84C]/45 text-xs font-black uppercase tracking-widest"
          >
            {{ pill }}
          </span>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-32 space-y-8">
      <!-- Stat cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        <div
          v-for="card in statCards"
          :key="card.l"
          :class="[
            'col-span-1 p-3 sm:p-4 rounded-2xl border',
            card.gold ? 'border-[#C9A84C]/40 bg-[#C9A84C]/[0.08]' : 'border-white/[0.08] bg-white/[0.02]',
          ]"
        >
          <div :class="['text-lg sm:text-xl font-black mb-0.5', card.gold ? 'text-[#C9A84C]' : 'text-white']">
            {{ card.v }}
          </div>
          <div class="text-white/55 text-xs font-bold leading-tight">{{ card.l }}</div>
          <div class="text-white/25 text-[10px] mt-0.5 hidden sm:block">{{ card.sub }}</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1.5 border-b border-white/[0.08] pb-0 overflow-x-auto scrollbar-none">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-black rounded-t-xl transition-all uppercase tracking-wider whitespace-nowrap flex-shrink-0 cursor-pointer',
            activeTab === tab.id ? 'bg-[#C9A84C] text-[#060914]' : 'text-white/35 hover:text-white/60',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- ── Forecast Analytics tab ── -->
      <template v-if="activeTab === 'forecast'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            class="lg:col-span-2 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
          >
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            >
              10-Year Forecast Accuracy — Alpha Decomposition
            </div>
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 class="text-xl font-black text-white">Currie vs. Field: Accuracy &amp; Generated Alpha</h2>
                <p class="text-white/35 text-xs mt-1">
                  Proprietary accuracy scoring methodology — see disclosure for definition
                </p>
              </div>
              <div class="flex gap-4 text-[10px] text-white/50">
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#C9A84C]"></span> J. Currie
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-white/30"></span> Field Avg
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-400/60"></span> Sharpe (RHS)
                </span>
              </div>
            </div>
            <div class="h-[240px]">
              <Line :data="accuracyChart.data" :options="accuracyChart.options" />
            </div>
          </div>

          <div
            class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
          >
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            >
              Annual Alpha Generation
            </div>
            <h2 class="text-lg font-black text-white mb-1">Accuracy Spread vs. Field</h2>
            <p class="text-white/35 text-xs mb-5">Percentage point outperformance per annum</p>
            <div class="space-y-2">
              <div v-for="d in accuracyData" :key="'a' + d.year" class="flex items-center gap-3 text-xs">
                <span class="text-white/40 font-black w-10">{{ d.year }}</span>
                <div class="flex-1 bg-white/[0.04] rounded-full h-4 overflow-hidden">
                  <div class="bg-[#C9A84C] h-full rounded-full" :style="{ width: (d.alpha / 20) * 100 + '%' }"></div>
                </div>
                <span class="text-green-400 font-black w-14 text-right">+{{ d.alpha }}pp</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Quarterly Prediction Record — Win/Loss &amp; Hit Rate
          </div>
          <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl font-black text-white">9-Quarter Granular Performance Attribution</h2>
              <p class="text-white/35 text-xs mt-1">
                Wins (correct directional/level calls) vs. losses, with quarterly accuracy % overlaid
              </p>
            </div>
            <div class="text-right">
              <span class="text-[#C9A84C] font-black text-2xl">96.6%</span>
              <span class="block text-white/30 text-xs">Rolling 9Q hit rate</span>
            </div>
          </div>
          <div class="h-[260px]">
            <Bar :data="quarterlyChart.data" :options="quarterlyChart.options" />
          </div>
        </div>

        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Spot Price &amp; Implied Volatility — Benchmark Commodities
          </div>
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 class="text-xl font-black text-white">{{ currentInstrument.label }} — Spot &amp; Realised Volatility</h2>
              <p class="text-white/35 text-xs mt-0.5">
                Price (LHS) · Realised 3M Vol % (RHS, dashed) · β={{ currentInstrument.beta }}
              </p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black text-white">
                {{ lastPrice?.toLocaleString() }}
                <span class="text-white/40 text-sm font-normal">{{ currentInstrument.unit }}</span>
              </div>
              <div class="flex items-center gap-2 justify-end mt-1">
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-black',
                    parseFloat(pctChange) >= 0
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-red-500/15 text-red-400',
                  ]"
                >
                  {{ parseFloat(pctChange) >= 0 ? '▲' : '▼' }} {{ Math.abs(parseFloat(pctChange)) }}%
                </span>
                <span class="text-white/25 text-xs">{{ ranges.find((r) => r.id === activeRange).label }} chg</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3 mb-4">
            <div
              v-for="stat in periodStats"
              :key="stat.l"
              class="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div class="text-white/30 text-[10px] uppercase tracking-wider mb-1">{{ stat.l }}</div>
              <div class="text-white font-black text-sm">{{ stat.v }}</div>
              <div class="text-white/20 text-[10px]">{{ stat.u }}</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-3">
            <button
              v-for="inst in instruments"
              :key="inst.id"
              @click="activeInstrument = inst.id"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border cursor-pointer',
                activeInstrument === inst.id
                  ? 'border-transparent text-[#060914]'
                  : 'bg-white/[0.04] text-white/45 border-white/10 hover:border-white/20',
              ]"
              :style="activeInstrument === inst.id ? { backgroundColor: inst.color } : {}"
            >
              {{ inst.label }}
            </button>
          </div>

          <div class="flex gap-2 mb-6">
            <button
              v-for="range in ranges"
              :key="range.id"
              @click="activeRange = range.id"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer',
                activeRange === range.id
                  ? 'bg-[#C9A84C] text-[#060914]'
                  : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.08]',
              ]"
            >
              {{ range.label }}
            </button>
          </div>

          <div class="h-[280px]">
            <Line :key="activeInstrument + activeRange" :data="spotChart.data" :options="spotChart.options" />
          </div>
        </div>

        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Cross-Commodity Correlation Regime Analysis
          </div>
          <h2 class="text-xl font-black text-white mb-1">Pairwise Correlation &amp; Arbitrage Basis</h2>
          <p class="text-white/35 text-xs mb-6">
            60-day rolling Pearson correlation · Basis represents current market spread · Regime classification
            proprietary
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/[0.08]">
                  <th class="px-4 py-3 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Instrument Pair
                  </th>
                  <th class="px-4 py-3 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Correlation (ρ)
                  </th>
                  <th class="px-4 py-3 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Regime
                  </th>
                  <th class="px-4 py-3 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Current Basis
                  </th>
                  <th class="px-4 py-3 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Signal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in correlationRows"
                  :key="row.pair"
                  class="border-b border-white/[0.04] hover:bg-white/[0.02]"
                >
                  <td class="px-4 py-4 font-black text-white text-sm">{{ row.pair }}</td>
                  <td :class="['px-4 py-4 font-black text-lg', row.corr >= 0 ? 'text-[#C9A84C]' : 'text-red-400']">
                    {{ row.corr.toFixed(3) }}
                  </td>
                  <td class="px-4 py-4">
                    <span
                      :class="['px-2.5 py-1 rounded-full border border-white/15 text-xs font-bold', row.regimeColor]"
                      >{{ row.regime }}</span
                    >
                  </td>
                  <td class="px-4 py-4 text-white/50 text-sm">{{ row.basis }}</td>
                  <td class="px-4 py-4">
                    <button
                      class="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] text-xs font-black uppercase tracking-wider hover:shadow-lg hover:shadow-[#C9A84C]/25 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Request<br />Restricted
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- ── Risk Metrics tab ── -->
      <div v-else-if="activeTab === 'risk'" class="space-y-6">
        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Quantitative Risk Attribution
          </div>
          <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 class="text-xl font-black text-white">Value-at-Risk, CVaR &amp; Drawdown Analysis</h2>
              <p class="text-white/35 text-xs mt-1">
                1-month horizon · Historical simulation (10Y window) · Parametric CVaR at 95/99% confidence
              </p>
            </div>
            <span
              class="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-wider"
              >Risk Model V1.2</span
            >
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/[0.08]">
                  <th class="px-3 py-2 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Instrument
                  </th>
                  <th class="px-3 py-2 text-right text-white/30 text-[10px] font-black uppercase tracking-wider">
                    1M VaR (95%)
                  </th>
                  <th class="px-3 py-2 text-right text-white/30 text-[10px] font-black uppercase tracking-wider">
                    1M VaR (99%)
                  </th>
                  <th class="px-3 py-2 text-right text-white/30 text-[10px] font-black uppercase tracking-wider">
                    CVaR (96%)
                  </th>
                  <th class="px-3 py-2 text-right text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Max Drawdown
                  </th>
                  <th class="px-3 py-2 text-right text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Sortino
                  </th>
                  <th class="px-3 py-2 text-right text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Ann. Vol
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in riskRows"
                  :key="row.name"
                  class="border-b border-white/[0.04] hover:bg-white/[0.02]"
                >
                  <td class="px-3 py-3 font-black text-white text-xs">{{ row.name }}</td>
                  <td class="px-3 py-3 text-right text-red-400 font-black text-xs">{{ row.var95 }}%</td>
                  <td class="px-3 py-3 text-right text-red-400 font-black text-xs">{{ row.var99 }}%</td>
                  <td class="px-3 py-3 text-right text-red-400 font-black text-xs">{{ row.cvar }}%</td>
                  <td
                    :class="[
                      'px-3 py-3 text-right font-black text-xs',
                      row.maxDD < -50 ? 'text-red-500' : 'text-red-400',
                    ]"
                  >
                    {{ row.maxDD }}%
                  </td>
                  <td class="px-3 py-3 text-right text-emerald-400 font-black text-xs">{{ row.sortino.toFixed(2) }}</td>
                  <td class="px-3 py-3 text-right text-white/50 font-black text-xs">{{ row.vol }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-white/20 text-[10px] mt-4">
            * VaR and CVaR calculated using historical simulation over 10-year rolling window. Sortino uses 0%
            minimum acceptable return. Past performance is not indicative of future results.
          </p>
        </div>

        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Cross-Commodity Correlation Regime Analysis
          </div>
          <h2 class="text-xl font-black text-white mb-1">Pairwise Correlation &amp; Arbitrage Basis</h2>
          <p class="text-white/35 text-xs mb-6">
            60-day rolling Pearson correlation · Basis represents current market spread
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-white/[0.08]">
                  <th class="px-3 py-2 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Pair
                  </th>
                  <th class="px-3 py-2 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Correlation (ρ)
                  </th>
                  <th class="px-3 py-2 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Regime
                  </th>
                  <th class="px-3 py-2 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Basis
                  </th>
                  <th class="px-3 py-2 text-left text-white/30 text-[10px] font-black uppercase tracking-wider">
                    Signal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in riskCorrelationRows" :key="row.pair" class="border-b border-white/[0.04]">
                  <td class="px-3 py-3 font-black text-white text-xs">{{ row.pair }}</td>
                  <td :class="['px-3 py-3 font-black text-sm', row.corr >= 0 ? 'text-[#C9A84C]' : 'text-red-400']">
                    {{ row.corr.toFixed(3) }}
                  </td>
                  <td class="px-3 py-3">
                    <span
                      :class="['px-2 py-0.5 rounded-full border border-white/15 text-[10px] font-bold', row.regimeColor]"
                      >{{ row.regime }}</span
                    >
                  </td>
                  <td class="px-3 py-3 text-white/40 text-xs">{{ row.basis }}</td>
                  <td class="px-3 py-3">
                    <button
                      class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] text-[9px] font-black uppercase cursor-pointer"
                    >
                      Restricted
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ── Term Structure tab ── -->
      <template v-else-if="activeTab === 'curve'">
        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Crude Oil Forward Curve — Brent vs. WTI
          </div>
          <h2 class="text-xl font-black text-white mb-1">Brent–WTI Futures Term Structure &amp; Basis</h2>
          <p class="text-white/25 text-[10px] mb-6">
            ICE Brent &amp; NYMEX WTI front-to-back structure · Spot to M+60 · Current market: mild backwardation
          </p>
          <div class="flex gap-4 text-[10px] text-white/50 mb-4">
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#C9A84C]"></span> Brent
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-400"></span> WTI
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400/60"></span> Basis
            </span>
          </div>
          <div class="h-[300px]">
            <Line :data="curveChart.data" :options="curveChart.options" />
          </div>
          <div class="grid grid-cols-3 gap-3 mt-6">
            <div class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div class="text-white/30 text-[10px] uppercase tracking-wider mb-1">3M Contango/Backwardation</div>
              <div class="text-xl font-black text-[#C9A84C]">-$1.30/bbl</div>
              <div class="text-white/25 text-[10px]">Mild backwardation — bullish signal</div>
            </div>
            <div class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div class="text-white/30 text-[10px] uppercase tracking-wider mb-1">Cal '27 Strip Price</div>
              <div class="text-xl font-black text-white">$81.40/bbl</div>
              <div class="text-white/25 text-[10px]">Currie target $85–$88 range</div>
            </div>
            <div class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div class="text-white/30 text-[10px] uppercase tracking-wider mb-1">Brent–WTI 12M Avg Basis</div>
              <div class="text-xl font-black text-emerald-400">+$4.33/bbl</div>
              <div class="text-white/25 text-[10px]">Tightening export infrastructure premium</div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#0d1225] to-[#080b14] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Proprietary 12-Month Price Target Model
          </div>
          <h2 class="text-xl font-black text-white mb-2">Currie Model: Forward Price Scenarios</h2>
          <p class="text-white/40 text-sm mb-8 max-w-3xl">
            Probability-weighted bull/base/bear scenarios using proprietary supply-demand balance model, OPEC+
            reaction function, and macro overlay. Available to institutional clients only.
          </p>
          <div class="text-center py-6 border-t border-white/[0.06]">
            <p class="text-white/30 text-xs font-black uppercase tracking-widest mb-4">
              Institutional Access Required — Contact for Subscription
            </p>
            <div class="flex items-center justify-center gap-12 mb-6">
              <div class="text-center">
                <div class="text-white/20 text-[10px] uppercase tracking-wider">Bull</div>
                <div class="text-white/15 text-lg font-black blur-sm select-none">$95-$105/bbl (25%)</div>
              </div>
              <div class="text-center">
                <div class="text-white/20 text-[10px] uppercase tracking-wider">Base</div>
                <div class="text-white/15 text-lg font-black blur-sm select-none">$85-$92/bbl (55%)</div>
              </div>
              <div class="text-center">
                <div class="text-white/20 text-[10px] uppercase tracking-wider">Bear</div>
                <div class="text-white/15 text-lg font-black blur-sm select-none">$68-$75/bbl (20%)</div>
              </div>
            </div>
            <router-link to="/contact">
              <button
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-[#C9A84C]/25 transition-all cursor-pointer"
              >
                Request Access →
              </button>
            </router-link>
          </div>
        </div>
      </template>

      <!-- ── Factor Model tab ── -->
      <template v-else-if="activeTab === 'factor'">
        <div class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              >
                Proprietary 8-Factor Commodity Scoring Model
              </div>
              <h2 class="text-xl font-black text-white mb-1">Brent Crude — Current Factor Scores</h2>
              <p class="text-white/35 text-xs mb-6">Composite score 78.4 / 100 · Bullish bias · Updated weekly</p>
              <div class="relative w-full aspect-square max-w-[320px] mx-auto">
                <svg viewBox="0 0 300 300" class="w-full h-full">
                  <polygon
                    v-for="scale in [0.25, 0.5, 0.75, 1]"
                    :key="scale"
                    :points="radarRingPoints(scale)"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    stroke-width="1"
                  />
                  <line
                    v-for="(f, idx) in radarFactors"
                    :key="'ax' + idx"
                    x1="150"
                    y1="150"
                    :x2="150 + 120 * Math.cos((Math.PI * 2 * idx) / radarFactors.length - Math.PI / 2)"
                    :y2="150 + 120 * Math.sin((Math.PI * 2 * idx) / radarFactors.length - Math.PI / 2)"
                    stroke="rgba(255,255,255,0.06)"
                    stroke-width="1"
                  />
                  <polygon :points="radarPolygon" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" stroke-width="2" />
                  <circle
                    v-for="(p, idx) in radarPoints"
                    :key="'pt' + idx"
                    :cx="p.x"
                    :cy="p.y"
                    r="3"
                    fill="#C9A84C"
                  />
                  <text
                    v-for="(f, idx) in radarFactors"
                    :key="'lb' + idx"
                    :x="150 + 140 * Math.cos((Math.PI * 2 * idx) / radarFactors.length - Math.PI / 2)"
                    :y="150 + 140 * Math.sin((Math.PI * 2 * idx) / radarFactors.length - Math.PI / 2)"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="rgba(255,255,255,0.35)"
                    font-size="9"
                    font-weight="bold"
                  >
                    {{ f.name.split(' ')[0] }}
                  </text>
                </svg>
              </div>
            </div>

            <div>
              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              >
                Factor Detail — Signal &amp; Weight
              </div>
              <h2 class="text-xl font-black text-white mb-1">8-Factor Decomposition</h2>
              <p class="text-white/35 text-xs mb-6">Directional signal · Factor weight in composite model</p>
              <div class="space-y-2">
                <div v-for="f in factorScores" :key="f.name" class="flex items-center gap-3">
                  <span class="text-white/70 text-xs font-bold w-32 flex-shrink-0 truncate">{{ f.name }}</span>
                  <div class="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :style="{
                        width: f.score + '%',
                        backgroundColor:
                          f.signal === 'Bullish' ? '#C9A84C' : f.signal === 'Bearish' ? '#f87171' : '#94a3b8',
                      }"
                    ></div>
                  </div>
                  <span class="text-white font-black text-xs w-8 text-right">{{ f.score }}</span>
                  <span class="text-white/30 text-[10px] w-8 text-right">{{ f.weight }}%</span>
                  <span
                    :class="[
                      'text-xs font-black w-20 text-right',
                      {
                        'text-emerald-400': f.signal === 'Bullish',
                        'text-red-400': f.signal === 'Bearish',
                        'text-yellow-400': f.signal === 'Caution',
                        'text-white/40': f.signal === 'Neutral',
                      },
                    ]"
                  >
                    {{ f.signal === 'Bullish' ? '▲' : f.signal === 'Bearish' || f.signal === 'Caution' ? '▼' : '►' }}
                    {{ f.signal }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#0d1225] to-[#080b14] p-8">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Model Output — Trade Signal &amp; Risk Parameters
          </div>
          <h2 class="text-xl font-black text-white mb-2">Composite Model Trade Signal</h2>
          <p class="text-white/40 text-sm mb-8">
            Aggregated directional call, entry zone, stop-loss, and probability-weighted price target from the
            8-factor model. Institutional subscription required.
          </p>
          <div class="text-center py-6 border-t border-white/[0.06]">
            <p class="text-white/30 text-xs font-black uppercase tracking-widest mb-4">
              Proprietary Signal — Institutional Access Only
            </p>
            <div class="flex items-center justify-center gap-12 mb-6">
              <div class="text-center">
                <div class="text-white/20 text-[10px] uppercase">Signal</div>
                <div class="text-white/15 text-lg font-black blur-sm select-none">LONG (78%)</div>
              </div>
              <div class="text-center">
                <div class="text-white/20 text-[10px] uppercase">Entry</div>
                <div class="text-white/15 text-lg font-black blur-sm select-none">$84.5–$86.0/bbl</div>
              </div>
              <div class="text-center">
                <div class="text-white/20 text-[10px] uppercase">Target</div>
                <div class="text-white/15 text-lg font-black blur-sm select-none">$92.0 (95% prob)</div>
              </div>
            </div>
            <router-link to="/contact">
              <button
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-[#C9A84C]/25 transition-all cursor-pointer"
              >
                Request Access →
              </button>
            </router-link>
          </div>
        </div>

        <div class="text-[10px] text-white/15 leading-relaxed">
          <p>
            <span class="font-bold">Important Disclaimer ·</span> All commodity metrics, factor scores, VaR
            estimates, and model outputs presented on this page are for informational and illustrative purposes only
            and do not constitute investment advice, a solicitation, or an offer to buy or sell any financial
            instrument. Past performance is not a guarantee of future results. Commodity markets are subject to
            significant volatility and risk of loss. The proprietary factor model, correlation regime
            classifications, and forward curve analyses are intellectual property of Jeffrey Currie · Carlyle Energy
            Pathways.
          </p>
          <p class="mt-2">
            © 2026 Jeffrey Currie · Carlyle Energy Pathways. All rights reserved. · Proprietary &amp; Confidential
          </p>
        </div>
      </template>
    </div>

    <PageFooter year="2024" />
  </div>
</template>
