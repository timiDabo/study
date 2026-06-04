<template>
  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.08] mb-6">
    <slot name="icon" />
    <span class="text-[#C9A84C] text-xs font-black uppercase tracking-[0.2em]">
      <slot />
    </span>
  </div>
</template>
