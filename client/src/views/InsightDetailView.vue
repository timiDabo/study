<script setup>
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import PageFooter from '../components/PageFooter.vue'

// The list page links to this detail page via `to="/InsightDetail"` and may pass
// an article id through the query string (e.g. /InsightDetail?id=0). The original
// production chunk rendered a single hard-coded article; we read the route here so
// the navigation contract is honoured even though the displayed content is static.
const route = useRoute()
// eslint-disable-next-line no-unused-vars
const articleId = route.query.id
</script>

<template>
  <div class="min-h-screen bg-[#060914]">
    <section class="pt-28 px-6 sm:px-12 lg:px-16 pb-28">
      <div class="max-w-4xl mx-auto">
        <div class="mb-10">
          <router-link
            to="/insights"
            class="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Insights
          </router-link>
        </div>

        <span class="text-[10px] font-black text-[#C9A84C] uppercase tracking-[0.2em]"
          >Energy Markets</span
        >
        <h1 class="text-3xl sm:text-4xl font-black text-white mt-2 mb-6 leading-tight">
          Oil Supply Tightens as OPEC+ Maintains Cuts Through Q3 2026
        </h1>
        <div class="rounded-2xl overflow-hidden border border-white/[0.08] mb-10">
          <img
            src="/images/unsplash/photo-1590283603385.jpg"
            alt="Article"
            class="w-full aspect-video object-cover"
          />
        </div>
        <div class="space-y-6 text-white/55 leading-relaxed">
          <p>
            Currie's base case: Brent averaging $85–$92/bbl in H2 2026. Key upside risk: escalation
            in Middle East shipping lanes. Downside: US shale reactivation above $90.
          </p>
          <p>
            The OPEC+ alliance has signaled continued production restraint through Q3 2026, removing
            approximately 2.2 million barrels per day from global supply. This decision reflects
            Saudi Arabia's determination to maintain price discipline despite growing non-OPEC
            supply.
          </p>
          <p>
            Currie argues that the market remains structurally tight due to years of capital
            underinvestment in upstream production. The combination of demand resilience from
            emerging markets and constrained supply growth creates a favorable backdrop for oil
            prices to remain elevated.
          </p>
          <p>
            Key risks to the upside include potential disruptions to shipping lanes in the Middle
            East, particularly the Strait of Hormuz and Red Sea corridors. On the downside, a
            significant reactivation of US shale production above $90/bbl could moderate price gains.
          </p>
          <p>
            European rearmament and US infrastructure spending are creating a 400kt annual deficit
            in refined copper. Currie identifies this as the #1 commodity investment theme for
            2026–2030. Deglobalisation and reshoring are compressing commodity trade flows.
          </p>
        </div>
      </div>
    </section>

    <PageFooter year="2024" />
  </div>
</template>
