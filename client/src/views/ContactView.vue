<script setup>
import { reactive, ref } from 'vue'
import { ArrowLeft, BookOpen, Building2, Mail, MapPin, Mic } from 'lucide-vue-next'
import PageFooter from '../components/PageFooter.vue'
import GlowBackground from '../components/GlowBackground.vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const sent = ref(false)

function handleSubmit() {
  if (form.name && form.email && form.message) {
    sent.value = true
  }
}

const services = [
  {
    icon: Building2,
    title: 'Consulting & Advisory',
    desc: 'Strategic energy and commodity market consulting for institutional investors, corporations, and governments.',
  },
  {
    icon: Mic,
    title: 'Speaking Engagements',
    desc: 'Keynotes and panel appearances at energy, finance, and geopolitics conferences worldwide.',
  },
  {
    icon: BookOpen,
    title: 'Media & Press',
    desc: 'Interviews, expert commentary, and editorial contributions for major financial publications.',
  },
]
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
            <ArrowLeft class="w-4 h-4" /> Back to Home
          </router-link>
        </div>
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6"
        >
          <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]">Get In Touch</span>
        </div>
        <h1 class="text-3xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
          Let's<br />
          <span
            class="bg-gradient-to-r from-[#C9A84C] via-[#e8c96b] to-[#C9A84C] bg-clip-text text-transparent"
          >Connect</span>
        </h1>
        <p class="text-white/45 text-lg max-w-3xl">
          Jeffrey Currie is available for select consulting mandates, keynote engagements, and media
          appearances. Use the form below to reach out directly.
        </p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pb-28">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
        <div
          v-for="service in services"
          :key="service.title"
          class="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          <div
            class="w-11 h-11 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-5"
          >
            <component :is="service.icon" class="w-5 h-5 text-[#C9A84C]" />
          </div>
          <h3 class="font-black text-white mb-2">{{ service.title }}</h3>
          <p class="text-white/40 text-sm leading-relaxed">{{ service.desc }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <h2 class="text-2xl font-black text-white mb-4">Contact Details</h2>
          <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0"
            >
              <Mail class="w-4 h-4 text-[#C9A84C]" />
            </div>
            <div>
              <div class="text-white/40 text-xs font-black uppercase tracking-wider">Email</div>
              <div class="text-white text-sm">jeffcurrie-pro@jeffcurrie.pro</div>
            </div>
          </div>
          <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0"
            >
              <MapPin class="w-4 h-4 text-[#C9A84C]" />
            </div>
            <div>
              <div class="text-white/40 text-xs font-black uppercase tracking-wider">Based In</div>
              <div class="text-white text-sm">Washington D.C. / New York, USA</div>
            </div>
          </div>
          <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 class="font-black text-[#C9A84C] text-sm mb-2">Response Time</h3>
            <p class="text-white/40 text-sm leading-relaxed">
              All inquiries are reviewed personally. Typical response within 3–5 business days for
              qualified opportunities.
            </p>
          </div>
          <div class="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 class="font-black text-[#C9A84C] text-sm mb-3">Affiliated With</h3>
            <div class="space-y-1.5 text-sm text-white/40">
              <p>· The Carlyle Group — Energy Pathways</p>
              <p>· University of Chicago — EPIC Advisory Board</p>
              <p>· Extel Top-Ranked Commodity Analyst</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div
            v-if="sent"
            class="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center"
          >
            <div class="text-3xl mb-3">✅</div>
            <h3 class="text-xl font-black text-white">Message sent!</h3>
            <p class="text-white/40 mt-2 text-sm">
              All inquiries are reviewed personally. Typical response within 3–5 business days.
            </p>
          </div>
          <div
            v-else
            class="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
          >
            <h2 class="text-2xl font-black text-white mb-2">Send a Message</h2>
            <p class="text-white/40 text-sm mb-6">
              Please include details about your inquiry, organisation, and timeline where applicable.
            </p>
            <div class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-white/50 text-xs font-black uppercase tracking-wider mb-2">Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-[#060914] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition"
                  />
                </div>
                <div>
                  <label class="block text-white/50 text-xs font-black uppercase tracking-wider mb-2">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-[#060914] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition"
                  />
                </div>
              </div>
              <div>
                <label class="block text-white/50 text-xs font-black uppercase tracking-wider mb-2">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  class="w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-[#060914] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 transition"
                />
              </div>
              <div>
                <label class="block text-white/50 text-xs font-black uppercase tracking-wider mb-2">Message</label>
                <textarea
                  v-model="form.message"
                  rows="6"
                  class="w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-[#060914] placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 resize-none transition"
                ></textarea>
              </div>
              <button
                @click="handleSubmit"
                class="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C9A84C] via-[#d4a84b] to-[#B8860B] text-[#060914] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#C9A84C]/30 transition-all cursor-pointer"
              >
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PageFooter year="2026" />
  </div>
</template>
