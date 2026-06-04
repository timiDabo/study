<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft, Zap, Calendar, TrendingUp, Clock, ChevronDown } from 'lucide-vue-next'
import PageFooter from '../components/PageFooter.vue'
import GlowBackground from '../components/GlowBackground.vue'

const activeCategory = ref('All')
const openFaq = ref(-1)

const categories = [
  'All',
  'Delivery',
  'Content',
  'Coverage',
  'Edge',
  'Preferences',
  'Audience',
  'Privacy',
  'Pricing',
  'Sharing',
  'Contact',
]

const categoryStyles = {
  Delivery: 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30',
  Content: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  Coverage: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Edge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Preferences: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  Audience: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  Privacy: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Pricing: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
  Sharing: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  Contact: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

const faqs = [
  {
    category: 'Delivery',
    question: 'How often will I receive alerts?',
    answer:
      'Weekly Market Digest every Monday, plus real-time alerts as market events warrant — typically 2-4 per week. You control the frequency through your preference settings.',
  },
  {
    category: 'Content',
    question: 'Who writes the analysis?',
    answer:
      "All analysis is authored or supervised by Jeffrey Currie, drawing on 27+ years of commodity market expertise at Goldman Sachs and The Carlyle Group.",
  },
  {
    category: 'Coverage',
    question: 'What topics does the newsletter cover?',
    answer:
      "Crude oil, natural gas, copper, gold, agricultural commodities, macroeconomics, geopolitics, and energy transition themes — all through Currie's proprietary analytical framework.",
  },
  {
    category: 'Edge',
    question: 'What makes this different from other market newsletters?',
    answer:
      'A 94.2% prediction accuracy rate, backed by decades of institutional-grade research methodology. No generic commentary — every alert is actionable and data-driven.',
  },
  {
    category: 'Preferences',
    question: 'Can I customize what I receive?',
    answer:
      'Yes. After subscribing, you can select specific commodity sectors, alert types, and delivery frequency through your preference dashboard.',
  },
  {
    category: 'Audience',
    question: 'Who is the typical subscriber?',
    answer:
      'Portfolio managers, energy executives, sovereign wealth fund analysts, policy advisors, and professional investors who need institutional-quality commodity intelligence.',
  },
  {
    category: 'Privacy',
    question: 'Is my email address secure?',
    answer:
      'Absolutely. We never share, sell, or disclose subscriber data. All communications are encrypted and GDPR-compliant.',
  },
  {
    category: 'Pricing',
    question: 'Is there a cost?',
    answer:
      'The core newsletter is 100% free. No hidden fees, no premium tiers required. Institutional consulting services are available separately.',
  },
  {
    category: 'Sharing',
    question: 'Can I share the newsletter with colleagues?',
    answer:
      'Yes, we encourage sharing. Each edition includes a referral link. Subscribers who refer colleagues receive early access to special research notes.',
  },
  {
    category: 'Contact',
    question: 'How do I get in touch if I have a question?',
    answer:
      'Reach out via WhatsApp or email. Our team responds during business hours with detailed support for all subscriber inquiries.',
  },
]

const filteredFaqs = computed(() =>
  activeCategory.value === 'All'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory.value)
)

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index
}

function selectCategory(category) {
  activeCategory.value = category
  openFaq.value = -1
}
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
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6"
        >
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]">Newsletter</span>
        </div>
        <h1 class="text-6xl font-black text-white mb-4 leading-tight">
          Market Insight<br />
          <span
            class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
            >Alerts</span
          >
        </h1>
        <p class="text-xl text-white/45 mb-6 max-w-2xl">
          The same analytical edge that achieved 94.2% prediction accuracy — delivered free to your
          inbox. Join 10,000+ investors and market professionals who rely on Currie's insights.
        </p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="badge in ['100% Free', 'No Spam', 'Unsubscribe Anytime', 'Expert-Level Analysis']"
            :key="badge"
            class="px-3 py-1.5 rounded-full border border-[#C9A84C]/25 text-[#C9A84C]/60 text-xs font-black uppercase tracking-widest"
          >
            ✓ {{ badge }}
          </span>
        </div>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pb-28">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
        <div class="lg:col-span-3">
          <h2 class="text-3xl font-black text-white mb-8">What You'll Receive</h2>
          <div class="space-y-4 mb-8">
            <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex gap-4">
              <div
                class="w-11 h-11 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0"
              >
                <Zap class="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h3 class="font-black text-white mb-1">Market Insight Alerts</h3>
                <p class="text-white/40 text-sm">
                  Real-time notifications when significant commodity price levels are breached — oil
                  supply shocks, metals breakouts, energy demand inflections. Sent within hours of
                  the trigger.
                </p>
              </div>
            </div>
            <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex gap-4">
              <div
                class="w-11 h-11 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0"
              >
                <Calendar class="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h3 class="font-black text-white mb-1">Weekly Market Digest</h3>
                <p class="text-white/40 text-sm">
                  Every Monday: a structured, concise breakdown of the week ahead. Key themes in
                  crude, copper, gold, natural gas, and macro — through Currie's analytical
                  framework.
                </p>
              </div>
            </div>
            <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex gap-4">
              <div
                class="w-11 h-11 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0"
              >
                <TrendingUp class="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h3 class="font-black text-white mb-1">Exclusive Research Access</h3>
                <p class="text-white/40 text-sm">
                  Early access to new Carlyle Energy Pathways research notes — including landmark
                  theses like "The New Joule Order" and "The New Military Plan" before wider release.
                </p>
              </div>
            </div>
            <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex gap-4">
              <div
                class="w-11 h-11 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0"
              >
                <Clock class="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h3 class="font-black text-white mb-1">Geopolitical Risk Briefs</h3>
                <p class="text-white/40 text-sm">
                  Advance analysis of supply chain disruptions, OPEC+ strategy shifts, and
                  geopolitical flashpoints that move commodity markets — before they become
                  consensus.
                </p>
              </div>
            </div>
          </div>
          <div class="p-5 rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03]">
            <p class="text-white/50 text-sm leading-relaxed">
              <span class="font-black text-[#C9A84C]">Over 10,000 subscribers</span>
              — including portfolio managers, energy executives, sovereign wealth fund analysts, and
              policy advisors — rely on Jeffrey Currie's insights to navigate volatile commodity
              markets.
            </p>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 lg:sticky lg:top-24">
            <div class="flex justify-center mb-6">
              <div
                class="w-16 h-16 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 flex items-center justify-center"
              >
                <svg class="w-8 h-8 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  ></path>
                </svg>
              </div>
            </div>
            <h2 class="text-2xl font-black text-white mb-3">Contact Our Team</h2>
            <p class="text-white/50 text-base mb-2 leading-relaxed max-w-sm">
              Reach out via <span class="text-[#25D366] font-black">WhatsApp</span> to inquire about
              market insights subscriptions and exclusive consulting.
            </p>
            <p class="text-white/30 text-sm mb-8">
              Our team responds during business hours with detailed support.
            </p>
            <button
              class="w-full py-4 rounded-2xl bg-[#25D366] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-colors cursor-pointer mb-8"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                ></path>
              </svg>
              Contact via WhatsApp
            </button>
            <div class="border-t border-white/[0.06] pt-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-[#C9A84C]"></div>
                <span class="text-white/40 text-sm">Expert one-on-one support</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-[#C9A84C]"></div>
                <span class="text-white/40 text-sm">Quick response to inquiries</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-[#C9A84C]"></div>
                <span class="text-white/40 text-sm">Privacy protection &amp; secure data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] p-8 sm:p-12 mb-20">
        <h2 class="text-3xl font-black text-white mb-3">Why Subscribe?</h2>
        <p class="text-white/40 mb-10 max-w-xl">
          There are thousands of market newsletters. There's only one Jeffrey Currie.
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="border-l-2 border-[#C9A84C]/40 pl-4">
            <div class="text-3xl sm:text-4xl font-black text-[#C9A84C]">94.2%</div>
            <div class="text-sm font-black text-white mt-1">Prediction Accuracy</div>
            <p class="text-white/35 text-xs">#1 ranked globally, 2026</p>
          </div>
          <div class="border-l-2 border-[#C9A84C]/40 pl-4">
            <div class="text-3xl sm:text-4xl font-black text-[#C9A84C]">27+</div>
            <div class="text-sm font-black text-white mt-1">Years at Goldman Sachs</div>
            <p class="text-white/35 text-xs">Global Head of Commodities Research</p>
          </div>
          <div class="border-l-2 border-[#C9A84C]/40 pl-4">
            <div class="text-3xl sm:text-4xl font-black text-[#C9A84C]">10k+</div>
            <div class="text-sm font-black text-white mt-1">Active Subscribers</div>
            <p class="text-white/35 text-xs">Institutional &amp; professional investors</p>
          </div>
          <div class="border-l-2 border-[#C9A84C]/40 pl-4">
            <div class="text-3xl sm:text-4xl font-black text-[#C9A84C]">100%</div>
            <div class="text-sm font-black text-white mt-1">Free Forever</div>
            <p class="text-white/35 text-xs">No fees, no premium tiers</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <p class="text-white/50 text-sm italic leading-relaxed mb-3">
              "Currie's 2020 supercycle call was the single most impactful commodity research note of
              the decade."
            </p>
            <p class="text-[#C9A84C]/50 text-xs font-black">— Energy Capital Markets, 2023</p>
          </div>
          <div class="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <p class="text-white/50 text-sm italic leading-relaxed mb-3">
              "The world's most influential energy expert — consistently ahead of the consensus by
              months, sometimes years."
            </p>
            <p class="text-[#C9A84C]/50 text-xs font-black">— The Daily Telegraph</p>
          </div>
        </div>
      </div>

      <div class="mb-20">
        <h2 class="text-3xl font-black text-white mb-2">Frequently Asked Questions</h2>
        <p class="text-white/40 mb-6">Everything you need to know before subscribing.</p>
        <div class="flex flex-wrap gap-2 mb-8">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-4 py-1.5 rounded-full text-xs font-black border transition-all cursor-pointer',
              activeCategory === category
                ? 'bg-[#C9A84C] text-[#060914] border-[#C9A84C]'
                : 'border-[#C9A84C]/25 text-white/40 hover:border-[#C9A84C]/50 hover:text-white/60',
            ]"
          >
            {{ category }}
          </button>
        </div>
        <div class="space-y-3">
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="faq.question"
            class="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            <div
              @click="toggleFaq(index)"
              class="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <span
                :class="[
                  'text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap',
                  categoryStyles[faq.category],
                ]"
                >{{ faq.category }}</span
              >
              <span class="font-black text-white text-sm flex-1">{{ faq.question }}</span>
              <ChevronDown
                :class="[
                  'w-4 h-4 text-white/30 transition-transform flex-shrink-0',
                  openFaq === index ? 'rotate-180' : '',
                ]"
              />
            </div>
            <div v-if="openFaq === index" class="px-5 pb-5 pt-0">
              <p class="text-white/40 text-sm leading-relaxed pl-[calc(2.5rem+1rem)]">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
        <p class="text-center text-white/30 text-xs font-black uppercase tracking-widest mt-10">
          Still have questions?
          <router-link to="/contact" class="text-[#C9A84C]/60 underline hover:text-[#C9A84C]"
            >Get in touch →</router-link
          >
        </p>
      </div>
    </div>

    <PageFooter year="2024" />
  </div>
</template>
