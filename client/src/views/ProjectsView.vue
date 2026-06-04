<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Sparkles } from 'lucide-vue-next'
import PageFooter from '../components/PageFooter.vue'

const activeCategory = ref('All')

const categories = ['All', 'Financial Analysis', 'Market Research', 'Strategic Planning']

const tags = ['Strategic Planning', 'Financial Analysis', 'Market Research', 'Energy Policy']

const projects = [
  {
    id: 1,
    title: 'Revenge of the Old Economy — Supercycle Warning',
    year: '2004',
    category: 'Financial Analysis',
    description: '2004 breakthrough research predicting global oil production peak and long-term price appreciation. This landmark analysis became industry standard, accurately forecasting the next decade of oil market trends and energy sector transformation.',
    image: '/images/unsplash/photo-1552664730.jpg',
  },
  {
    id: 2,
    title: 'Food, Feed, and Fuel Report',
    year: '2007',
    category: 'Market Research',
    description: "2007 milestone study 'Food, Feed and Fuel' demonstrating structural price increases in global grain, livestock, and fuel demand.",
    image: '/images/unsplash/photo-1556740738.jpg',
  },
  {
    id: 3,
    title: 'CCCP Trade & Investment Strategy',
    year: '2011',
    category: 'Strategic Planning',
    description: 'April 2011 China-themed trading recommendation suggesting long position in crude oil, copper, and other commodities.',
    image: '/images/unsplash/photo-1552664730.jpg',
  },
  {
    id: 4,
    title: 'Gold Price Collapse Prediction',
    year: '2013',
    category: 'Financial Analysis',
    description: "April 2013 precisely forecasted gold's largest single-day decline in thirty years, two days before the crash occurred. Demonstrated deep understanding of precious metals market dynamics and global economic cycle shifts impacting commodity prices.",
    image: '/images/unsplash/photo-1556740738.jpg',
  },
  {
    id: 5,
    title: 'North America Energy Resource Economic Potential',
    year: '2014',
    category: 'Market Research',
    description: "2014 Symposium presentation 'Unlocking Economic Potential of North America Energy Resources'.",
    image: '/images/unsplash/photo-1552664730.jpg',
  },
  {
    id: 6,
    title: 'New Oil Order & Shale Revolution Analysis',
    year: '2014',
    category: 'Strategic Planning',
    description: "October 2014 'New Oil Order' analysis proving U.S. shale revolution fundamentally reshaping global energy markets, forcing OPEC strategy adaptation.",
    image: '/images/unsplash/photo-1556740738.jpg',
  },
  {
    id: 7,
    title: 'Revenge of the Old Economy & New Supercycle',
    year: '2020',
    category: 'Financial Analysis',
    description: "Late 2020 pivot thesis - 'Revenge of the Old Economy' - predicting strong commodity price appreciation driven by supply underinvestment.",
    image: '/images/unsplash/photo-1552664730.jpg',
  },
]

const filteredProjects = computed(() =>
  activeCategory.value === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory.value)
)
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <section class="pt-36 pb-20 px-6 sm:px-12 lg:px-16">
      <div class="max-w-6xl mx-auto">
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
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]">Research Portfolio</span>
        </div>
        <h1 class="text-6xl font-black text-white mb-4 leading-tight">
          Research &amp;<br />
          <span class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent">Forecasting</span>
        </h1>
        <p class="text-lg text-white/45 mb-6 max-w-3xl">
          A curated selection of Jeffrey Currie's landmark research publications — from the original "Revenge of the Old Economy" supercycle thesis at Goldman Sachs to the "New Joule Order" at The Carlyle Group. Each represents a high-conviction call that moved markets and shaped institutional investment strategy globally.
        </p>

        <div class="flex flex-wrap gap-3 mb-12">
          <span
            v-for="tag in tags"
            :key="tag"
            class="px-3 py-1 rounded-full border border-[#C9A84C]/20 text-[#C9A84C]/50 text-xs font-black uppercase tracking-widest"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex flex-wrap gap-3 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer',
              activeCategory === category
                ? 'bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] shadow-lg shadow-[#C9A84C]/25'
                : 'border border-[#C9A84C]/25 text-white/50 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]',
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            :class="[
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : '',
              index === 3 ? 'lg:col-span-2' : '',
            ]"
          >
            <div
              class="h-full rounded-3xl border border-[#C9A84C]/15 bg-gradient-to-br from-[#0d1225] to-[#080b14] overflow-hidden group hover:border-[#C9A84C]/40 transition-all duration-300 cursor-pointer relative"
            >
              <div :class="['overflow-hidden', index === 0 ? 'h-64 sm:h-80' : 'h-48']">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div class="p-6">
                <div class="flex items-start justify-between gap-3 mb-3">
                  <h3
                    class="text-base sm:text-lg font-black text-white leading-snug flex-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#C9A84C] group-hover:via-[#e8c96b] group-hover:to-[#C9A84C] group-hover:bg-clip-text transition-all duration-300"
                  >
                    {{ project.title }}
                  </h3>
                  <span
                    class="text-xs font-black text-[#C9A84C]/70 px-3 py-1 rounded-lg border border-[#C9A84C]/30 bg-gradient-to-r from-[#C9A84C]/15 to-[#C9A84C]/5 flex-shrink-0 whitespace-nowrap"
                  >
                    {{ project.year }}
                  </span>
                </div>
                <p
                  class="text-sm text-white/50 mb-6 line-clamp-3 leading-relaxed group-hover:text-white/70 transition-colors duration-300"
                >
                  {{ project.description }}
                </p>
                <div class="h-px bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/10 to-transparent mb-4"></div>
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs font-black uppercase tracking-wider text-[#C9A84C]/60 px-3 py-1.5 rounded-full border border-[#C9A84C]/20 bg-gradient-to-r from-[#C9A84C]/10 to-transparent"
                  >
                    {{ project.category }}
                  </span>
                </div>
              </div>
              <div class="absolute bottom-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles class="w-full h-full text-[#C9A84C]/30 group-hover:text-[#C9A84C]/60 transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="filteredProjects.length === 0"
          class="text-center py-20 rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03]"
        >
          <p class="text-white/40 text-lg">No projects found</p>
        </div>
      </div>
    </section>

    <PageFooter year="2024" />
  </div>
</template>
