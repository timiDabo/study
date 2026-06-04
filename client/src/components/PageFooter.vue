<script setup>
defineProps({
  year: { type: String, default: '2026' },
})
</script>

<template>
  <footer class="py-10 px-6 sm:px-12 lg:px-16 bg-[#060914] border-t border-[#C9A84C]/10">
    <div class="max-w-6xl mx-auto text-center">
      <p class="text-white/25 text-xs font-bold">© {{ year }} Jeffrey Currie. All rights reserved.</p>
    </div>
  </footer>
</template>
