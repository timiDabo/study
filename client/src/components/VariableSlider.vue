<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: Number, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  step: { type: Number, default: 5 },
})

const emit = defineEmits(['update:modelValue'])

const pct = computed(() => ((props.modelValue - props.min) / (props.max - props.min)) * 100)

function set(value) {
  emit('update:modelValue', Math.min(props.max, Math.max(props.min, value)))
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <span class="text-white/50 text-xs font-black uppercase tracking-widest">{{ label }}</span>
      <span class="text-[#C9A84C] font-black text-sm">{{ modelValue.toFixed(1) }}%</span>
    </div>
    <div class="flex items-center gap-3">
      <button
        class="w-8 h-8 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C]/10 transition cursor-pointer text-sm font-bold"
        @click="set(modelValue - step)"
      >
        −
      </button>
      <input
        type="range"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :style="{ '--val': pct + '%' }"
        class="flex-1 accent-[#C9A84C] h-1.5"
        @input="set(Number($event.target.value))"
      />
      <button
        class="w-8 h-8 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C]/10 transition cursor-pointer text-sm font-bold"
        @click="set(modelValue + step)"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  appearance: none;
  background: linear-gradient(
    to right,
    #c9a84c 0%,
    #c9a84c var(--val, 50%),
    #ffffff1a var(--val, 50%),
    #ffffff1a 100%
  );
  border-radius: 9999px;
  outline: none;
  height: 6px;
}

input[type='range']::-webkit-slider-thumb {
  appearance: none;
  cursor: pointer;
  background: #c9a84c;
  border: 2px solid #060914;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  box-shadow: 0 0 8px #c9a84c80;
}

input[type='range']::-moz-range-thumb {
  cursor: pointer;
  background: #c9a84c;
  border: 2px solid #060914;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  box-shadow: 0 0 8px #c9a84c80;
}
</style>
