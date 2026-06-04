<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Zap, Star, Trophy, FileText, ChevronDown } from 'lucide-vue-next'
import SectionBadge from '../components/SectionBadge.vue'
import PageFooter from '../components/PageFooter.vue'

const trackRecord = [
  { year: '2003', text: 'Selected by U.S. House Energy & Commerce Committee as one of eight major executives to discuss natural gas supply/demand imbalances' },
  { year: '2004', text: 'Warned of "Revenge of the Old Economy" — predicted higher commodity prices due to decades of underinvestment' },
  { year: '2007', text: '"Food, Feed, and Fuel" report identified demand-driven structural price increases. Correctly predicted oil would exceed $90 by year-end' },
  { year: '2011', text: 'Closed CCCP trade coinciding with commodity market collapse. Named City AM / CNBC Analyst of the Year' },
  { year: '2013', text: 'Predicted the largest gold price decline in three decades — exactly 2 days before the crash occurred' },
  { year: '2014', text: 'Co-authored Goldman Sachs "New Oil Order" thesis on U.S. shale revolution reshaping global energy markets' },
  { year: '2017', text: 'Identified Bitcoin as a commodity-like asset with structural similarities to gold' },
  { year: '2020', text: 'Initiated "Revenge of the Old Economy" supercycle thesis. The Daily Telegraph named him the world\'s most influential energy expert' },
  { year: '2025', text: 'Recognized by Extel as one of the world\'s leading commodity analysts. Identified copper as the critical strategic metal' },
  { year: '2026', text: '#1 Ranked in Industry Masters Competition with 94.2% prediction accuracy rate (49/52 winning predictions)' },
]

const education = [
  { degree: 'Ph.D. in Economics', year: '1996', school: 'University of Chicago', note: 'Thesis: "Geographic Scope of Markets" — 1997 Zellner Essay Prize, ASA' },
  { degree: 'M.A. in Economics', year: '1990', school: 'University of Chicago' },
  { degree: 'B.A. in Economics', year: '1987', school: 'Pepperdine University' },
]

const careerHighlights = [
  {
    era: '2024–Present',
    title: 'Current Positions',
    items: [
      'Chief Strategy Officer, Energy Pathways, The Carlyle Group',
      'Chair, Advisory Board at University of Chicago\'s Energy Policy Institute (EPIC)',
      'Board Member, I-Pulse (electrical equipment manufacturer)',
    ],
    highlight: true,
  },
  {
    era: '2025',
    title: 'Carlyle Research Publications',
    items: [
      '"The New Joule Order" — Energy security replaces climate mandates',
      '"The New Military Plan" — Projects €9 trillion in European defense investment',
    ],
  },
  {
    era: '1996–2023',
    title: 'Goldman Sachs (27 Years)',
    items: [
      'Managing Director (2002)',
      'Global Head of Commodities Research (2006–2023)',
      'Partner (2008–2023)',
      'Co-head of Europe Economics, Commodities & Strategy (2010–2012, London)',
    ],
  },
  {
    era: '2023',
    title: 'Board Positions',
    items: [
      'Non-Executive Director, Abaxx Technologies',
      'Board Director, Borr Drilling',
    ],
  },
  {
    era: 'Academic',
    title: 'University of Chicago',
    items: [
      'Taught microeconomics and econometrics (undergraduate & graduate)',
      'Associate Editor, Resource and Energy Economics journal',
    ],
  },
]

const achievements = [
  { year: '2026', type: 'award', title: '#1 Global Analyst — Industry Masters Competition', org: 'Industry Masters 2026', detail: '94.2% prediction accuracy (49/52 correct calls) — highest rate ever recorded in competition history. Outperformed 24 elite peers by +17.7 percentage points.' },
  { year: '2025', type: 'report', title: 'The New Joule Order', org: 'The Carlyle Group', detail: 'Co-authored landmark report reshaping how global energy markets understood U.S. shale supply. Widely cited by OPEC, the IEA, and major central banks in their energy outlook documents.' },
  { year: '2024', type: 'report', title: 'The New Military Plan', org: 'The Carlyle Group', detail: 'Warned of rising commodity prices due to decades of underinvestment. Became one of the most cited commodity research notes of the 2000s, predicting the entire 2004–2008 commodity supercycle.' },
  { year: '2023', type: 'award', title: 'Copper as the Strategic Metal of the Decade', org: 'The Carlyle Group', detail: 'Identified copper\'s critical role in the defense supercycle and energy transition. Thesis cited by policymakers across NATO member states and major sovereign wealth funds.' },
  { year: '2022', type: 'award', title: 'Extel Top-Ranked Commodity Analyst', org: 'Extel Survey / Institutional Investor', detail: 'Recognized by buy-side institutional investors as the leading commodity research analyst globally, spanning oil, metals, and macro strategy.' },
  { year: '2020', type: 'impact', title: 'New Commodity Supercycle Thesis', org: 'Goldman Sachs', detail: 'Called the start of a new commodity supercycle driven by a decade of underinvestment. Vindicated spectacularly in 2021-22 as commodities surged 85%+. The Daily Telegraph named him the world\'s most influential energy economist.' },
  { year: '2017', type: 'report', title: 'Bitcoin Classified as a Commodity', org: 'Goldman Sachs Global Investment Research', detail: 'First major Wall Street analyst to formally classify Bitcoin as a commodity with structural similarities to gold. Thesis became the foundational framework for crypto-commodity academic literature.' },
  { year: '2014', type: 'report', title: '"New Oil Order" — U.S. Shale Revolution Report', org: 'Goldman Sachs', detail: 'Co-authored landmark report reshaping how global energy markets understood U.S. shale supply. Widely cited by OPEC, the IEA, and major central banks in their energy outlook documents.' },
  { year: '2013', type: 'impact', title: 'Gold Crash Call — 2 Days Before the Event', org: 'Goldman Sachs', detail: 'Publicly predicted the largest gold price decline in 30 years, two days before the historic crash. Gold fell over $200/oz within 48 hours, validating the call in real time.' },
  { year: '2011', type: 'award', title: 'Analyst of the Year — City AM / CNBC', org: 'City AM & CNBC', detail: 'Awarded Analyst of the Year following the successful closure of the CCCP trade, which correctly anticipated the 2011 commodity market collapse.' },
  { year: '2007', type: 'report', title: '"Food, Feed, and Fuel" Report', org: 'Goldman Sachs Global Investment Research', detail: 'Seminal report identifying demand-driven structural increases in agricultural and energy prices. Correctly predicted oil would exceed $90/bbl by year-end and flagged global food price inflation years before the 2008 crisis.' },
  { year: '2004', type: 'report', title: '"Revenge of the Old Economy" — Supercycle Warning', org: 'Goldman Sachs Global Investment Research', detail: 'Warned of rising commodity prices due to decades of underinvestment. Became one of the most cited commodity research notes of the 2000s, predicting the entire 2004–2008 commodity supercycle.' },
  { year: '2003', type: 'impact', title: 'U.S. House Energy & Commerce Committee Testimony', org: 'U.S. Congress', detail: 'Selected as one of only eight major industry executives to testify before Congress on natural gas supply/demand imbalances — establishing his authority as a top policy-facing energy economist.' },
]

const typeConfig = {
  award: { icon: Trophy, color: '#C9A84C', bg: 'bg-[#C9A84C]/15', border: 'border-[#C9A84C]/40', label: 'Award' },
  report: { icon: FileText, color: '#60a5fa', bg: 'bg-blue-500/10', border: 'border-blue-400/30', label: 'Report' },
  impact: { icon: Zap, color: '#34d399', bg: 'bg-emerald-500/10', border: 'border-emerald-400/30', label: 'Impact' },
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'award', label: '🏆 Awards' },
  { id: 'report', label: '📄 Reports' },
  { id: 'impact', label: '⚡ Impact' },
]

const expertise = [
  'Commodities Research & Analysis',
  'Energy Market Strategy',
  'Commodity Supercycle Analysis',
  'Oil & Metals Price Forecasting',
  'Cryptocurrency-Commodity Correlation',
  'Macroeconomic Analysis',
]

const interviews = [
  { id: 'xLiLCDCZupw', label: 'Jeffrey Currie Interview' },
  { id: 'vDv1zIbxq_8', label: 'Energy Market Analysis' },
  { id: '54Jt9NdGz1o', label: 'Supercycle Thesis' },
  { id: 'Au6Exwc2R6s', label: 'Goldman Sachs Research' },
  { id: 'q4kWgtIplmA', label: 'New Energy Order' },
  { id: 'FJ2F1HJX4-o', label: 'Commodities Outlook' },
]

const mediaGallery = [
  { img: '/images/unsplash/photo-1478737270239.jpg', label: 'Bloomberg Interview' },
  { img: '/images/unsplash/photo-1504711434969.jpg', label: 'CNBC Appearance' },
  { img: '/images/unsplash/photo-1586339949916.jpg', label: 'Financial Times' },
  { img: '/images/unsplash/photo-1560472355.jpg', label: 'Global Energy Forum' },
]

const activeFilter = ref('all')
const expandedAchievement = ref(null)

const filteredAchievements = computed(() =>
  activeFilter.value === 'all'
    ? achievements
    : achievements.filter((a) => a.type === activeFilter.value),
)
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <div class="relative w-full h-[45vh] sm:h-[60vh] overflow-hidden">
      <img
        src="/images/unsplash/photo-1611974789855-1600w.jpg"
        alt="Global financial markets"
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#060914]/40 to-transparent"></div>
      <div class="absolute bottom-6 sm:bottom-12 left-6 sm:left-16">
        <div class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 mb-4">
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]">Chief Strategy Officer · The Carlyle Group</span>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
          Jeffrey<br />
          <span class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent">Currie</span>
        </h1>
      </div>
    </div>

    <section class="pb-28 px-6 sm:px-12 lg:px-16">
      <div class="max-w-5xl mx-auto">
        <router-link
          to="/"
          class="inline-flex items-center gap-1.5 mb-12 mt-8 text-sm text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </router-link>

        <div class="space-y-20">
          <!-- Background -->
          <section class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div class="lg:col-span-3 space-y-6">
              <SectionBadge>Background</SectionBadge>
              <h2 class="text-2xl sm:text-4xl font-black text-white">A Legendary Career in Commodities</h2>
              <p class="text-lg text-white/60 leading-relaxed">
                Jeffrey Currie is a globally recognized economist specializing in applied and energy economics. Age 61, he currently serves as Chief Strategy Officer of Energy Pathways at The Carlyle Group and chairs the Advisory Board of the Energy Policy Institute at the University of Chicago (EPIC).
              </p>
              <p class="text-white/50 leading-relaxed">
                Over a 27-year career at Goldman Sachs, Currie served as the firm's Global Head of Commodities Research, building one of the most influential franchises in Wall Street history. His analytical leadership covered crude oil, natural gas, metals, agriculture, and carbon markets.
              </p>
              <p class="text-white/50 leading-relaxed">
                Known for his bold, high-conviction calls and accurate commodity forecasting, he has earned recognition as a "maverick" in the industry for making calls that pack a punch.
              </p>
              <p class="text-white/50 leading-relaxed">
                Currie rose to prominence in the 2000s for predicting the commodity supercycle and oil prices exceeding $100 per barrel. In the 2010s, he correctly forecasted oil would remain depressed long-term as shale supply normalized. Recently, his stance has shifted from bearish to notably optimistic, predicting a new commodity "supercycle" beginning in late 2020, driven by underinvestment in supply — a phenomenon he termed "Revenge of the Old Economy."
              </p>
            </div>
          </section>

          <!-- Core Expertise -->
          <section class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
                <span class="text-[#C9A84C] text-xs font-black uppercase tracking-widest">Core Expertise</span>
              </div>
              <h2 class="text-2xl sm:text-4xl font-black text-white mb-8">Where Insight Meets Precision</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="item in expertise"
                  :key="item"
                  class="flex items-center gap-3 p-4 rounded-xl border border-[#C9A84C]/15 bg-[#C9A84C]/5 hover:border-[#C9A84C]/40 transition-all"
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0"></div>
                  <span class="text-white/80 text-sm font-semibold">{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-2xl overflow-hidden border border-white/[0.08] row-span-2">
                <img
                  src="/images/unsplash/photo-1590283603385.jpg"
                  alt="Oil markets"
                  class="w-full h-full object-cover"
                  style="min-height: 180px;"
                />
              </div>
              <div class="rounded-2xl overflow-hidden border border-white/[0.08]">
                <img src="/images/unsplash/photo-1611974789855-600w.jpg" alt="Trading floor" class="w-full h-28 sm:h-40 object-cover" />
              </div>
              <div class="rounded-2xl overflow-hidden border border-white/[0.08]">
                <img src="/images/unsplash/photo-1551288049.jpg" alt="Data analysis" class="w-full h-28 sm:h-40 object-cover" />
              </div>
            </div>
          </section>

          <!-- Featured Interviews -->
          <section>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
              <span class="text-[#C9A84C] text-xs font-black uppercase tracking-widest">Featured Interviews</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-black text-white mb-3">In His Own Words</h2>
            <p class="text-white/40 text-sm mb-8">视频自动静音播放，点击右上角按钮开启声音</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="video in interviews"
                :key="video.id"
                class="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 bg-[#0a0e1a] shadow-xl shadow-black/50 group"
              >
                <a
                  :href="'https://www.youtube.com/watch?v=' + video.id"
                  target="_blank"
                  class="block relative"
                  style="padding-bottom: 56.25%;"
                >
                  <div class="absolute inset-0">
                    <img
                      :src="'/images/youtube/youtube_' + video.id + '.jpg'"
                      :alt="video.label"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-[#060914]/40 group-hover:bg-[#060914]/20 transition-all duration-300"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-14 h-14 rounded-full bg-[#C9A84C]/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg shadow-[#C9A84C]/30">
                        <svg class="w-5 h-5 text-[#060914] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                      </div>
                    </div>
                  </div>
                </a>
                <div class="flex items-center gap-2 px-4 py-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span class="text-white/60 text-xs font-semibold">{{ video.label }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Career Achievements (filterable timeline) -->
          <section>
            <SectionBadge>
              <template #icon>
                <Star class="w-3.5 h-3.5 text-[#C9A84C]" />
              </template>
              Career Achievements
            </SectionBadge>
            <h2 class="text-2xl sm:text-4xl font-black text-white mb-3">A Legacy Written in Bold Calls</h2>
            <p class="text-white/40 text-sm mb-8 max-w-2xl">
              Awards, landmark reports, and industry-defining moments spanning three decades of commodity market leadership.
            </p>
            <div class="flex flex-wrap gap-2 mb-10">
              <button
                v-for="f in filters"
                :key="f.id"
                @click="activeFilter = f.id"
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer',
                  activeFilter === f.id
                    ? 'bg-[#C9A84C] text-[#060914]'
                    : 'bg-white/5 text-white/45 hover:bg-white/10 border border-white/10',
                ]"
              >
                {{ f.label }}
              </button>
            </div>
            <div class="relative">
              <div class="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent"></div>
              <div class="space-y-4">
                <div
                  v-for="(item, index) in filteredAchievements"
                  :key="index"
                  class="relative flex gap-5"
                >
                  <div
                    :class="[
                      'relative z-10 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border',
                      typeConfig[item.type].bg,
                      typeConfig[item.type].border,
                    ]"
                  >
                    <component
                      :is="typeConfig[item.type].icon"
                      class="w-4 h-4"
                      :style="{ color: typeConfig[item.type].color }"
                    />
                  </div>
                  <div
                    :class="[
                      'flex-1 p-5 rounded-2xl border cursor-pointer transition-all duration-300',
                      expandedAchievement === index
                        ? 'border-[#C9A84C]/30 bg-[#C9A84C]/5'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.03]',
                    ]"
                    @click="expandedAchievement = expandedAchievement === index ? null : index"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex-1 min-w-0">
                        <div class="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            class="text-xs font-black px-2.5 py-0.5 rounded-full border"
                            :style="{
                              color: typeConfig[item.type].color,
                              borderColor: typeConfig[item.type].color + '40',
                              background: typeConfig[item.type].color + '12',
                            }"
                          >
                            {{ item.year }}
                          </span>
                          <span class="text-[10px] font-black uppercase tracking-wider text-white/25">
                            {{ typeConfig[item.type].label }}
                          </span>
                        </div>
                        <h3
                          :class="[
                            'font-black text-sm sm:text-base leading-snug transition-colors',
                            expandedAchievement === index ? 'text-[#C9A84C]' : 'text-white/85',
                          ]"
                        >
                          {{ item.title }}
                        </h3>
                        <p class="text-white/30 text-xs mt-0.5">{{ item.org }}</p>
                      </div>
                      <div
                        :class="[
                          'flex-shrink-0 w-5 h-5 rounded-full border border-white/15 flex items-center justify-center transition-transform duration-300',
                          expandedAchievement === index ? 'rotate-180 border-[#C9A84C]/40' : '',
                        ]"
                      >
                        <ChevronDown class="w-2.5 h-2.5 text-white/40" />
                      </div>
                    </div>
                    <div v-if="expandedAchievement === index" class="mt-4 pt-4 border-t border-[#C9A84C]/15">
                      <p class="text-white/55 text-sm leading-relaxed">{{ item.detail }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Key Achievements & Forecasts -->
          <section>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
              <span class="text-[#C9A84C] text-xs font-black uppercase tracking-widest">Key Achievements & Forecasts</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-black text-white mb-8">A Track Record Unlike Any Other</h2>
            <ul class="space-y-3">
              <li
                v-for="entry in trackRecord"
                :key="entry.year"
                class="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#C9A84C]/25 hover:bg-[#C9A84C]/[0.03] transition-all group"
              >
                <span class="text-[#C9A84C] font-black text-sm flex-shrink-0 mt-0.5 bg-[#C9A84C]/10 px-2.5 py-1 rounded-lg border border-[#C9A84C]/20 group-hover:bg-[#C9A84C]/20 transition-all">
                  {{ entry.year }}
                </span>
                <p class="text-white/60 text-sm leading-relaxed">{{ entry.text }}</p>
              </li>
            </ul>
          </section>

          <!-- Education -->
          <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
                <span class="text-[#C9A84C] text-xs font-black uppercase tracking-widest">Education</span>
              </div>
              <h2 class="text-2xl sm:text-4xl font-black text-white mb-8">Academic Excellence</h2>
              <div class="space-y-4">
                <div
                  v-for="edu in education"
                  :key="edu.degree"
                  class="flex gap-5 p-5 rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] hover:border-[#C9A84C]/35 transition-all"
                >
                  <div class="w-px bg-gradient-to-b from-[#C9A84C] to-[#C9A84C]/20 flex-shrink-0"></div>
                  <div>
                    <p class="font-black text-white">
                      {{ edu.degree }}
                      <span class="text-[#C9A84C]/60 font-semibold text-sm">· {{ edu.year }}</span>
                    </p>
                    <p class="text-white/50 text-sm">{{ edu.school }}</p>
                    <p v-if="edu.note" class="text-white/30 text-xs mt-1">{{ edu.note }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="rounded-3xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl shadow-black/60">
              <img src="/images/unsplash/photo-1607237138185.jpg" alt="University of Chicago" class="w-full h-96 object-cover" />
            </div>
          </section>

          <!-- Career Highlights -->
          <section>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
              <span class="text-[#C9A84C] text-xs font-black uppercase tracking-widest">Career Highlights</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-black text-white mb-8">27 Years of Market Leadership</h2>
            <div class="space-y-6">
              <div
                v-for="block in careerHighlights"
                :key="block.title"
                :class="[
                  'p-6 rounded-2xl border transition-all',
                  block.highlight ? 'border-[#C9A84C]/30 bg-[#C9A84C]/5' : 'border-white/[0.08] bg-white/[0.02]',
                ]"
              >
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-[#C9A84C] font-black text-xs bg-[#C9A84C]/10 px-2.5 py-1 rounded-lg border border-[#C9A84C]/20">{{ block.era }}</span>
                  <h3 class="font-black text-white text-lg">{{ block.title }}</h3>
                </div>
                <ul class="space-y-2 ml-1">
                  <li
                    v-for="item in block.items"
                    :key="item"
                    class="flex items-start gap-2 text-white/50 text-sm"
                  >
                    <span class="text-[#C9A84C]/40 mt-1.5 flex-shrink-0">·</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Media & Speaking -->
          <section>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
              <span class="text-[#C9A84C] text-xs font-black uppercase tracking-widest">Media & Speaking</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-black text-white mb-4">Global Voice on Energy Markets</h2>
            <p class="text-white/50 text-lg mb-10 max-w-3xl leading-relaxed">
              Regular commentator on commodity markets and cryptocurrency, featured on Sky News, Bloomberg, CNBC, Reuters, and Financial Times. Advisory Board Member at EPIC, University of Chicago.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                v-for="media in mediaGallery"
                :key="media.label"
                class="relative rounded-2xl overflow-hidden border border-white/[0.08] group"
              >
                <img
                  :src="media.img"
                  :alt="media.label"
                  class="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#060914]/80 to-transparent"></div>
                <p class="absolute bottom-3 left-3 text-white/70 text-xs font-semibold">{{ media.label }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <PageFooter year="2024" />
  </div>
</template>
