<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Clock, Search } from 'lucide-vue-next'
import SectionBadge from '../components/SectionBadge.vue'
import PageFooter from '../components/PageFooter.vue'
import GlowBackground from '../components/GlowBackground.vue'

const activeCategory = ref('All')
const searchQuery = ref('')

const categories = [
  'All',
  'Energy Markets',
  'Commodities',
  'Geopolitics',
  'Macroeconomics',
  'Strategy',
  'Technology',
]

const categoryStyles = {
  Technology: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  Strategy: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Commodities: 'bg-[#e8c96b]/10 text-[#e8c96b] border border-[#e8c96b]/30',
  Geopolitics: 'bg-red-500/10 text-red-400 border border-red-500/20',
  'Energy Markets': 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30',
  Macroeconomics: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
}

const mediaMentions = [
  { image: '/images/insights/media_1.png', label: 'Energy Market Insights Discussion' },
  { image: '/images/insights/media_2.png', label: 'Commodity Markets Analysis' },
  { image: '/images/insights/media_3.png', label: 'Trading Floor Interview' },
]

const articles = [
  {
    headline: 'AI and the Commodity Supercycle: The Electricity Demand Nobody Modelled',
    detail: 'The artificial intelligence revolution is creating an electricity demand surge that existing grid infrastructure cannot accommodate. The commodity implications — copper, natural gas, uranium — are profound.',
    category: 'Technology',
    date: 'Apr 15, 2026',
    readTime: '8 min',
    image: '/images/insights/photo-1677442135703.jpg',
  },
  {
    headline: 'Revenge of the Old Economy: The Thesis That Defined a Decade',
    detail: "Five years after coining the 'Revenge of the Old Economy' supercycle thesis, a retrospective on what the market got right, what it missed, and what the next chapter of the commodity cycle looks like.",
    category: 'Strategy',
    date: 'Apr 10, 2026',
    readTime: '10 min',
    image: '/images/insights/photo-1559526324.jpg',
  },
  {
    headline: 'Copper: The Metal of the 21st Century',
    detail: 'Copper sits at the intersection of electrification, defence, and digitisation. Supply constraints and demand acceleration make it the single most important commodity for the energy transition and beyond.',
    category: 'Commodities',
    date: 'Apr 1, 2026',
    readTime: '8 min',
    image: '/images/insights/photo-1504328345606.jpg',
  },
  {
    headline: 'The Defence Supercycle: €9 Trillion and the Commodities It Will Consume',
    detail: "Europe's rearmament programme represents the largest peacetime defence build-up in history. The commodity intensity of modern military systems is creating a new and underappreciated demand driver.",
    category: 'Geopolitics',
    date: 'Mar 28, 2026',
    readTime: '10 min',
    image: '/images/insights/photo-1578357078586.jpg',
  },
  {
    headline: 'The New Joule Order: Energy Security Replaces Climate Mandates',
    detail: 'A seismic shift is underway in global energy policy — from climate-driven investment mandates to energy security as the dominant market force. The implications for commodity pricing are profound.',
    category: 'Energy Markets',
    date: 'Mar 15, 2026',
    readTime: '8 min',
    image: '/images/insights/energy-security.jpg',
  },
  {
    headline: 'The New Joule Order: Energy Security Replaces Climate Mandates',
    detail: 'The next energy era will be defined by security of supply rather than climate mandates, as geopolitical fragmentation forces nations to rethink their energy architecture from the ground up.',
    category: 'Energy Markets',
    date: 'Mar 15, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1473341304170.jpg',
  },
  {
    headline: 'Bitcoin as Commodity: The Case I Made in 2017 and What Has Changed',
    detail: 'In 2017, I was among the first major commodity analysts to classify Bitcoin as a commodity. Eight years on, revisiting that thesis in light of institutional adoption, ETF approval, and evolving regulation.',
    category: 'Technology',
    date: 'Mar 20, 2026',
    readTime: '9 min',
    image: '/images/insights/photo-1518546305927.jpg',
  },
  {
    headline: 'Gold in a World of Fiscal Excess',
    detail: "Gold's traditional inverse relationship with real interest rates has broken down. Central bank accumulation and de-dollarisation trends are rewriting the metal's price dynamics.",
    category: 'Commodities',
    date: 'Mar 5, 2026',
    readTime: '7 min',
    image: '/images/insights/photo-1610375461246.jpg',
  },
  {
    headline: 'Oil at $90: Supply Discipline Meets Demand Resilience',
    detail: 'OPEC+ supply cuts, underinvestment in upstream capacity, and surprisingly resilient demand from emerging markets are converging to support oil prices well above consensus estimates.',
    category: 'Energy Markets',
    date: 'Feb 28, 2026',
    readTime: '6 min',
    image: '/images/insights/photo-1558618666.jpg',
  },
  {
    headline: "The Fed's Commodity Blind Spot: Why Rate Policy Misreads Supply Shocks",
    detail: 'Central banks are structurally ill-equipped to respond to commodity supply shocks. Their tools address demand, not supply — and using them to fight commodity inflation risks inflicting unnecessary economic damage.',
    category: 'Macroeconomics',
    date: 'Feb 20, 2026',
    readTime: '8 min',
    image: '/images/insights/photo-1611974789855.jpg',
  },
  {
    headline: 'Ukraine, Gaza, and the Geopolitics of Energy Chokepoints',
    detail: 'Two simultaneous conflicts — in Europe and the Middle East — are testing the resilience of global energy supply chains and reshaping geopolitical alignments around commodity access.',
    category: 'Geopolitics',
    date: 'Feb 10, 2026',
    readTime: '9 min',
    image: '/images/insights/photo-1543165796.jpg',
  },
  {
    headline: 'Building a Commodity Portfolio for the 2020s: Principles and Pitfalls',
    detail: 'Commodity investing requires a fundamentally different analytical framework than equities or fixed income. Here are the principles that have guided my approach over three decades.',
    category: 'Strategy',
    date: 'Feb 5, 2026',
    readTime: '9 min',
    image: '/images/insights/photo-1611974789855.jpg',
  },
  {
    headline: "China's Economic Rebalancing: What It Means for Global Commodity Demand",
    detail: "China's shift from investment-driven to consumption-driven growth is the single largest structural change facing global commodity markets. The winners and losers are not what the consensus expects.",
    category: 'Macroeconomics',
    date: 'Jan 30, 2026',
    readTime: '9 min',
    image: '/images/insights/photo-1547981609.jpg',
  },
  {
    headline: 'European Gas: The Decade of LNG Dependency',
    detail: "Europe's pivot away from Russian pipeline gas has permanently restructured the global LNG market, with consequences for pricing, infrastructure investment, and geopolitical leverage.",
    category: 'Energy Markets',
    date: 'Jan 20, 2026',
    readTime: '7 min',
    image: '/images/insights/photo-1473341304170.jpg',
  },
  {
    headline: 'The Agricultural Commodity Supercycle Nobody Is Talking About',
    detail: 'While attention focuses on energy and industrial metals, agricultural commodity markets face a structural supply-demand imbalance driven by climate change, population growth, and biofuel mandates.',
    category: 'Commodities',
    date: 'Jan 15, 2026',
    readTime: '9 min',
    image: '/images/insights/photo-1625246333195.jpg',
  },
  {
    headline: "China's Strategic Commodity Stockpiling: What the Data Tells Us",
    detail: 'China has been systematically building strategic reserves of critical commodities. Understanding the scale and motivation of this stockpiling is essential for commodity price forecasting.',
    category: 'Geopolitics',
    date: 'Jan 8, 2026',
    readTime: '7 min',
    image: '/images/insights/photo-1569025691136.jpg',
  },
  {
    headline: 'Critical Minerals and the New Resource Nationalism',
    detail: 'Governments are increasingly treating critical minerals as strategic assets, imposing export controls, demanding local processing, and restructuring foreign investment rules. The investment implications are substantial.',
    category: 'Technology',
    date: 'Jan 5, 2026',
    readTime: '9 min',
    image: '/images/insights/photo-1581092921461.jpg',
  },
  {
    headline: 'Stagflation Risk: The 1970s Playbook in a 2020s World',
    detail: 'The combination of persistent commodity inflation, slowing growth, and structural supply constraints bears uncomfortable similarities to the 1970s stagflation episode. But key differences change the commodity investment calculus.',
    category: 'Macroeconomics',
    date: 'Dec 22, 2025',
    readTime: '10 min',
    image: '/images/insights/photo-1611974789855.jpg',
  },
  {
    headline: "Nuclear's Quiet Renaissance",
    detail: 'After decades of political headwinds, nuclear power is experiencing a global policy reversal driven by energy security concerns, AI data center demand, and decarbonisation targets.',
    category: 'Energy Markets',
    date: 'Dec 10, 2025',
    readTime: '9 min',
    image: '/images/insights/energy-security.jpg',
  },
  {
    headline: 'When Consensus Is Wrong: The Anatomy of a Great Commodity Call',
    detail: 'The most valuable commodity forecasts are those that diverge from consensus. Understanding the systematic biases in consensus commodity forecasting reveals where the next great call is likely to come from.',
    category: 'Strategy',
    date: 'Dec 1, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1559526324.jpg',
  },
  {
    headline: 'The Green Hydrogen Hype and the Reality of Commodity Markets',
    detail: 'Green hydrogen has been promoted as a universal decarbonisation solution. The commodity market reality — cost, scale, and infrastructure requirements — is far more challenging than the hype suggests.',
    category: 'Technology',
    date: 'Nov 25, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1677442135703.jpg',
  },
  {
    headline: 'OPEC+ at a Crossroads: Market Share vs. Price Defence',
    detail: 'The strategic coherence of OPEC+ is under greater strain than at any point since its formation. The divergence between member interests is creating both risks and opportunities for oil market investors.',
    category: 'Geopolitics',
    date: 'Nov 18, 2025',
    readTime: '7 min',
    image: '/images/insights/photo-1578357078586.jpg',
  },
  {
    headline: 'The Carbon Price Dilemma: Markets vs. Mandates',
    detail: 'Carbon markets have delivered genuine price signals in Europe but have struggled to gain traction globally. The divergence between jurisdictions is creating both arbitrage opportunities and competitive distortions.',
    category: 'Energy Markets',
    date: 'Nov 5, 2025',
    readTime: '7 min',
    image: '/images/insights/photo-1473341304170.jpg',
  },
  {
    headline: 'The Carlyle Energy Pathways Investment Framework',
    detail: "An overview of the analytical framework guiding Carlyle's Energy Pathways strategy — combining macroeconomic overlay, commodity cycle positioning, and private market access to navigate the energy transition.",
    category: 'Strategy',
    date: 'Oct 30, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1611974789855.jpg',
  },
  {
    headline: "Iron Ore's Structural Inflection: China's Slowdown and the Green Steel Revolution",
    detail: "Iron ore faces a dual transition: the structural slowdown of China's property sector reduces demand, while the green steel revolution will fundamentally alter the ore grade requirements of the future.",
    category: 'Commodities',
    date: 'Oct 20, 2025',
    readTime: '6 min',
    image: '/images/insights/photo-1504328345606.jpg',
  },
  {
    headline: "The Dollar's Reserve Status and What Its Erosion Means for Commodities",
    detail: 'Dollar hegemony is eroding at the margins. The implications for commodity pricing, central bank reserve management, and the geopolitics of resource access are profound.',
    category: 'Geopolitics',
    date: 'Oct 5, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1543165796.jpg',
  },
  {
    headline: 'ESG at an Inflection: From Mandate to Merit',
    detail: 'The ESG investment framework is undergoing a fundamental recalibration. The shift from compliance-driven mandates to fundamental-merit ESG analysis will reshape capital flows in commodity markets.',
    category: 'Strategy',
    date: 'Sep 20, 2025',
    readTime: '9 min',
    image: '/images/insights/photo-1559526324.jpg',
  },
  {
    headline: 'Lithium: The Boom, the Bust, and What Comes Next',
    detail: 'Lithium prices collapsed 80% from their 2022 peak as supply overwhelmed demand forecasts. Understanding why the market over-corrected is key to positioning for the next phase of the cycle.',
    category: 'Commodities',
    date: 'Sep 12, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1610375461246.jpg',
  },
  {
    headline: 'Emerging Market Debt and Commodity Exporters: A Dangerous Divergence',
    detail: 'Many commodity-exporting emerging markets took on significant debt during the low-rate era. As rates remain elevated and commodity revenues fluctuate, the debt sustainability questions are intensifying.',
    category: 'Macroeconomics',
    date: 'Aug 30, 2025',
    readTime: '7 min',
    image: '/images/insights/photo-1547981609.jpg',
  },
  {
    headline: 'Commodity Trading in the Age of Algorithmic Markets',
    detail: 'The rise of algorithmic and high-frequency trading in commodity futures markets is changing price discovery dynamics, volatility patterns, and the information content of market signals.',
    category: 'Technology',
    date: 'Aug 10, 2025',
    readTime: '7 min',
    image: '/images/insights/photo-1581092921461.jpg',
  },
  {
    headline: 'The Multipolar Currency World and Commodity Pricing',
    detail: 'As global trade increasingly settles in non-dollar currencies, the traditional relationship between the dollar index and commodity prices is weakening, creating new analytical challenges for commodity investors.',
    category: 'Macroeconomics',
    date: 'Jul 15, 2025',
    readTime: '8 min',
    image: '/images/insights/photo-1611974789855.jpg',
  },
  {
    headline: "AI's Insatiable Energy Appetite: Implications for Power Markets",
    detail: 'The rapid buildout of AI data centers is creating an unprecedented demand surge for electricity — fundamentally altering the supply-demand balance in power markets across the United States and Europe.',
    category: 'Technology',
    date: 'Apr 1, 2025',
    readTime: '7 min',
    image: '/images/insights/photo-1677442135703.jpg',
  },
  {
    headline: 'European Defense Spending: A €9 Trillion Opportunity',
    detail: "Europe's commitment to rearmament and security infrastructure represents one of the largest coordinated investment programs in modern history — with profound implications for commodity markets.",
    category: 'Geopolitics',
    date: 'Feb 10, 2025',
    readTime: '6 min',
    image: '/images/insights/photo-1578357078586.jpg',
  },
  {
    headline: "Gold's Enduring Role in a Fragmented World Order",
    detail: 'As central banks diversify reserves away from dollar-denominated assets and geopolitical uncertainty remains elevated, gold reasserts its role as the ultimate store of value.',
    category: 'Macroeconomics',
    date: 'Jan 8, 2025',
    readTime: '5 min',
    image: '/images/insights/photo-1610375461246.jpg',
  },
  {
    headline: 'The Revenge of the Old Economy: Why Commodities Are Back',
    detail: 'Decades of underinvestment in physical supply infrastructure have set the stage for a generational commodity supercycle — one that could reshape global markets for years to come.',
    category: 'Commodities',
    date: 'Nov 20, 2024',
    readTime: '7 min',
    image: '/images/insights/photo-1504328345606.jpg',
  },
  {
    headline: 'Predicting the 2013 Gold Crash: Inside the Call',
    detail: 'Two days before the largest single-day gold price decline in three decades, our team made the call. Here is the analytical framework that made it possible.',
    category: 'Strategy',
    date: 'Sep 14, 2024',
    readTime: '9 min',
    image: '/images/insights/photo-1559526324.jpg',
  },
]

const filteredArticles = computed(() => {
  let result =
    activeCategory.value === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (a) =>
        a.headline.toLowerCase().includes(q) || a.detail.toLowerCase().includes(q),
    )
  }
  return result
})

const featuredArticles = computed(() => filteredArticles.value.slice(0, 6))
const gridArticles = computed(() => filteredArticles.value.slice(6))
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <section class="relative pt-32 sm:pt-44 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden">
      <GlowBackground />
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="mb-10">
          <router-link
            to="/"
            class="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Home
          </router-link>
        </div>
        <SectionBadge>Analysis &amp; Perspectives</SectionBadge>
        <h1 class="text-3xl sm:text-6xl font-black text-white mb-4 leading-tight">
          Market<br />
          <span
            class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
            >Insights</span
          >
        </h1>
        <p class="text-white/45 text-lg max-w-3xl">
          Long-form analysis on global energy markets, commodities, and macroeconomic trends from
          Jeffrey Currie.
        </p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pb-28">
      <div class="flex items-center gap-4 mb-8">
        <div class="flex flex-wrap gap-2 flex-1">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
              activeCategory === category
                ? 'bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] shadow-lg shadow-[#C9A84C]/25'
                : 'border border-[#C9A84C]/25 text-white/50 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]',
            ]"
          >
            {{ category }}
          </button>
        </div>
        <div class="relative w-48 flex-shrink-0 hidden sm:block">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/40"
          />
        </div>
      </div>

      <div class="mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-4"
        >
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]"
            >📡 Real-time Media Coverage</span
          >
        </div>
        <h3 class="text-xl font-black text-white mb-6 flex items-center gap-2">
          ⭐ Featured Mentions
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            v-for="(media, index) in mediaMentions"
            :key="index"
            href="#"
            target="_blank"
            class="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 group h-40"
          >
            <div class="absolute inset-0">
              <img
                :src="media.image"
                :alt="media.label"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              class="absolute inset-0 bg-[#060914]/30 group-hover:bg-[#060914]/10 transition-all"
            ></div>
            <div
              class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] text-[10px] font-black uppercase"
            >
              Interview
            </div>
            <div
              class="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            >
              <span class="text-sm">🎙️</span>
            </div>
          </a>
        </div>
      </div>

      <div class="space-y-6 mb-8">
        <router-link
          v-for="(article, index) in featuredArticles"
          :key="`f-${index}`"
          to="/InsightDetail"
          class="block rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-[#C9A84C]/30 transition-all group"
        >
          <div class="overflow-hidden h-72">
            <img
              :src="article.image"
              :alt="article.headline"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span
                :class="[
                  'text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                  categoryStyles[article.category],
                ]"
                >{{ article.category }}</span
              >
              <span class="text-white/30 text-xs flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ article.readTime }}
              </span>
            </div>
            <h2
              class="text-lg sm:text-xl font-black text-white/90 mb-2 group-hover:text-[#C9A84C] transition-colors leading-snug"
            >
              {{ article.headline }}
            </h2>
            <p class="text-white/40 text-sm leading-relaxed mb-4">{{ article.detail }}</p>
            <div class="flex items-center justify-between border-t border-white/[0.06] pt-4">
              <span class="text-white/30 text-xs">{{ article.date }}</span>
              <span
                class="text-[#C9A84C] text-xs font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >Read More →</span
              >
            </div>
          </div>
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <router-link
          v-for="(article, index) in gridArticles"
          :key="`g-${index}`"
          to="/InsightDetail"
          class="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-[#C9A84C]/30 transition-all group"
        >
          <div class="overflow-hidden h-48">
            <img
              :src="article.image"
              :alt="article.headline"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between mb-3">
              <span
                :class="[
                  'text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                  categoryStyles[article.category],
                ]"
                >{{ article.category }}</span
              >
              <span class="text-white/30 text-xs flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ article.readTime }}
              </span>
            </div>
            <h3
              class="text-sm font-black text-white/85 mb-2 group-hover:text-[#C9A84C] transition-colors leading-snug"
            >
              {{ article.headline }}
            </h3>
            <p class="text-white/35 text-xs leading-relaxed line-clamp-3 mb-4">
              {{ article.detail }}
            </p>
            <div class="flex items-center justify-between border-t border-white/[0.06] pt-3">
              <span class="text-white/30 text-xs">{{ article.date }}</span>
              <span class="text-[#C9A84C] text-xs font-black uppercase tracking-wider"
                >Read More →</span
              >
            </div>
          </div>
        </router-link>
      </div>

      <p v-if="filteredArticles.length === 0" class="text-center text-white/30 py-16 text-sm">
        Try changing your filters or search query
      </p>
    </div>

    <PageFooter year="2024" />
  </div>
</template>
