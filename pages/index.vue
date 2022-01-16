<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="bg-black text-yellow-500 w-2/3 p-3 rounded-md filter drop-shadow-lg">
      <img class="rounded-md w-full" :src="require('~/assets/images/masjid1.jpeg')" alt="">
      <div class="mt-3">
        <div class="flex justify-between">
          <div class="text-center m-3">
            <div class="text-6xl">
              {{ timeNow }}
            </div>
            <div>
              <strong>
                JAM/IQOMAH
              </strong>
            </div>
            <strong class="text-xl mt-4">
              {{ dateNow }}
            </strong>
            <div>
              Tanggal
            </div>
          </div>
          <div class="text-center">
            <strong class="text-3xl">
              MASJID PADAYUNGAN
            </strong>
            <div>
              Jl. Mayor SL Tobing No 96 RT 05 Rw 01 Tasikmalaya
            </div>
          </div>
        </div>
        <div class="ml-3 text-right">
          <span class="text-xl">
            Lokasi: Tasikmalaya, Indonesia
          </span>
        </div>
        <div class="flex justify-around mt-6">
          <div v-for="(name, id) in timePrayName" :key="name" class="text-center p-3" :class="closestTimePray === id ? selectedPrayClass : ''">
            <div class="text-4xl">
              {{ todayPrayTime[id] }}
            </div>
            <div>
              <strong>
                {{ name }}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoreSchedule from '@/helper/core-schedule.mixins.js'

export default {
  name: 'IndexPage',
  mixins: [
    CoreSchedule
  ],
  data(){
    return {
      selectedPrayClass: 'border-2 border-yellow-600 rounded-md'
    }
  }
}
</script>
