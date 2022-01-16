import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { PrayTimes } from '@/helper/praytime.js'
dayjs.extend(customParseFormat)

export default {
  data(){
    return {
      _clock: null,
      timeNow:'00:00:00',
      dateNow:'00-00-0000',
      interval: null,
      timePrayName: {
        fajr:'Fajar',
        imsak:'Imsak/Subuh',
        dhuhr:'Zuhur',
        asr:'Ashar',
        maghrib:'Maghrib',
        isha:'Isha',
        // midnight:'Tengah malam',
        // sunrise:'Sunrise',
        // sunset:'Sunset',
      },
      todayPrayTime: {},
      closestTimePray: '',
    }
  },
  computed:{
  },
  mounted(){
    this.initTime()
    this.initPrayTime()
  },
  methods: {
    initTime(){
      // eslint-disable-next-line new-cap
      this._clock = dayjs();
      this.interval = setInterval(()=> {
        this.getTimeNow()
        this.getDateNow()
        this.getClosesTime()
        this._clock = this._clock.add(1, 'second')
      }, 1000)
    },
    getTimeNow(){
      if(!this._clock) return null
      this.timeNow = this._clock.format('HH:mm:ss')
    },
    getDateNow(){
      if(!this._clock) return null
      this.dateNow = this._clock.format('DD-MM-YYYY')
    },

    initPrayTime(){
      const prayTime = new PrayTimes()
      const coordinatBandung = [-6.920757741682762, 107.6218707265487]
      this.todayPrayTime = prayTime.getTimes(new Date(), coordinatBandung, 'auto');
    },

    getClosesTime(){
      const getMinutes = (time) => {
        if(typeof time === 'string'){
          const [hour, minutes] = time.split(':')
          return (+hour * 60) + +minutes
        } else {
          // should be dayjs
          const hour = time.hour()
          const minutes = time.minute()
          return (hour * 60) + minutes
        }
      }
      const now = getMinutes(this._clock)
      const closestTime = {
        idName: null,
        diff: 9999999
      }
      for (const idName in this.timePrayName) {
        const timePray = getMinutes(this.todayPrayTime[idName])
        const diff = timePray - now
      
        if(diff > 0 && diff < closestTime.diff){
          closestTime.idName = idName
          closestTime.diff = diff
        }
      }

      this.closestTimePray = closestTime.idName
    }
  }
}