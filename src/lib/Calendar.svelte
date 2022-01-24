<script>
  import { onMount, afterUpdate } from "svelte"
  import { page } from "$app/stores"
  import CalendarDay from "$lib/CalendarDay.svelte"

  import {
    helpersHousekeeping,
    helpersPets,
    helpersMoving
  } from "$lib/stores/hilferandoHelpers.js"

  const HELPERS_CAT = {
    housekeeping: $helpersHousekeeping,
    pets: $helpersPets,
    moving: $helpersMoving,
  }

  const helpers = HELPERS_CAT[$page.params.slug]

  const today = new Date()
  $: currentMonth = today.getMonth()
  $: currentYear = today.getFullYear()
  $: firstDay = new Date(currentYear, currentMonth).getDay()

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  let calendarMonth
  let calendarReady = false


  function createCalendar(month, year) {
    let calMonth = {}
    calMonth.monthName = months[month]
    calMonth.year = year
    calMonth.days = []

    let date = 1
    for (let i = 0; i < 6; i++) {
      let week = []
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push([""])
        }
        else if (date > daysInMonth(month, year)) {
          break
        }
        else {
          let dayHelpers = []

          helpers.forEach((h) => {
            h.times_available.forEach((time) => {
              const timeDay = time[0]
              if (
                timeDay.getDate() === date
                && timeDay.getMonth() === month
                && timeDay.getFullYear() === year
                ) {
                  dayHelpers.push(h)
                }
              })
            })

          let day = [date, month, year, dayHelpers]
          week.push(day)
          date++
        }
      }
      calMonth.days.push(week)
    }

    return calMonth
  }

  function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate()
  }

  onMount(() => {
    calendarMonth = createCalendar(currentMonth, currentYear)
    calendarReady = true
  })

  afterUpdate(() => {
    calendarReady = false
    calendarMonth = createCalendar(currentMonth, currentYear)
    calendarReady = true
  })


  function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1
    createCalendar(currentMonth, currentYear)
  }

  function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear
    currentMonth = (currentMonth + 1) % 12
    createCalendar(currentMonth, currentYear)
  }


</script>

{#if calendarReady}
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="calendar-header__month">
        <button class="cal-navigation" on:click={() => previous()}>&larr;</button>
        <div>{calendarMonth.monthName} {calendarMonth.year}</div>
        <button class="cal-navigation" on:click={() => next()}>&rarr;</button>
      </div>
      <div class="calendar-header__weekdays">
        {#each weekDays as dayName}
          <div class="weekday">
            {dayName}
          </div>
        {/each}
      </div>
    </div>
    <div class="calendar-body">
      {#each calendarMonth.days as week}
        <div class="week">
          {#each week as day}
            <div class="day">
              <CalendarDay date={day[0]} month={day[1]} year={day[2]} dayHelpers={day[3]}/>
            </div>
          {/each}
        </div>
      {/each}
    </div>
   </div>
{/if}

<style>
  .calendar-container {
    display: flex;
    flex-direction: column;
    margin: 0 1em;
  }

  .calendar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
    padding: 1em;
    background-color: var(--clr-primary);
  }

  .calendar-header__month {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .calendar-header__weekdays,
  .week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1em;
    align-items: center;
    justify-items: center;
    width: 100%;
  }

  .calendar-body {
    padding: 1em;
  }

  .week {
    margin-bottom: 1em;
  }

  .cal-navigation {
    background-color: transparent;
    font-weight: 700;
  }
</style>
