<script lang="ts">
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  data() {
    return {
      open: false,
      menuItems: [
      'Barchart',
      'Choropleth',
      'Heatmap',
      'Scatterplot',
      'Treemap'
      ],
      currentChart: "none"
    }
  },
  methods: {
    updateChart(i:string) {
      this.currentChart = i;
    }
  }
}

</script>

<template>
  <div class="min-h-screen w-screen flex flex-col items-center justify-center overflow-auto">
    <button class="fixed top-0 right-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l" @click="open = !open">
      <i class="fas fa-bars menu-icon"></i>
    </button>
    <transition name="fade" class="fixed">
      <div v-if="open" class="fixed top-[40px] right-0 py-2 w-48 bg-white rounded-md shadow-md z-10">
        <a href="#" :value={i}  @click="updateChart(i)" class="block px-4 py-2 text-sm z-10 text-gray-700 hover:bg-gray-100" v-for="(i) in menuItems">{{i}}</a>
      </div>
    </transition>
    <div v-if="currentChart == 'none'" class="flex flex-col justify-center items-center">
      <h1 class="text-3xl font-bold">Collection of different d3.js charts</h1>
      <p class="mt-4">Use menu in top right to pick chart to display</p>
      <p class="mt-4">Optimised for 1920x1080, watching on phone might result in bugs</p>
      <p class="mt-4">API data from freecodecamp.org</p>
    </div>
    <Barchart v-else-if="currentChart == 'Barchart'" />
    <Choropleth v-else-if="currentChart == 'Choropleth'" />
    <Heatmap v-else-if="currentChart == 'Heatmap'" />
    <Scatterplot v-else-if="currentChart == 'Scatterplot'" />
    <Treemap v-else-if="currentChart == 'Treemap'" />
    <p class="mt-20">Created by <a href="https://github.com/wojwozniak" target="_blank" class="text-gold">wojwozniak</a>, May/June 2022</p>
  </div>
</template>