<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, Crown, Star, Trophy, TrendingUp } from 'lucide-vue-next'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'vue-chartjs'
import PageFooter from '../components/PageFooter.vue'
import GlowBackground from '../components/GlowBackground.vue'

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Filler,
  Legend,
  Tooltip,
)

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'ranking', label: 'Full Ranking' },
]

const heroStats = [
  { icon: Trophy, v: '#1', l: 'Global Rank', sub: 'Out of 25 analysts' },
  { icon: TrendingUp, v: '94.2%', l: 'Accuracy Rate', sub: 'Season record high' },
  { icon: Star, v: '49/52', l: 'Predictions Won', sub: '2026 season' },
  { icon: TrendingUp, v: '+17.7pp', l: 'Edge Over Field', sub: 'vs 76.5% avg' },
]

const predictions = [
  {
    title: '"New Commodity Supercycle"',
    date: 'Jan 2020',
    detail: 'Validated 2021–22 (+85% commodities)',
  },
  {
    title: '"Gold Crash — Largest decline in 30 years"',
    date: 'Apr 2013',
    detail: 'Correct: gold fell $200/oz within 48hrs',
  },
  {
    title: '""New Joule Order" — Energy security > climate"',
    date: 'Jan 2025',
    detail: 'Reshaping global energy investment frameworks',
  },
  {
    title: '"Copper as strategic metal of the decade"',
    date: 'Mar 2025',
    detail: 'Defence supercycle driving copper demand surge',
  },
]

const championStats = [
  { v: '94.2%', l: 'Accuracy Rate', sub: 'All-time competition record' },
  { v: '49/52', l: 'Predictions Won', sub: '2026 season' },
  { v: '+17.7pp', l: 'Edge Over Field', sub: 'vs 76.5% avg' },
  { v: '8 Years', l: 'Top-3 Finishes', sub: 'Consecutive seasons' },
]

const topPerformers = [
  {
    name: 'Jeffrey Currie',
    org: 'The Carlyle Group',
    accuracy: 94.2,
    wins: 49,
    total: 52,
    rank: 1,
    image: '/images/competition/currie.jpg',
  },
  {
    name: 'Christyan Malek',
    org: 'JPMorgan',
    accuracy: 81.4,
    wins: 43,
    total: 53,
    rank: 2,
    image: '/images/competition/malek.jpg',
  },
  {
    name: 'Giovanni Staunovo',
    org: 'UBS',
    accuracy: 79.8,
    wins: 41,
    total: 52,
    rank: 3,
    image: '/images/competition/staunovo.jpg',
  },
]

const accuracyHistory = [
  { year: 2019, currie: 78, field: 62 },
  { year: 2020, currie: 82, field: 64 },
  { year: 2021, currie: 85, field: 67 },
  { year: 2022, currie: 88, field: 70 },
  { year: 2023, currie: 90, field: 72 },
  { year: 2024, currie: 91, field: 74 },
  { year: 2025, currie: 93, field: 75 },
  { year: 2026, currie: 94.2, field: 76.5 },
]

const quarterly = [
  { q: 'Q1 24', wins: 6, losses: 0 },
  { q: 'Q2 24', wins: 6, losses: 1 },
  { q: 'Q3 24', wins: 7, losses: 0 },
  { q: 'Q4 24', wins: 6, losses: 0 },
  { q: 'Q1 25', wins: 6, losses: 1 },
  { q: 'Q2 25', wins: 6, losses: 0 },
  { q: 'Q3 25', wins: 6, losses: 1 },
  { q: 'Q4 25', wins: 6, losses: 0 },
]

const competitors = [
  {
    name: 'Christyan Malek',
    specialty: 'Oil Markets',
    org: 'JPMorgan',
    accuracy: 81.4,
    wins: 43,
    total: 53,
    rank: 2,
    image: '/images/competition/malek.jpg',
  },
  {
    name: 'Giovanni Staunovo',
    specialty: 'Commodities',
    org: 'UBS',
    accuracy: 79.8,
    wins: 41,
    total: 52,
    rank: 3,
    image: '/images/competition/staunovo.jpg',
  },
  {
    name: 'Helima Croft',
    specialty: 'Geopolitics',
    org: 'RBC Capital',
    accuracy: 78.2,
    wins: 40,
    total: 51,
    rank: 4,
    image: '/images/competition/croft.jpg',
  },
  {
    name: 'Paul Sankey',
    specialty: 'Energy',
    org: 'Sankey Research',
    accuracy: 77.5,
    wins: 39,
    total: 51,
    rank: 5,
    image: '/images/competition/sankey.jpg',
  },
  {
    name: 'Damien Courvalin',
    specialty: 'Metals',
    org: 'Goldman Sachs',
    accuracy: 76.9,
    wins: 40,
    total: 52,
    rank: 6,
    image: '/images/competition/courvalin.jpg',
  },
  {
    name: 'Mike Wirth',
    specialty: 'Energy',
    org: 'Chevron',
    accuracy: 75.3,
    wins: 38,
    total: 51,
    rank: 7,
    image: '/images/competition/wirth.jpg',
  },
  {
    name: 'Amrita Sen',
    specialty: 'Oil',
    org: 'Energy Aspects',
    accuracy: 74.6,
    wins: 38,
    total: 51,
    rank: 8,
    image: '/images/competition/sen.jpg',
  },
  {
    name: 'Bob McNally',
    specialty: 'Macro',
    org: 'Rapidan Energy',
    accuracy: 73.8,
    wins: 37,
    total: 50,
    rank: 9,
    image: '/images/competition/mcnally.jpg',
  },
]

const gridTick = { color: 'rgba(255,255,255,0.25)', drawBorder: false }

const accuracyChartData = computed(() => ({
  labels: accuracyHistory.map((e) => e.year),
  datasets: [
    {
      label: 'Jeffrey Currie',
      data: accuracyHistory.map((e) => e.currie),
      borderColor: '#C9A84C',
      backgroundColor: 'rgba(201,168,76,0.15)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#C9A84C',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Field Average',
      data: accuracyHistory.map((e) => e.field),
      borderColor: 'rgba(255,255,255,0.3)',
      borderWidth: 1.5,
      borderDash: [5, 5],
      pointRadius: 2,
      pointBackgroundColor: 'rgba(255,255,255,0.3)',
      tension: 0.3,
      fill: false,
    },
  ],
}))

const accuracyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: { color: 'rgba(255,255,255,0.5)', boxWidth: 10, font: { size: 10 } },
    },
    tooltip: {
      backgroundColor: '#0a0e1a',
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
    x: { ticks: gridTick, grid: { color: 'rgba(255,255,255,0.04)', ...gridTick } },
    y: {
      min: 60,
      max: 100,
      ticks: { ...gridTick, callback: (e) => e + '%' },
      grid: { color: 'rgba(255,255,255,0.04)', ...gridTick },
    },
  },
}

const quarterlyChartData = computed(() => ({
  labels: quarterly.map((e) => e.q.replace(' ', "'")),
  datasets: [
    {
      label: 'Wins',
      data: quarterly.map((e) => e.wins),
      backgroundColor: '#C9A84C',
      borderRadius: 3,
      barPercentage: 0.6,
    },
    {
      label: 'Losses',
      data: quarterly.map((e) => e.losses),
      backgroundColor: 'rgba(239,68,68,0.5)',
      borderRadius: 3,
      barPercentage: 0.6,
    },
  ],
}))

const quarterlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0a0e1a',
      borderColor: 'rgba(201,168,76,0.3)',
      borderWidth: 1,
      titleColor: 'rgba(255,255,255,0.4)',
      bodyColor: '#fff',
      bodyFont: { weight: 'bold' },
      padding: 10,
      cornerRadius: 8,
      callbacks: { label: (e) => e.dataset.label + ': ' + e.parsed.y },
    },
  },
  scales: {
    x: { ticks: gridTick, grid: { display: false } },
    y: { ticks: gridTick, grid: { color: 'rgba(255,255,255,0.04)', ...gridTick } },
  },
}

const winLossChartData = computed(() => ({
  labels: ['Wins (49)', 'Losses (3)'],
  datasets: [
    {
      data: [49, 3],
      backgroundColor: ['#C9A84C', 'rgba(255,255,255,0.1)'],
      borderWidth: 0,
      cutout: '72%',
    },
  ],
}))

const winLossChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: 'rgba(255,255,255,0.5)', boxWidth: 10, font: { size: 11 }, padding: 20 },
    },
    tooltip: { enabled: false },
  },
}

const comparisonChartData = computed(() => ({
  labels: [
    'Jeffrey Currie',
    'Christyan Malek',
    'Giovanni Staunovo',
    'Helima Croft',
    'Paul Sankey',
    'Damien Courvalin',
  ],
  datasets: [
    {
      data: [94.2, 81.4, 79.8, 78.2, 77.5, 76.9],
      backgroundColor: (e) => (e.dataIndex === 0 ? '#C9A84C' : 'rgba(255,255,255,0.15)'),
      borderRadius: 3,
      barPercentage: 0.5,
    },
  ],
}))

const comparisonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (e) => e.parsed.x + '%' } },
  },
  scales: {
    x: {
      min: 70,
      max: 100,
      ticks: { ...gridTick, callback: (e) => e + '%' },
      grid: { color: 'rgba(255,255,255,0.04)', ...gridTick },
    },
    y: {
      ticks: {
        color: (e) => (e.index === 0 ? '#C9A84C' : 'rgba(255,255,255,0.5)'),
        font: { weight: 'bold', size: 11 },
      },
      grid: { display: false },
    },
  },
}

const radarCategories = [
  'Oil & Energy',
  'Metals',
  'Macro',
  'Geopolitics',
  'Agriculture',
  'Crypto-Commodity',
]
const radarCurrie = [96, 93, 92, 95, 88, 85]
const radarField = [74, 72, 78, 71, 65, 60]

const radarRings = [0.3, 0.5, 0.7, 0.9]

function ringPoints(scale) {
  return radarCategories
    .map((_, i) => {
      const a = (Math.PI * 2 * i) / 6 - Math.PI / 2
      return 150 + Math.cos(a) * 120 * scale + ',' + (150 + Math.sin(a) * 120 * scale)
    })
    .join(' ')
}

function axisCoord(i, fn) {
  const a = (Math.PI * 2 * i) / 6 - Math.PI / 2
  return 150 + (fn === 'cos' ? Math.cos(a) : Math.sin(a)) * 120
}

function shapePoints(values) {
  return values
    .map((v, i) => {
      const a = (Math.PI * 2 * i) / 6 - Math.PI / 2
      const r = (v / 100) * 120
      return 150 + Math.cos(a) * r + ',' + (150 + Math.sin(a) * r)
    })
    .join(' ')
}

function labelCoord(i, fn) {
  const a = (Math.PI * 2 * i) / 6 - Math.PI / 2
  return 150 + (fn === 'cos' ? Math.cos(a) : Math.sin(a)) * 140
}
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <section class="relative pt-32 sm:pt-44 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
      <GlowBackground />
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="mb-10">
          <router-link
            to="/"
            class="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft class="w-4 h-4" /> Back to Home
          </router-link>
        </div>
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6"
        >
          <Trophy class="w-3.5 h-3.5 text-[#C9A84C]" />
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]"
            >Industry Masters Competition 2026</span
          >
        </div>
        <h1 class="text-3xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
          Global<br /><span
            class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
            >Leaderboard</span
          >
        </h1>
        <p class="text-white/45 text-lg max-w-3xl leading-relaxed mb-10">
          The Industry Masters Competition tracks the world's elite commodity analysts across 52
          annual predictions spanning oil, metals, energy, macroeconomics, and geopolitics. Jeffrey
          Currie's <span class="font-black text-[#C9A84C]">94.2% accuracy rate</span> — 49 correct
          out of 52 — is the highest ever recorded in the competition's history.
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="stat in heroStats"
            :key="stat.l"
            class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
          >
            <component :is="stat.icon" class="w-5 h-5 text-white/20 mb-3" />
            <div class="text-2xl sm:text-3xl font-black text-[#C9A84C]">{{ stat.v }}</div>
            <div class="text-white/70 text-sm font-black mt-1">{{ stat.l }}</div>
            <div class="text-white/30 text-xs mt-0.5">{{ stat.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
      <div class="flex gap-1.5 border-b border-white/[0.08] pb-0">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2.5 text-sm font-black rounded-t-xl transition-all whitespace-nowrap cursor-pointer',
            activeTab === tab.id
              ? 'bg-[#C9A84C] text-[#060914]'
              : 'text-white/35 hover:text-white/60',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Overview tab -->
    <section
      v-if="activeTab === 'overview'"
      class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-12 space-y-12"
    >
      <div
        class="rounded-3xl border border-[#C9A84C]/30 bg-gradient-to-br from-[#C9A84C]/10 to-transparent p-8 sm:p-10"
      >
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div
            class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#B8860B] flex items-center justify-center shadow-lg shadow-[#C9A84C]/20"
          >
            <Trophy class="w-10 h-10 text-[#060914]" />
          </div>
          <div class="flex-1">
            <p class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em] mb-1">
              2026 Industry Masters Champion
            </p>
            <h2 class="text-3xl font-black text-white">Jeffrey Currie</h2>
            <p class="text-white/40 text-sm mt-1 uppercase tracking-wider">
              Chief Strategy Officer · The Carlyle Group
            </p>
          </div>
          <div class="px-5 py-2 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/30">
            <span class="text-[#C9A84C] font-black text-lg flex items-center gap-2">
              <Trophy class="w-5 h-5" /> Rank #1
            </span>
          </div>
        </div>
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-white/40 text-xs font-black uppercase tracking-widest"
              >Season Accuracy vs Field Average</span
            >
            <span class="text-[#C9A84C] text-sm font-black"
              >94.2% <span class="text-white/30">vs</span> 76.5%</span
            >
          </div>
          <div class="relative w-full h-3 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              class="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A84C] to-[#e8c96b] rounded-full"
              style="width: 94.2%"
            ></div>
            <div class="absolute top-0 bottom-0 w-0.5 bg-white/40" style="left: 76.5%"></div>
          </div>
          <div class="text-right mt-1">
            <span class="text-white/25 text-xs">Field avg</span>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div
            v-for="stat in championStats"
            :key="stat.l"
            class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
          >
            <div class="text-xl sm:text-2xl font-black text-[#C9A84C]">{{ stat.v }}</div>
            <div class="text-white/70 text-sm font-black mt-1">{{ stat.l }}</div>
            <div class="text-white/30 text-xs mt-0.5">{{ stat.sub }}</div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="p in predictions"
            :key="p.title"
            class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex gap-3"
          >
            <div class="w-2 h-2 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0"></div>
            <div>
              <h4 class="font-black text-white text-sm">{{ p.title }}</h4>
              <p class="text-[#C9A84C]/60 text-xs mt-0.5">{{ p.date }}</p>
              <p class="text-white/35 text-xs mt-0.5">{{ p.detail }}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-black text-white mb-6 flex items-center gap-2">
          <Trophy class="w-5 h-5 text-[#C9A84C]" /> Top Performers
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div
            v-for="performer in topPerformers"
            :key="performer.rank"
            :class="[
              'rounded-2xl border p-6',
              performer.rank === 1
                ? 'border-[#C9A84C]/40 bg-gradient-to-br from-[#C9A84C]/10 to-transparent'
                : 'border-white/[0.06] bg-white/[0.02]',
            ]"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                :class="[
                  'w-12 h-12 rounded-full overflow-hidden border-2',
                  performer.rank === 1 ? 'border-[#C9A84C]' : 'border-white/10',
                ]"
              >
                <img
                  :src="performer.image"
                  :alt="performer.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black',
                  performer.rank === 1
                    ? 'bg-[#C9A84C] text-[#060914]'
                    : performer.rank === 2
                      ? 'bg-white/10 text-white/60'
                      : 'bg-[#C9A84C]/20 text-[#C9A84C]',
                ]"
              >
                #{{ performer.rank }}
              </div>
              <Crown v-if="performer.rank === 1" class="w-5 h-5 text-[#C9A84C] ml-auto" />
            </div>
            <h3
              :class="[
                'font-black text-lg',
                performer.rank === 1 ? 'text-[#C9A84C]' : 'text-white',
              ]"
            >
              {{ performer.name }}
            </h3>
            <p class="text-white/40 text-xs mb-4">{{ performer.org }}</p>
            <div class="flex items-center gap-3 mb-1">
              <div class="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  :class="[
                    'h-full rounded-full',
                    performer.rank === 1 ? 'bg-[#C9A84C]' : 'bg-[#C9A84C]/60',
                  ]"
                  :style="{ width: performer.accuracy + '%' }"
                ></div>
              </div>
              <span
                :class="[
                  'text-sm font-black',
                  performer.rank === 1 ? 'text-[#C9A84C]' : 'text-[#C9A84C]/70',
                ]"
                >{{ performer.accuracy }}%</span
              >
            </div>
            <p class="text-white/25 text-xs">{{ performer.wins }}/{{ performer.total }} wins</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Analytics tab -->
    <section
      v-if="activeTab === 'analytics'"
      class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-12 space-y-8"
    >
      <div
        class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
      >
        <h2 class="text-xl font-black text-white mb-1">Accuracy History 2019–2026</h2>
        <p class="text-white/35 text-xs mb-6">Jeffrey Currie vs. field average — 8-year trend</p>
        <div class="h-[280px]">
          <Line :data="accuracyChartData" :options="accuracyChartOptions" />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <h2 class="text-xl font-black text-white mb-1">Quarterly Win / Loss</h2>
          <p class="text-white/35 text-xs mb-6">8 quarters — near-perfect record</p>
          <div class="h-[240px]">
            <Bar :data="quarterlyChartData" :options="quarterlyChartOptions" />
          </div>
        </div>

        <div
          class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <h2 class="text-xl font-black text-white mb-1">Expertise Radar</h2>
          <p class="text-white/35 text-xs mb-6">Accuracy by category vs field</p>
          <div class="flex justify-center">
            <svg viewBox="0 0 300 300" class="w-[260px] h-[260px]">
              <g
                v-for="ring in radarRings"
                :key="ring"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                stroke-width="1"
              >
                <polygon :points="ringPoints(ring)" />
              </g>
              <line
                v-for="(cat, i) in radarCategories"
                :key="'axis' + i"
                x1="150"
                y1="150"
                :x2="axisCoord(i, 'cos')"
                :y2="axisCoord(i, 'sin')"
                stroke="rgba(255,255,255,0.06)"
                stroke-width="1"
              />
              <polygon
                :points="shapePoints(radarField)"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.15)"
                stroke-width="1"
              />
              <polygon
                :points="shapePoints(radarCurrie)"
                fill="rgba(201,168,76,0.15)"
                stroke="#C9A84C"
                stroke-width="1.5"
              />
              <text
                v-for="(cat, i) in radarCategories"
                :key="'label' + i"
                :x="labelCoord(i, 'cos')"
                :y="labelCoord(i, 'sin')"
                fill="rgba(255,255,255,0.4)"
                font-size="9"
                text-anchor="middle"
                dominant-baseline="middle"
              >
                {{ cat }}
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <h2 class="text-xl font-black text-white mb-1">2026 Win / Loss</h2>
          <p class="text-white/35 text-xs mb-6">49 correct predictions out of 52</p>
          <div class="h-[240px]">
            <Doughnut :data="winLossChartData" :options="winLossChartOptions" />
          </div>
        </div>

        <div
          class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <h2 class="text-xl font-black text-white mb-1">Top-8 Accuracy Comparison</h2>
          <p class="text-white/35 text-xs mb-6">Currie vs. nearest rivals</p>
          <div class="h-[240px]">
            <Bar :data="comparisonChartData" :options="comparisonChartOptions" />
          </div>
        </div>
      </div>
    </section>

    <!-- Full Ranking tab -->
    <section
      v-if="activeTab === 'ranking'"
      class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-12 space-y-10"
    >
      <div>
        <h2 class="text-2xl font-black text-white mb-1">Global Analyst Ranking</h2>
        <p class="text-white/35 text-sm mb-8">
          Ranked by 2026 prediction accuracy — 52 predictions per analyst
        </p>
        <div
          class="rounded-3xl border border-[#C9A84C]/30 bg-gradient-to-br from-[#C9A84C]/10 via-[#0d1225] to-[#060914] p-8 sm:p-12"
        >
          <div class="flex flex-col sm:flex-row items-center gap-8">
            <div class="flex flex-col items-center gap-4">
              <div
                class="w-28 h-28 rounded-full overflow-hidden border-3 border-[#C9A84C]/50 shadow-lg shadow-[#C9A84C]/20"
              >
                <img
                  src="/images/competition/currie.jpg"
                  alt="Jeffrey Currie"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="px-4 py-2 rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 flex items-center gap-2"
              >
                <Crown class="w-4 h-4 text-[#C9A84C]" />
                <span class="text-[#C9A84C] text-xs font-black uppercase tracking-wider"
                  >Champion #1</span
                >
              </div>
            </div>
            <div class="text-center sm:text-left flex-1">
              <div
                class="inline-flex items-center px-4 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-3"
              >
                <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.15em]"
                  >2026 Industry Masters</span
                >
              </div>
              <h2 class="text-4xl sm:text-5xl font-black text-white leading-tight">
                Jeffrey<br />Currie
              </h2>
              <p class="text-white/60 font-black text-sm mt-2">Chief Strategy Officer</p>
              <p class="text-white/35 text-xs">The Carlyle Group · Energy Pathways</p>
            </div>
            <div class="flex flex-col gap-4">
              <div
                class="px-8 py-5 rounded-2xl border border-[#C9A84C]/30 bg-white/[0.03] text-center"
              >
                <div class="text-3xl sm:text-4xl font-black text-[#C9A84C]">94.2%</div>
                <div class="text-white/40 text-xs font-black uppercase tracking-widest mt-1">
                  Accuracy Rate
                </div>
                <div class="text-white/25 text-xs mt-0.5">All-time record</div>
              </div>
              <div
                class="px-8 py-5 rounded-2xl border border-[#C9A84C]/30 bg-white/[0.03] text-center"
              >
                <div class="text-3xl sm:text-4xl font-black text-[#C9A84C]">49/52</div>
                <div class="text-white/40 text-xs font-black uppercase tracking-widest mt-1">
                  Predictions Won
                </div>
                <div class="text-white/25 text-xs mt-0.5">2026 Season</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-black text-white mb-6">Top Competitors</h2>
        <div class="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden">
          <div class="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
            <div
              v-for="c in competitors"
              :key="c.rank"
              class="flex-shrink-0 w-[280px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0"
                >
                  <img :src="c.image" :alt="c.name" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="font-black text-white text-sm">{{ c.name }}</h3>
                  <p class="text-[#C9A84C]/60 text-xs">{{ c.specialty }}</p>
                  <p class="text-white/30 text-xs">{{ c.org }}</p>
                </div>
              </div>
              <div class="inline-flex px-3 py-1 rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/10 mb-4">
                <span class="text-[#C9A84C] text-xs font-black uppercase">Rank #{{ c.rank }}</span>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-white/40 text-xs font-black uppercase tracking-wider">Accuracy</span>
                <span class="text-[#C9A84C] text-sm font-black">{{ c.accuracy }}%</span>
              </div>
              <div class="w-full h-2 bg-white/[0.06] rounded-full mb-5">
                <div
                  class="h-full bg-[#C9A84C] rounded-full"
                  :style="{ width: c.accuracy + '%' }"
                ></div>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div class="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <div class="text-white/30 text-[9px] font-black uppercase">Wins</div>
                  <div class="text-white font-black text-lg">{{ c.wins }}</div>
                </div>
                <div class="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <div class="text-white/30 text-[9px] font-black uppercase">Total</div>
                  <div class="text-white font-black text-lg">{{ c.total }}</div>
                </div>
                <div class="p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                  <div class="text-white/30 text-[9px] font-black uppercase">Rate</div>
                  <div class="text-white font-black text-lg">{{ Math.round(c.accuracy) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <PageFooter year="2026" />
  </div>
</template>
