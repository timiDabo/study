<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import {
  Crown,
  Award,
  TrendingUp,
  TrendingDown,
  Trophy,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Minus,
} from 'lucide-vue-next'
import SectionBadge from '../components/SectionBadge.vue'
import GlowBackground from '../components/GlowBackground.vue'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

/* ----------------------------------------------------------------------------
 * Live Markets Ticker
 * ------------------------------------------------------------------------- */
const tickerItems = [
  { label: 'Brent Crude', value: '$87.42', change: '+1.8%', up: true },
  { label: 'WTI Crude', value: '$83.11', change: '+1.6%', up: true },
  { label: 'Gold (XAUUSD)', value: '$2,341', change: '-0.3%', up: false },
  { label: 'HG Copper', value: '441¢/lb', change: '+2.4%', up: true },
  { label: 'Henry Hub Gas', value: '$2.84', change: '-1.1%', up: false },
  { label: 'TTF Gas (EU)', value: '€34.2/MWh', change: '+0.7%', up: true },
  { label: 'Uranium (U3O8)', value: '$91.50/lb', change: '0.0%', up: null },
  { label: 'S&P 500', value: '5,248', change: '+0.4%', up: true },
  { label: 'DXY Index', value: '104.8', change: '-0.2%', up: false },
  { label: 'US 10Y Yield', value: '4.61%', change: '+3bps', up: true },
  { label: 'CBOT Wheat', value: '548¢/bu', change: '-0.9%', up: false },
  { label: 'Iron Ore 62%', value: '$108/t', change: '+1.2%', up: true },
]
const tickerLoop = [...tickerItems, ...tickerItems]

/* ----------------------------------------------------------------------------
 * Commodity Chart
 * ------------------------------------------------------------------------- */
const chartTab = ref('commodity')

const commodities = [
  {
    id: 'oil',
    label: 'Brent Crude Oil',
    unit: '$/bbl',
    color: '#C9A84C',
    base: 78,
    call: { date: 'Jan 2020', text: '"New commodity supercycle" — called +18 months before consensus' },
  },
  {
    id: 'copper',
    label: 'Copper',
    unit: '¢/lb',
    color: '#60a5fa',
    base: 395,
    call: { date: 'Mar 2025', text: '"Critical metal of the energy transition & defence era"' },
  },
  {
    id: 'gold',
    label: 'Gold',
    unit: '$/oz',
    color: '#e8c96b',
    base: 1870,
    call: { date: 'Apr 2013', text: '"Largest gold price decline in 30 years" — predicted 2 days before' },
  },
  {
    id: 'natgas',
    label: 'Natural Gas',
    unit: '$/MMBtu',
    color: '#34d399',
    base: 2.6,
    call: { date: 'Jan 2025', text: '"New Joule Order" — energy security replaces climate mandates' },
  },
]

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function generateSeries(commodity, points = 24) {
  const now = new Date(2026, 3, 1)
  let value = commodity.base * (0.82 + seededRandom(commodity.id.charCodeAt(0)) * 0.12)
  return Array.from({ length: points }, (_, i) => {
    const label = new Date(now.getFullYear(), now.getMonth() - (points - 1 - i), 1).toLocaleDateString(
      'en-US',
      { month: 'short', year: '2-digit' },
    )
    const seed = i * 41 + commodity.id.charCodeAt(0) * 7
    const swing = commodity.base * 0.055
    const drift = i > points * 0.5 ? swing * 0.25 : 0
    value = Math.max(commodity.base * 0.55, value + (seededRandom(seed) - 0.47) * swing + drift)
    return { label, price: parseFloat(value.toFixed(commodity.base < 10 ? 2 : 0)) }
  })
}

const selectedCommodity = ref('oil')
const activeCommodity = computed(() => commodities.find((c) => c.id === selectedCommodity.value))
const series = computed(() => generateSeries(activeCommodity.value, 24))
const latestPrice = computed(() => series.value[series.value.length - 1]?.price)
const firstPrice = computed(() => series.value[0]?.price)
const changePct = computed(() => (((latestPrice.value - firstPrice.value) / firstPrice.value) * 100).toFixed(1))
const isUp = computed(() => parseFloat(changePct.value) >= 0)

const commodityChart = computed(() => ({
  data: {
    labels: series.value.map((d) => d.label),
    datasets: [
      {
        data: series.value.map((d) => d.price),
        borderColor: activeCommodity.value.color,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: activeCommodity.value.color,
        tension: 0.3,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart
          if (!chartArea) return 'transparent'
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, activeCommodity.value.color + '30')
          gradient.addColorStop(1, activeCommodity.value.color + '00')
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
        borderColor: activeCommodity.value.color + '50',
        borderWidth: 1,
        titleColor: 'rgba(255,255,255,0.4)',
        bodyColor: '#fff',
        bodyFont: { weight: 'bold' },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (item) => `${item.parsed.y.toLocaleString()} ${activeCommodity.value.unit}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.25)', font: { size: 10 }, maxTicksLimit: 6 },
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

const accuracyData = [
  { year: '2017', currie: 78, field: 65 },
  { year: '2018', currie: 81, field: 66 },
  { year: '2019', currie: 78, field: 62 },
  { year: '2020', currie: 82, field: 64 },
  { year: '2021', currie: 85, field: 67 },
  { year: '2022', currie: 88, field: 70 },
  { year: '2023', currie: 90, field: 72 },
  { year: '2024', currie: 91, field: 74 },
  { year: '2025', currie: 93, field: 75 },
  { year: '2026', currie: 94.2, field: 76.5 },
]

const accuracyChart = computed(() => ({
  data: {
    labels: accuracyData.map((d) => d.year),
    datasets: [
      {
        label: 'J. Currie',
        data: accuracyData.map((d) => d.currie),
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
          label: (item) => `${item.dataset.label}: ${item.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      },
      y: {
        min: 55,
        max: 100,
        ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 }, callback: (v) => v + '%' },
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      },
    },
    interaction: { intersect: false, mode: 'index' },
  },
}))

const chartTabs = [
  { id: 'commodity', label: 'Commodity Prices' },
  { id: 'accuracy', label: 'Accuracy vs Field' },
]

/* ----------------------------------------------------------------------------
 * Page data
 * ------------------------------------------------------------------------- */
const stats = [
  { icon: Briefcase, value: '27+', label: 'Years of Experience', sub: 'Shaping commodities markets globally' },
  { icon: TrendingUp, value: '94.2%', label: 'Accuracy Rate', sub: '2026 Competition Champion' },
  { icon: Trophy, value: '#1', label: 'Global Ranking', sub: 'Among 25 top analysts worldwide' },
]

const heroTags = [
  '27 Yrs Goldman Sachs',
  'CSO · The Carlyle Group',
  'Chair · UChicago EPIC',
  '#1 Global Analyst 2026',
]

const aboutStats = [
  { v: '27+', l: 'Years at Goldman Sachs' },
  { v: '94.2%', l: 'Prediction Accuracy' },
  { v: '#1', l: 'Global Analyst 2026' },
]

const aboutCalls = [
  { label: 'Revenge of the Old Economy', sub: 'Coined 2004, vindicated 2021–22' },
  { label: 'New Joule Order', sub: 'Energy security over climate mandates, 2025' },
  { label: 'Bitcoin as Commodity', sub: 'First major analyst to classify BTC, 2017' },
  { label: 'Gold Crash Call', sub: 'Predicted largest decline in 30 years, 2013' },
]

const championStats = [
  { icon: Trophy, v: '#1', l: 'Global Rank' },
  { icon: TrendingUp, v: '94.2%', l: 'Accuracy Rate' },
  { icon: Crown, v: '49/52', l: 'Predictions Won' },
]

const insights = [
  {
    tag: 'Energy Security',
    headline: 'Oil Supply Tightens as OPEC+ Maintains Cuts Through Q3 2026',
    detail:
      "Currie's base case: Brent averaging $85–$92/bbl in H2 2026. Key upside risk: escalation in Middle East shipping lanes. Downside: US shale reactivation above $90.",
    date: 'Apr 2026',
    border: 'border-orange-500/20',
    gradient: 'from-orange-500/10',
    tagClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  },
  {
    tag: 'Commodities',
    headline: 'Copper Enters Structural Deficit — Defence Supercycle Accelerates',
    detail:
      'European rearmament and US infrastructure spending are creating a 400kt annual deficit in refined copper. Currie identifies this as the #1 commodity investment theme for 2026–2030.',
    date: 'Mar 2026',
    border: 'border-blue-500/20',
    gradient: 'from-blue-500/10',
    tagClass: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  },
  {
    tag: 'Geopolitics',
    headline: '"Peak Trade" Displaces "Peak Oil" as the Critical Market Risk',
    detail:
      'Deglobalisation and reshoring are compressing commodity trade flows. Currie argues that logistics fragmentation — not demand destruction — is the primary structural shift of this decade.',
    date: 'Feb 2026',
    border: 'border-purple-500/20',
    gradient: 'from-purple-500/10',
    tagClass: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  },
  {
    tag: 'Macroeconomics',
    headline: 'The Dollar Commodity Divergence: Gold at $2,300 While Oil Holds $85',
    detail:
      'Historically anomalous — both gold (safe haven) and oil (growth proxy) are elevated simultaneously. Currie attributes this to unprecedented central bank gold buying and OPEC+ supply discipline co-existing.',
    date: 'Jan 2026',
    border: 'border-yellow-500/20',
    gradient: 'from-yellow-500/10',
    tagClass: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  },
]

const competitors = [
  { name: 'Christyan Malek', org: 'JPMorgan', accuracy: 81.4, wins: 43, total: 53, rank: 2 },
  { name: 'Giovanni Staunovo', org: 'UBS', accuracy: 79.8, wins: 41, total: 52, rank: 3 },
  { name: 'Helima Croft', org: 'RBC Capital', accuracy: 78.2, wins: 40, total: 51, rank: 4 },
  { name: 'Paul Sankey', org: 'Sankey Research', accuracy: 77.5, wins: 39, total: 51, rank: 5 },
  { name: 'Damien Courvalin', org: 'Goldman Sachs', accuracy: 76.9, wins: 40, total: 52, rank: 6 },
  { name: 'Mike Wirth', org: 'Chevron', accuracy: 75.3, wins: 38, total: 51, rank: 7 },
  { name: 'Amrita Sen', org: 'Energy Aspects', accuracy: 74.6, wins: 38, total: 51, rank: 8 },
  { name: 'Bob McNally', org: 'Rapidan Energy', accuracy: 73.8, wins: 37, total: 50, rank: 9 },
]
const competitorsLoop = [...competitors, ...competitors]

const topPerformers = [
  {
    rank: 1,
    name: 'Jeffrey Currie',
    org: 'The Carlyle Group',
    accuracy: 94.2,
    img: '/images/base44/318a10f31_J-Currie-e1587568135466.jpg',
    color: '#C9A84C',
  },
  {
    rank: 2,
    name: 'Christyan Malek',
    org: 'JPMorgan',
    accuracy: 81.4,
    img: '/images/base44/b8029d227_generated_image.png',
    color: '#94a3b8',
  },
  {
    rank: 3,
    name: 'Giovanni Staunovo',
    org: 'UBS',
    accuracy: 79.8,
    img: '/images/base44/0c5c52282_generated_image.png',
    color: '#C9A84C',
  },
]

const testimonials = [
  {
    text: 'Jeffrey Currie is without question the most influential commodity economist of our generation. His supercycle call in 2020 was the most consequential macro prediction of the decade.',
    author: 'Senior Portfolio Manager',
    org: 'Bridgewater Associates',
    category: 'Peer Review',
  },
  {
    text: "Currie's 'New Joule Order' thesis fundamentally reframed how institutional investors think about energy transition. He saw the geopolitical dimension of energy long before the rest of the Street.",
    author: 'Managing Director, Energy Research',
    org: 'Morgan Stanley',
    category: 'Industry Commentary',
  },
  {
    text: "In 27 years watching commodity markets, I've never seen anyone combine academic rigor with real-world market intuition the way Jeff does. His gold crash call in 2013 was breathtaking in its precision.",
    author: 'Chief Investment Officer',
    org: 'Pimco Commodities',
    category: 'Peer Review',
  },
  {
    text: "When Jeffrey Currie speaks about copper's strategic role in the defense supercycle, central banks and sovereign wealth funds listen. He's not just predicting markets — he's shaping them.",
    author: 'Head of Commodities Strategy',
    org: 'Deutsche Bank',
    category: 'Industry Commentary',
  },
  {
    text: "The 'Revenge of the Old Economy' framing was visionary. Currie called the structural underinvestment in fossil fuels and traditional commodities before anyone else had the intellectual courage to do so.",
    author: 'Global Head of Energy Research',
    org: 'Bank of America',
    category: 'Research Commentary',
  },
  {
    text: "Classifying Bitcoin as a commodity in 2017 was a watershed moment. Currie's framework gave institutional investors a legitimate lens through which to evaluate digital assets — that changed everything.",
    author: 'Digital Assets Research Lead',
    org: 'Fidelity Investments',
    category: 'Innovation',
  },
]

const latestThinking = [
  {
    year: '2025',
    title: 'The New Joule Order',
    org: 'The Carlyle Group',
    desc: 'Energy security has replaced climate mandates as the dominant market force. The world is shifting from "peak oil demand" to "peak trade" — and the implications for commodity pricing are profound.',
    tag: 'Energy Policy',
  },
  {
    year: '2025',
    title: 'The New Military Plan',
    org: 'The Carlyle Group',
    desc: '€9 trillion in European defense and infrastructure investment projected over the next decade. Currie identifies copper, steel, and energy as the critical materials of the coming defense supercycle.',
    tag: 'Geopolitics',
  },
  {
    year: '2020',
    title: 'Revenge of the Old Economy',
    org: 'Goldman Sachs',
    desc: 'Decades of underinvestment in commodities, combined with surging green-transition demand, would trigger a new supercycle. Called before consensus — validated spectacularly in 2021–2022.',
    tag: 'Supercycle',
  },
]

const mediaItems = [
  {
    type: 'interview',
    title: 'Commodity Markets Analysis',
    publication: 'CNBC',
    date: '2026-03-10',
    excerpt: 'Breaking down the latest commodity price movements and market forecasts with expert analysis.',
    image: '/images/youtube/youtube_xLiLCDCZupw.jpg',
    link: 'https://www.youtube.com/watch?v=xLiLCDCZupw',
  },
  {
    type: 'interview',
    title: 'Energy Transition Outlook',
    publication: 'Sky News',
    date: '2026-02-28',
    excerpt: 'Exploring the future of energy markets and the transition to sustainable commodities.',
    image: '/images/youtube/youtube_vDv1zIbxq_8.jpg',
    link: 'https://www.youtube.com/watch?v=vDv1zIbxq_8',
  },
  {
    type: 'article',
    title: 'The New Joule Order',
    publication: 'Financial Times',
    date: '2026-01-15',
    excerpt: 'How energy security has replaced climate mandates as the dominant force in commodity markets.',
    image: '/images/youtube/youtube_54Jt9NdGz1o.jpg',
    link: 'https://www.youtube.com/watch?v=54Jt9NdGz1o',
  },
  {
    type: 'interview',
    title: 'Oil Supply & OPEC+ Strategy',
    publication: 'Bloomberg',
    date: '2025-12-05',
    excerpt: 'Jeffrey Currie discusses OPEC+ supply discipline and its impact on Brent crude pricing.',
    image: '/images/youtube/youtube_Au6Exwc2R6s.jpg',
    link: 'https://www.youtube.com/watch?v=Au6Exwc2R6s',
  },
  {
    type: 'podcast',
    title: 'Copper & the Defence Supercycle',
    publication: 'Reuters',
    date: '2025-11-20',
    excerpt:
      'Why copper is the strategic metal of the decade — defence spending, infrastructure, and energy transition.',
    image: '/images/youtube/youtube_q4kWgtIplmA.jpg',
    link: 'https://www.youtube.com/watch?v=q4kWgtIplmA',
  },
  {
    type: 'video',
    title: 'Gold, Bitcoin & Macro Outlook',
    publication: 'The Daily Telegraph',
    date: '2025-10-08',
    excerpt: 'Currie on the unusual co-existence of elevated gold and oil prices in the current macro environment.',
    image: '/images/youtube/youtube_FJ2F1HJX4-o.jpg',
    link: 'https://www.youtube.com/watch?v=FJ2F1HJX4-o',
  },
]

const mediaTypeLabels = {
  article: 'Article',
  interview: 'Interview',
  podcast: 'Podcast',
  video: 'Video',
}

/* ----------------------------------------------------------------------------
 * Champion shimmer (intersection observer)
 * ------------------------------------------------------------------------- */
const championVisible = ref(false)
onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        championVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 },
  )
  setTimeout(() => {
    const el = document.querySelector('.champion-card')
    if (el) observer.observe(el)
  }, 100)
})

/* ----------------------------------------------------------------------------
 * Testimonials carousel
 * ------------------------------------------------------------------------- */
const testimonialIndex = ref(0)
let testimonialTimer = null
function nextTestimonial() {
  testimonialIndex.value = (testimonialIndex.value + 1) % testimonials.length
}
function prevTestimonial() {
  testimonialIndex.value = (testimonialIndex.value - 1 + testimonials.length) % testimonials.length
}
onMounted(() => {
  testimonialTimer = setInterval(nextTestimonial, 6000)
})
onUnmounted(() => clearInterval(testimonialTimer))

/* ----------------------------------------------------------------------------
 * Media carousel
 * ------------------------------------------------------------------------- */
const mediaIndex = ref(0)
const mediaAutoplay = ref(true)
let mediaTimer = null
function nextMedia() {
  mediaIndex.value = (mediaIndex.value + 1) % mediaItems.length
}
function prevMedia() {
  mediaIndex.value = (mediaIndex.value - 1 + mediaItems.length) % mediaItems.length
}
onMounted(() => {
  mediaTimer = setInterval(() => {
    if (mediaAutoplay.value) nextMedia()
  }, 6000)
})
onUnmounted(() => clearInterval(mediaTimer))
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="relative pt-32 sm:pt-48 pb-24 sm:pb-40 px-6 sm:px-12 lg:px-16 overflow-hidden bg-[#060914]"
    >
      <GlowBackground />
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="mb-10 inline-block">
          <span
            class="inline-flex items-center px-5 py-2.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-xs font-black uppercase tracking-[0.25em] border border-[#C9A84C]/30"
          >
            ⚡ Global Energy Economics Leader
          </span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05]">
              Jeffrey<br /><span
                class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
                >Currie</span
              >
            </h1>
            <p
              class="text-lg text-[#C9A84C]/70 font-black mb-8 uppercase tracking-[0.2em] flex items-center gap-3"
            >
              <span class="w-10 h-0.5 bg-gradient-to-r from-[#C9A84C] to-transparent"></span>
              Energy Economist • Commodities Strategist
            </p>
            <p class="text-base sm:text-lg text-white/45 mb-8 leading-relaxed max-w-3xl">
              For over three decades, Jeffrey Currie has been the defining voice in global commodities
              markets — predicting supercycles before they began, calling oil's collapse before the
              crowd, and identifying copper and energy security as the strategic themes of the 2020s.
              Ranked #1 globally among elite commodity analysts with a 94.2% prediction accuracy rate.
            </p>
            <div class="flex flex-wrap gap-2 mb-8 sm:mb-10 text-xs">
              <span
                v-for="tag in heroTags"
                :key="tag"
                class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#C9A84C]/20 text-[#C9A84C]/50 font-bold"
                >{{ tag }}</span
              >
            </div>
            <div class="flex gap-4 flex-wrap">
              <router-link to="/projects">
                <button
                  class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C9A84C] via-[#d4a84b] to-[#B8860B] text-[#060914] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:scale-105"
                >
                  View Research Portfolio
                  <ArrowRight class="w-4 h-4" />
                </button>
              </router-link>
              <router-link to="/competition">
                <button
                  class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#C9A84C]/40 text-[#C9A84C] font-black text-sm uppercase tracking-widest hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/70 transition-all duration-300"
                >
                  2026 Rankings
                </button>
              </router-link>
            </div>
          </div>
          <div class="relative h-full min-h-[500px] lg:min-h-[600px]">
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 rounded-3xl blur-2xl"
            ></div>
            <img
              src="/images/base44/318a10f31_J-Currie-e1587568135466.jpg"
              alt="Jeffrey Currie"
              class="relative w-full h-full object-cover rounded-3xl border-2 border-[#C9A84C]/30 shadow-2xl shadow-[#C9A84C]/20"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Live Markets Ticker -->
    <div class="w-full bg-[#060914] border-b border-[#C9A84C]/15 overflow-hidden relative h-10">
      <div
        class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#060914] to-transparent z-10 pointer-events-none"
      ></div>
      <div
        class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#060914] to-transparent z-10 pointer-events-none"
      ></div>
      <div
        class="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 bg-[#060914] border-r border-[#C9A84C]/20"
      >
        <span
          class="text-[#C9A84C] text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
          >Live Markets</span
        >
      </div>
      <div class="flex pl-36 items-center h-full animate-ticker">
        <div
          v-for="(item, i) in tickerLoop"
          :key="i"
          class="flex items-center gap-2 px-5 py-2 flex-shrink-0"
        >
          <span class="text-white/35 text-xs font-semibold uppercase tracking-wider">{{
            item.label
          }}</span>
          <span class="text-white/80 text-xs font-black">{{ item.value }}</span>
          <div
            :class="[
              'flex items-center gap-0.5',
              item.up === true ? 'text-emerald-400' : item.up === false ? 'text-red-400' : 'text-white/40',
            ]"
          >
            <TrendingUp v-if="item.up === true" class="w-3 h-3" />
            <TrendingDown v-else-if="item.up === false" class="w-3 h-3" />
            <Minus v-else class="w-3 h-3" />
            <span class="text-xs font-black">{{ item.change }}</span>
          </div>
          <span class="w-px h-3 bg-white/10 ml-3"></span>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <section
      class="py-24 px-6 sm:px-12 lg:px-16 bg-[#060914] border-y border-[#C9A84C]/15 relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent"
      ></div>
      <div
        class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent"
      ></div>
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div v-for="stat in stats" :key="stat.label" class="text-center group relative">
            <div
              class="absolute inset-0 rounded-3xl bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
            ></div>
            <div class="relative">
              <div
                class="w-20 h-20 bg-gradient-to-br from-[#C9A84C] via-[#d4a84b] to-[#B8860B] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#C9A84C]/30 transition-all duration-300 shadow-lg shadow-[#C9A84C]/10"
              >
                <component :is="stat.icon" class="w-10 h-10 text-[#060914]" />
              </div>
              <div
                class="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent mb-3"
              >
                {{ stat.value }}
              </div>
              <div class="text-xl font-black text-white mb-2">{{ stat.label }}</div>
              <p class="text-white/40 text-sm">{{ stat.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Commodity & Macro Trends -->
    <section class="py-24 px-6 sm:px-12 lg:px-16 bg-[#060914] border-t border-[#C9A84C]/10">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <SectionBadge>Live Market Intelligence</SectionBadge>
            <h2 class="text-4xl font-black text-white mb-2">Commodity & Macro Trends</h2>
            <p class="text-white/40 text-sm max-w-xl">
              Key markets at the core of Currie's research — oil, copper, gold, natural gas —
              alongside his prediction accuracy record vs. the analyst field.
            </p>
          </div>
          <router-link
            to="/market-performance"
            class="inline-flex items-center gap-2 text-[#C9A84C] font-black text-sm hover:gap-3 transition-all uppercase tracking-widest flex-shrink-0"
          >
            Full Dashboard
            <ArrowUpRight class="w-4 h-4" />
          </router-link>
        </div>

        <!-- Commodity Chart component -->
        <div>
          <div class="flex gap-2 mb-8 flex-wrap">
            <button
              v-for="tab in chartTabs"
              :key="tab.id"
              @click="chartTab = tab.id"
              :class="[
                'px-4 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer',
                chartTab === tab.id
                  ? 'bg-[#C9A84C] text-[#060914] shadow-lg shadow-[#C9A84C]/25'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <div
            v-if="chartTab === 'commodity'"
            class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 sm:p-8"
          >
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                v-for="commodity in commodities"
                :key="commodity.id"
                @click="selectedCommodity = commodity.id"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border cursor-pointer',
                  selectedCommodity === commodity.id
                    ? 'border-transparent text-[#060914]'
                    : 'bg-white/[0.04] text-white/45 border-white/10 hover:border-white/20',
                ]"
                :style="selectedCommodity === commodity.id ? { backgroundColor: commodity.color } : {}"
              >
                <span
                  class="w-2 h-2 rounded-full flex-shrink-0"
                  :style="{
                    backgroundColor: selectedCommodity === commodity.id ? '#060914' : commodity.color,
                  }"
                ></span>
                {{ commodity.label }}
              </button>
            </div>
            <div class="flex flex-wrap items-end gap-3 mb-6">
              <div>
                <div class="text-3xl sm:text-4xl font-black text-white">
                  {{ latestPrice?.toLocaleString() }}
                </div>
                <div class="text-white/35 text-xs">
                  {{ activeCommodity.unit }} · 24-month trailing
                </div>
              </div>
              <div
                :class="[
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black',
                  isUp ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400',
                ]"
              >
                <span>{{ isUp ? '↗' : '↘' }}</span>
                {{ isUp ? '+' : '' }}{{ changePct }}% (24mo)
              </div>
            </div>
            <div class="h-[240px] mb-6">
              <Line :key="selectedCommodity" :data="commodityChart.data" :options="commodityChart.options" />
            </div>
            <div class="p-4 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.03]">
              <div class="flex items-start gap-3">
                <span class="w-2 h-2 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0"></span>
                <div>
                  <p class="text-[#C9A84C] text-xs font-black uppercase tracking-wider">
                    Currie's Call · {{ activeCommodity.call.date }}
                  </p>
                  <p class="text-white/45 text-sm mt-1">{{ activeCommodity.call.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 sm:p-8"
          >
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="text-xl font-black text-white">Prediction Accuracy 2017–2026</h3>
                <p class="text-white/35 text-xs mt-1">
                  Jeffrey Currie vs. the analyst field average — a consistently widening gap.
                </p>
              </div>
              <div class="flex gap-4 text-[10px] text-white/50">
                <span class="flex items-center gap-1.5"
                  ><span class="w-2.5 h-2.5 rounded-full bg-[#C9A84C]"></span> J. Currie</span
                >
                <span class="flex items-center gap-1.5"
                  ><span class="w-2.5 h-2.5 rounded-full bg-white/30"></span> Field Avg</span
                >
              </div>
            </div>
            <div class="h-[280px] mb-6">
              <Line :data="accuracyChart.data" :options="accuracyChart.options" />
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="p-4 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 text-center">
                <div class="text-2xl font-black text-[#C9A84C]">94.2%</div>
                <div class="text-white/40 text-xs mt-1">Currie 2026</div>
              </div>
              <div class="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center">
                <div class="text-2xl font-black text-white/60">76.5%</div>
                <div class="text-white/40 text-xs mt-1">Field Avg 2026</div>
              </div>
              <div class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
                <div class="text-2xl font-black text-emerald-400">+17.7pp</div>
                <div class="text-white/40 text-xs mt-1">Edge Over Field</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="py-28 px-6 sm:px-12 lg:px-16 bg-[#060914]">
      <div class="max-w-6xl mx-auto">
        <SectionBadge>About Jeffrey Currie</SectionBadge>
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-6">
          The World's Most Influential<br class="hidden sm:block" />
          Energy Economist
        </h2>
        <p class="text-white/35 text-lg mb-12 max-w-3xl">— The Daily Telegraph</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p class="text-base sm:text-lg text-white/55 mb-6 leading-relaxed">
              Jeffrey Currie is one of the world's foremost commodity economists, renowned for bold,
              high-conviction calls that have shaped global energy markets. Over a landmark 27-year
              career at Goldman Sachs as Global Head of Commodities Research, he predicted the
              commodity supercycle of the 2000s, called the collapse of oil prices in the 2010s, and
              declared the dawn of a new supercycle in 2020 — each time before the consensus caught
              on.
            </p>
            <p class="text-lg text-white/55 mb-10 leading-relaxed">
              Now Chief Strategy Officer at The Carlyle Group's Energy Pathways and Chair of the
              Advisory Board at the University of Chicago's Energy Policy Institute (EPIC), Currie
              continues to define the conversation around energy security, copper's strategic
              importance, and what he calls the "New Joule Order" — a seismic shift from
              climate-driven policy to energy security as the dominant force in global markets.
            </p>
            <div class="grid grid-cols-3 gap-4 mb-10">
              <div
                v-for="s in aboutStats"
                :key="s.l"
                class="text-center p-4 rounded-xl border border-[#C9A84C]/15 bg-[#C9A84C]/5"
              >
                <div class="text-2xl font-black text-[#C9A84C]">{{ s.v }}</div>
                <div class="text-white/40 text-xs mt-1">{{ s.l }}</div>
              </div>
            </div>
            <router-link to="/about">
              <button
                class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C9A84C] via-[#d4a84b] to-[#B8860B] text-[#060914] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:scale-105"
              >
                Full Biography →
              </button>
            </router-link>
          </div>
          <div class="space-y-4">
            <div class="relative h-64 rounded-3xl overflow-hidden border border-[#C9A84C]/20">
              <img
                src="/images/base44/4e9c4d224_image.png"
                alt="Jeffrey Currie"
                class="w-full h-full object-cover object-top"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#060914]/80 to-transparent"></div>
              <div class="absolute bottom-5 left-5">
                <p class="text-[#C9A84C] font-black text-sm uppercase tracking-widest">
                  Chief Strategy Officer
                </p>
                <p class="text-white/60 text-xs">The Carlyle Group · Energy Pathways</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="call in aboutCalls"
                :key="call.label"
                class="p-4 rounded-2xl border border-[#C9A84C]/[0.12] bg-[#C9A84C]/[0.03] hover:border-[#C9A84C]/30 transition-all"
              >
                <p class="text-white/80 text-xs font-black leading-snug mb-1">"{{ call.label }}"</p>
                <p class="text-white/30 text-xs">{{ call.sub }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Industry Masters Competition / Champion -->
    <section class="relative py-20 sm:py-32 overflow-hidden bg-[#060914]">
      <div class="absolute inset-0 -z-0 pointer-events-none">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1a3a6e]/20 rounded-full blur-[120px]"
        ></div>
        <div
          class="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/[0.06] rounded-full blur-[100px]"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C9A84C]/5 rounded-full blur-[80px]"
        ></div>
        <div
          class="absolute inset-0 opacity-[0.03]"
          style="
            background-image: repeating-linear-gradient(0deg, #c9a84c 0px, transparent 1px, transparent 80px);
          "
        ></div>
      </div>
      <div class="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        <div class="text-center mb-12 sm:mb-20">
          <div
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-8"
          >
            <Award class="w-4 h-4 text-[#C9A84C]" />
            <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.25em]"
              >Industry Masters Competition 2026</span
            >
          </div>
          <h2 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Unmatched<br /><span
              class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
              >Excellence</span
            >
          </h2>
          <p class="text-white/50 text-base sm:text-xl max-w-xl mx-auto leading-relaxed">
            Ranked #1 globally among the world's elite commodities analysts — outperforming every
            competitor by a significant margin.
          </p>
        </div>
        <div class="max-w-4xl mx-auto mb-12">
          <div
            class="rounded-3xl border border-[#C9A84C]/25 bg-gradient-to-br from-[#C9A84C]/10 via-[#0d1225] to-[#080b14] p-8 sm:p-10 relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/[0.06] rounded-full blur-[80px]"
            ></div>
            <div class="relative z-10">
              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 mb-6"
              >
                <Crown class="w-4 h-4 text-[#C9A84C]" />
                <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]"
                  >2026 Global Champion</span
                >
              </div>
              <h3 class="text-3xl sm:text-4xl font-black text-white mb-1">Jeffrey Currie</h3>
              <p class="text-white/40 text-xs font-black uppercase tracking-widest mb-8">
                Chief Strategy Officer · The Carlyle Group · Energy Pathways
              </p>
              <div class="grid grid-cols-3 gap-4 mb-8">
                <div
                  v-for="stat in championStats"
                  :key="stat.l"
                  class="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-center"
                >
                  <component :is="stat.icon" class="w-5 h-5 text-[#C9A84C]/60 mx-auto mb-2" />
                  <div class="text-2xl font-black text-[#C9A84C]">{{ stat.v }}</div>
                  <div class="text-white/35 text-xs mt-1">{{ stat.l }}</div>
                </div>
              </div>
              <div class="mb-8">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-white/50 text-xs font-black uppercase tracking-wider"
                    >Win Rate vs. Field</span
                  >
                  <span class="text-[#C9A84C] text-sm font-black">94.2% vs avg 76.5%</span>
                </div>
                <div class="w-full bg-white/[0.06] rounded-full h-2.5 relative">
                  <div
                    class="bg-gradient-to-r from-[#C9A84C] to-[#e8c96b] h-2.5 rounded-full"
                    style="width: 94.2%"
                  ></div>
                  <div class="absolute top-4 text-white/30 text-[10px]" style="left: 76.5%">
                    <div class="w-px h-3 bg-white/20 mx-auto -mt-4"></div>
                    Field avg
                  </div>
                </div>
              </div>
              <router-link to="/competition">
                <button
                  class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C9A84C] via-[#d4a84b] to-[#B8860B] text-[#060914] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:scale-105"
                >
                  View Full Leaderboard
                  <ArrowRight class="w-4 h-4" />
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- The Competition ticker -->
      <div class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 mt-16">
        <div class="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-10">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/20"></div>
          <span
            class="text-white/25 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] flex-shrink-0 whitespace-nowrap"
            >The Competition</span
          >
          <div class="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/20"></div>
        </div>
        <div
          class="overflow-hidden w-full relative rounded-xl sm:rounded-2xl border border-[#C9A84C]/15 bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] p-3 sm:p-6"
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#060914] via-[#060914]/50 to-transparent z-10 pointer-events-none"
          ></div>
          <div
            class="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#060914] via-[#060914]/50 to-transparent z-10 pointer-events-none"
          ></div>
          <div class="flex gap-2 sm:gap-4 animate-competitors">
            <div
              v-for="(c, i) in competitorsLoop"
              :key="`m1${i}`"
              class="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#0a0e1a] to-[#111827] min-w-[200px] sm:min-w-[260px]"
            >
              <div
                class="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-[#C9A84C] font-black text-[10px] sm:text-xs">#{{ c.rank }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white/85 font-bold text-[11px] sm:text-sm truncate">{{ c.name }}</p>
                <p class="text-white/35 text-[10px] truncate">{{ c.org }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-[#C9A84C]/80 font-black text-sm sm:text-base leading-none">
                  {{ c.accuracy }}%
                </p>
                <p class="text-white/25 text-[9px] sm:text-xs mt-0.5">{{ c.wins }}/{{ c.total }} wins</p>
              </div>
            </div>
          </div>
        </div>
        <p class="text-center text-white/20 text-xs font-bold uppercase tracking-[0.2em] mt-6">
          Competitors ranked #2–#11 · Season accuracy vs. Jeffrey Currie 94.2%
        </p>
      </div>
    </section>

    <!-- Global Analyst Ranking / Top Performers -->
    <section class="py-24 px-6 sm:px-12 lg:px-16 border-t border-[#C9A84C]/10">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6"
          >
            <Trophy class="w-4 h-4 text-[#C9A84C]" />
            <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.25em]"
              >Industry Masters 2026</span
            >
          </div>
          <h2 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
            Global<br /><span
              class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
              >Analyst Ranking</span
            >
          </h2>
          <p class="text-white/45 text-base sm:text-lg max-w-2xl mx-auto">
            Jeffrey Currie ranked #1 globally among elite commodity analysts with 94.2% prediction
            accuracy — the highest ever recorded.
          </p>
        </div>

        <div
          class="relative rounded-3xl overflow-hidden border-2 border-[#C9A84C] bg-gradient-to-br from-[#0d1225] via-[#0a0e1a] to-[#050810] p-8 sm:p-12 mb-16 champion-card"
        >
          <div
            class="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#C9A84C] via-[#8B6914] to-[#C9A84C] opacity-60 blur-sm -z-10"
          ></div>
          <div
            v-if="championVisible"
            class="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/40 via-[#B8860B]/30 to-[#C9A84C]/20 rounded-3xl champion-shimmer pointer-events-none z-20"
          ></div>
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-12 items-center">
            <div class="flex flex-col items-center">
              <div class="relative mb-4">
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#B8860B] rounded-full blur-3xl opacity-80"
                ></div>
                <div
                  class="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-[#C9A84C] shadow-2xl shadow-[#C9A84C]/80"
                >
                  <img
                    src="/images/base44/318a10f31_J-Currie-e1587568135466.jpg"
                    alt="Jeffrey Currie"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C] bg-[#C9A84C]/10"
              >
                <Crown class="w-4 h-4 text-[#C9A84C]" />
                <span class="text-[#C9A84C] text-xs font-black">Champion #1</span>
              </div>
            </div>
            <div class="col-span-1 sm:col-span-2 text-center sm:text-left">
              <h3 class="text-4xl sm:text-5xl font-black text-white mb-2">Jeffrey Currie</h3>
              <p class="text-[#C9A84C] font-black text-sm mb-1">Chief Strategy Officer</p>
              <p class="text-white/50 text-xs">The Carlyle Group</p>
            </div>
            <div class="col-span-1 sm:col-span-2 space-y-3">
              <div class="p-4 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-center">
                <div class="text-3xl font-black text-[#C9A84C]">94.2%</div>
                <div class="text-white/70 text-xs font-bold">Accuracy Rate</div>
              </div>
              <div class="p-4 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-center">
                <div class="text-3xl font-black text-[#C9A84C]">49/52</div>
                <div class="text-white/70 text-xs font-bold">Predictions Won</div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl sm:text-2xl font-black text-white mb-6">Top Performers</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div
            v-for="(p, n) in topPerformers"
            :key="p.rank"
            :class="[
              'relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all',
              n === 0
                ? 'border-[#C9A84C]/40 bg-gradient-to-br from-[#C9A84C]/10 to-[#060914]'
                : 'border-white/15 bg-white/[0.03]',
            ]"
          >
            <div class="flex items-center justify-between mb-3 sm:mb-4">
              <div class="flex items-center gap-2 sm:gap-3 flex-1">
                <img
                  :src="p.img"
                  :alt="p.name"
                  :class="[
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2',
                    n === 0 ? 'border-[#C9A84C]' : 'border-white/20',
                  ]"
                />
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm"
                  :style="{ backgroundColor: p.color + '25', color: p.color }"
                >
                  #{{ p.rank }}
                </div>
              </div>
              <Crown v-if="n === 0" class="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A84C]" />
            </div>
            <p
              :class="[
                'font-black text-sm sm:text-base mb-0.5',
                n === 0 ? 'text-[#C9A84C]' : 'text-white/80',
              ]"
            >
              {{ p.name }}
            </p>
            <p class="text-white/35 text-[11px] sm:text-xs mb-2 sm:mb-3 truncate">{{ p.org }}</p>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :style="{ width: p.accuracy + '%', backgroundColor: p.color }"
                ></div>
              </div>
              <span
                class="font-black text-[10px] sm:text-xs whitespace-nowrap"
                :style="{ color: p.color }"
                >{{ p.accuracy.toFixed(1) }}%</span
              >
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/competition">
            <button
              class="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#C9A84C] via-[#d4a84b] to-[#B8860B] text-[#060914] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:scale-105"
            >
              View Full Leaderboard
              <ArrowRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>

        <!-- Top Competitors ticker -->
        <div class="mt-16">
          <div class="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-10">
            <div class="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/20"></div>
            <span
              class="text-white/25 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] flex-shrink-0 whitespace-nowrap"
              >Top Competitors</span
            >
            <div class="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/20"></div>
          </div>
          <div
            class="overflow-hidden w-full relative rounded-xl sm:rounded-2xl border border-[#C9A84C]/15 bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] p-3 sm:p-6"
          >
            <div
              class="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#060914] via-[#060914]/50 to-transparent z-10 pointer-events-none"
            ></div>
            <div
              class="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#060914] via-[#060914]/50 to-transparent z-10 pointer-events-none"
            ></div>
            <div class="flex gap-2 sm:gap-4 animate-competitors2">
              <div
                v-for="(c, i) in competitorsLoop"
                :key="`m2${i}`"
                class="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#0a0e1a] to-[#111827] min-w-[200px] sm:min-w-[260px]"
              >
                <div
                  class="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-[#C9A84C] font-black text-[10px] sm:text-xs">#{{ c.rank }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-white/85 font-bold text-[11px] sm:text-sm truncate">{{ c.name }}</p>
                  <p class="text-white/35 text-[10px] truncate">{{ c.org }}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <p class="text-[#C9A84C]/80 font-black text-sm sm:text-base leading-none">
                    {{ c.accuracy }}%
                  </p>
                  <p class="text-white/25 text-[9px] sm:text-xs mt-0.5">{{ c.wins }}/{{ c.total }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Market Intelligence / Current Themes -->
    <section class="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-[#060914] border-t border-[#C9A84C]/10">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <SectionBadge>Market Intelligence</SectionBadge>
            <h2 class="text-3xl sm:text-5xl font-black text-white">
              Current Themes &<br class="hidden sm:block" />
              Key Market Views
            </h2>
          </div>
          <router-link to="/insights" class="flex-shrink-0">
            <button
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-black hover:bg-[#C9A84C]/[0.08] transition-all"
            >
              All Insights
              <ArrowUpRight class="w-4 h-4" />
            </button>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="insight in insights"
            :key="insight.headline"
            :class="[
              'p-6 sm:p-7 rounded-3xl border bg-gradient-to-br via-[#0a0d1a] to-[#060914] hover:border-[#C9A84C]/30 transition-all group cursor-pointer',
              insight.border,
              insight.gradient,
            ]"
          >
            <div class="flex items-start justify-between gap-4 mb-4">
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black border',
                  insight.tagClass,
                ]"
                >{{ insight.tag }}</span
              >
              <span class="text-white/25 text-xs font-semibold flex-shrink-0">{{ insight.date }}</span>
            </div>
            <h3
              class="text-base sm:text-lg font-black text-white mb-3 group-hover:text-[#C9A84C] transition-colors leading-snug"
            >
              {{ insight.headline }}
            </h3>
            <p class="text-white/40 text-sm leading-relaxed">{{ insight.detail }}</p>
            <div
              class="mt-4 flex items-center gap-1.5 text-[#C9A84C]/50 text-xs font-black group-hover:text-[#C9A84C] transition-colors"
            >
              Read Analysis
              <ArrowUpRight class="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Industry Commentary / Testimonials -->
    <section
      class="py-20 sm:py-28 px-6 sm:px-12 lg:px-16 bg-[#060914] border-t border-[#C9A84C]/10 relative overflow-hidden"
    >
      <div class="absolute inset-0 pointer-events-none -z-0">
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9A84C]/[0.04] rounded-full blur-[100px]"
        ></div>
      </div>
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6"
          >
            <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]"
              >Industry Commentary</span
            >
          </div>
          <h2 class="text-3xl sm:text-5xl font-black text-white">What the Industry Says</h2>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <div
            class="rounded-3xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#0d1225] to-[#080b14] p-8 sm:p-12 min-h-[220px] flex flex-col justify-between"
          >
            <div class="flex items-start gap-4 mb-6">
              <svg
                class="w-8 h-8 text-[#C9A84C]/40 flex-shrink-0 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                />
                <path
                  d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                />
              </svg>
              <p class="text-lg sm:text-xl text-white/75 leading-relaxed font-medium italic">
                "{{ testimonials[testimonialIndex].text }}"
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center"
                >
                  <span class="text-[#C9A84C] font-black text-sm">{{
                    testimonials[testimonialIndex].author[0]
                  }}</span>
                </div>
                <div>
                  <p class="text-white/70 text-sm font-black">
                    {{ testimonials[testimonialIndex].author }}
                  </p>
                  <p class="text-[#C9A84C]/50 text-xs">{{ testimonials[testimonialIndex].org }}</p>
                </div>
              </div>
              <span
                class="hidden sm:inline-block px-3 py-1 text-xs font-black rounded-full bg-[#C9A84C]/[0.08] text-[#C9A84C]/50 border border-[#C9A84C]/15"
                >{{ testimonials[testimonialIndex].category }}</span
              >
            </div>
          </div>
          <div class="flex items-center justify-center gap-4 mt-6">
            <button
              @click="prevTestimonial"
              class="p-2.5 rounded-full border border-white/10 text-white/40 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all cursor-pointer"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <div class="flex gap-1.5">
              <button
                v-for="(t, i) in testimonials"
                :key="i"
                @click="testimonialIndex = i"
                :class="[
                  'h-1.5 rounded-full transition-all cursor-pointer',
                  i === testimonialIndex ? 'w-6 bg-[#C9A84C]' : 'w-1.5 bg-white/15 hover:bg-white/30',
                ]"
              ></button>
            </div>
            <button
              @click="nextTestimonial"
              class="p-2.5 rounded-full border border-white/10 text-white/40 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all cursor-pointer"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Thinking -->
    <section class="py-20 px-6 sm:px-12 lg:px-16 bg-[#060914] border-t border-[#C9A84C]/10">
      <div class="max-w-6xl mx-auto">
        <SectionBadge>Latest Thinking</SectionBadge>
        <h2 class="text-3xl sm:text-5xl font-black text-white mb-8 sm:mb-12">
          Defining the Next Era of Energy
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="item in latestThinking"
            :key="item.title"
            class="p-7 rounded-3xl border border-[#C9A84C]/15 bg-gradient-to-br from-[#0d1225] to-[#080b14] hover:border-[#C9A84C]/40 transition-all group"
          >
            <div class="flex items-center gap-2 mb-4">
              <span
                class="text-xs font-black text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-full border border-[#C9A84C]/20"
                >{{ item.year }}</span
              >
              <span class="text-xs text-white/25 font-semibold">{{ item.org }}</span>
            </div>
            <h3
              class="text-xl font-black text-white mb-3 group-hover:text-[#C9A84C] transition-colors"
            >
              "{{ item.title }}"
            </h3>
            <p class="text-white/45 text-sm leading-relaxed mb-4">{{ item.desc }}</p>
            <span
              class="inline-block px-3 py-1 text-xs font-black rounded-full bg-[#C9A84C]/[0.08] text-[#C9A84C]/60 border border-[#C9A84C]/15"
              >{{ item.tag }}</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Press & Media -->
    <section class="py-28 px-6 sm:px-12 lg:px-16 bg-[#060914] border-t border-[#C9A84C]/10">
      <div class="max-w-6xl mx-auto">
        <div class="mb-16">
          <SectionBadge>Press & Media</SectionBadge>
          <h2 class="text-3xl sm:text-5xl font-black text-white mb-4">As Seen In</h2>
          <p class="text-xl text-white/45">
            Bloomberg · CNBC · Financial Times · Sky News · Reuters · The Daily Telegraph
          </p>
        </div>
        <div
          class="relative group"
          @mouseenter="mediaAutoplay = false"
          @mouseleave="mediaAutoplay = true"
        >
          <div
            class="relative h-80 rounded-3xl overflow-hidden border border-[#C9A84C]/20 bg-gradient-to-br from-[#0d1225] to-[#060914] shadow-2xl shadow-black/50"
          >
            <div class="flex h-full">
              <div v-if="mediaItems[mediaIndex].image" class="w-2/5 h-full overflow-hidden relative">
                <img
                  :src="mediaItems[mediaIndex].image"
                  :alt="mediaItems[mediaIndex].publication"
                  class="w-full h-full object-cover opacity-70"
                />
                <div
                  class="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent to-[#0d1225]/80"
                ></div>
              </div>
              <div class="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-black text-[#060914] bg-gradient-to-r from-[#C9A84C] to-[#B8860B] uppercase tracking-widest"
                      >{{ mediaTypeLabels[mediaItems[mediaIndex].type] || mediaItems[mediaIndex].type }}</span
                    >
                    <span class="text-xs text-white/30">{{
                      new Date(mediaItems[mediaIndex].date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    }}</span>
                  </div>
                  <h3 class="text-2xl font-black text-white mb-2 leading-tight">
                    {{ mediaItems[mediaIndex].title }}
                  </h3>
                  <p class="text-[#C9A84C]/60 font-semibold text-sm mb-3">
                    {{ mediaItems[mediaIndex].publication }}
                  </p>
                  <p class="text-white/40 text-sm line-clamp-2 leading-relaxed">
                    {{ mediaItems[mediaIndex].excerpt }}
                  </p>
                </div>
                <a
                  :href="mediaItems[mediaIndex].link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-[#C9A84C]/25 transition-all hover:scale-105 w-fit"
                >
                  Read Article
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
          <button
            @click="prevMedia"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#C9A84C]/20 hover:bg-[#C9A84C]/40 text-[#C9A84C] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#C9A84C]/30 cursor-pointer"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button
            @click="nextMedia"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#C9A84C]/20 hover:bg-[#C9A84C]/40 text-[#C9A84C] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#C9A84C]/30 cursor-pointer"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
          <div class="flex justify-center gap-2 mt-5">
            <button
              v-for="(m, i) in mediaItems"
              :key="`media${i}`"
              @click="mediaIndex = i"
              :class="[
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                i === mediaIndex ? 'bg-[#C9A84C] w-8' : 'bg-white/15 w-2 hover:bg-[#C9A84C]/40',
              ]"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="py-20 px-6 sm:px-12 lg:px-16 border-t border-[#C9A84C]/10">
      <div class="max-w-6xl mx-auto">
        <div
          class="rounded-3xl border border-[#C9A84C]/25 bg-gradient-to-br from-[#C9A84C]/[0.08] via-[#0d1225] to-[#060914] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
        >
          <div>
            <h2 class="text-2xl sm:text-4xl font-black text-white mb-3">Stay Ahead of the Market</h2>
            <p class="text-white/45 text-sm sm:text-lg max-w-xl">
              Subscribe to Jeffrey Currie's Market Insight Alerts — free, expert-level analysis
              delivered directly to your inbox.
            </p>
          </div>
          <div class="flex gap-3 sm:gap-4 flex-shrink-0 w-full md:w-auto">
            <router-link to="/newsletter" class="flex-1 md:flex-none">
              <button
                class="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all hover:scale-105"
              >
                Subscribe Free
              </button>
            </router-link>
            <router-link to="/contact" class="flex-1 md:flex-none">
              <button
                class="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-[#C9A84C]/40 text-[#C9A84C] font-black text-sm uppercase tracking-widest hover:bg-[#C9A84C]/10 transition-all"
              >
                Contact
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-[#C9A84C]/20 py-16 px-6 sm:px-12 lg:px-16 bg-[#060914]">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-[#C9A84C]/15">
          <div>
            <h3 class="font-black text-[#C9A84C] mb-3 text-lg">Jeffrey Currie</h3>
            <p class="text-sm text-white/40 leading-relaxed">
              Chief Strategy Officer, Energy Pathways · The Carlyle Group. Former Global Head of
              Commodities Research, Goldman Sachs.
            </p>
          </div>
          <div>
            <h4 class="font-black text-white/70 mb-4 text-sm uppercase tracking-widest">Explore</h4>
            <ul class="space-y-2.5 text-sm text-white/40">
              <li>
                <router-link to="/" class="hover:text-[#C9A84C] transition">Home</router-link>
              </li>
              <li>
                <router-link to="/about" class="hover:text-[#C9A84C] transition">About</router-link>
              </li>
              <li>
                <router-link to="/projects" class="hover:text-[#C9A84C] transition"
                  >Research</router-link
                >
              </li>
              <li>
                <router-link to="/insights" class="hover:text-[#C9A84C] transition"
                  >Insights</router-link
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-black text-white/70 mb-4 text-sm uppercase tracking-widest">Analytics</h4>
            <ul class="space-y-2.5 text-sm text-white/40">
              <li>
                <router-link to="/market-performance" class="hover:text-[#C9A84C] transition"
                  >Market Performance</router-link
                >
              </li>
              <li>
                <router-link to="/competition" class="hover:text-[#C9A84C] transition"
                  >Global Rankings</router-link
                >
              </li>
              <li>
                <router-link to="/dashboard" class="hover:text-[#C9A84C] transition"
                  >Price Simulator</router-link
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-black text-white/70 mb-4 text-sm uppercase tracking-widest">Connect</h4>
            <ul class="space-y-2.5 text-sm text-white/40">
              <li>
                <router-link to="/newsletter" class="hover:text-[#C9A84C] transition"
                  >Newsletter</router-link
                >
              </li>
              <li>
                <router-link to="/contact" class="hover:text-[#C9A84C] transition"
                  >Contact & Inquiries</router-link
                >
              </li>
            </ul>
            <p class="text-white/25 text-xs mt-4 leading-relaxed">
              For consulting, speaking engagements, and media requests.
            </p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-white/20 text-xs font-bold">© 2026 Jeffrey Currie. All rights reserved.</p>
          <p class="text-white/15 text-xs">
            Chief Strategy Officer, Energy Pathways · The Carlyle Group
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes ticker {
  0% {
    transform: translate(0);
  }
  to {
    transform: translate(-50%);
  }
}
.animate-ticker {
  animation: 40s linear infinite ticker;
}
@keyframes competitorScroll {
  0% {
    transform: translate(0);
  }
  to {
    transform: translate(-50%);
  }
}
.animate-competitors {
  animation: 20s linear infinite competitorScroll;
}
.animate-competitors2 {
  animation: 25s linear infinite competitorScroll;
}
@keyframes shimmerFade {
  0% {
    opacity: 0.6;
  }
  60% {
    opacity: 0.3;
  }
  to {
    opacity: 0;
  }
}
.champion-shimmer {
  animation: 2.5s ease-out forwards shimmerFade;
}
</style>
