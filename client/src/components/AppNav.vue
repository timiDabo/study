<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Research' },
  { to: '/dashboard', label: 'Simulator' },
  { to: '/market-performance', label: 'Markets' },
  { to: '/insights', label: 'Insights' },
  { to: '/newsletter', label: 'Newsletter' },
  { to: '/competition', label: 'Competition' },
]
</script>

<template>
  <nav class="fixed top-0 w-full bg-[#060914]/95 backdrop-blur-2xl border-b border-[#C9A84C]/15 z-50">
    <div class="max-w-6xl mx-auto px-5 sm:px-12 lg:px-16">
      <div class="flex items-center justify-between h-16">
        <router-link
          to="/"
          class="font-black text-lg text-[#C9A84C] hover:text-[#e8c96b] transition-colors tracking-wider"
        >
          Jeff Currie
        </router-link>

        <div class="hidden lg:flex items-center gap-7">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :class="[
              'text-sm font-semibold tracking-wide transition-colors',
              route.path === link.to ? 'text-[#C9A84C]' : 'text-white/50 hover:text-[#C9A84C]',
            ]"
          >
            {{ link.label }}
          </router-link>
          <router-link to="/contact">
            <button
              class="h-8 px-3 text-sm rounded-[10px] font-black bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] hover:shadow-lg hover:shadow-[#C9A84C]/30 hover:scale-105 transition-all"
            >
              Contact
            </button>
          </router-link>
        </div>

        <button
          class="lg:hidden p-2 text-[#C9A84C] hover:text-white transition-colors"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="lg:hidden bg-[#060914]/98 backdrop-blur-2xl border-t border-[#C9A84C]/15 px-5 py-6 space-y-1"
    >
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="[
          'block py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all',
          route.path === link.to
            ? 'text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20'
            : 'text-white/55 hover:text-[#C9A84C] hover:bg-white/[0.04]',
        ]"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </router-link>
      <div class="pt-3">
        <router-link to="/contact" @click="mobileOpen = false">
          <button
            class="w-full py-2.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#B8860B] text-[#060914] font-black hover:shadow-lg hover:shadow-[#C9A84C]/30 transition-all"
          >
            Contact
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>
