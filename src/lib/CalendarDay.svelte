<script>
  import { afterUpdate } from "svelte"
  import { page } from "$app/stores"
  import { dev } from "$app/env"
  import BaseModal from "$lib/BaseModal.svelte"

  let IMG_URL
  if (dev) {
    IMG_URL = "http://localhost:8888/hilferando/profileimgs/"
  } else {
    IMG_URL = "https://apps.maxspuling.de/hilferando/profileimgs/"
  }

  export let date
  export let month
  export let year
  export let dayHelpers

  let day
  let isToday
  let isPast
  let isSunday
  let hasHelpers
  let dayReady

  let modalOpen = false

  afterUpdate(() => {
    isToday = false
    isPast = false
    isSunday = false
    hasHelpers = false
    dayReady = false

    day = date
    if (date !== "") {
      day = new Date()
      if (day.getDate() === date && day.getMonth() === month && day.getFullYear() === year) {
        isToday = true
      }
      day.setDate(date)
      day.setMonth(month)
      day.setFullYear(year)
      if (day.getDay() === 0) {
        isSunday = true
      }
      if (new Date().valueOf() > day.valueOf()) {
        isPast = true
      }
      if (dayHelpers.length) {
        hasHelpers = true
      }
    }
    dayReady = true
  })

  function closeModal(event) {
    modalOpen = event.detail
  }
</script>

{#if dayReady}
  <div
  class="calendar-day"
  class:isSunday
  class:isPast
  class:isToday
  class:hasHelpers
  on:click={() => modalOpen = true}
  >
    {date}
  </div>
  <BaseModal open={modalOpen} on:closeModal={closeModal}>
    {#each dayHelpers as h (h.uuid)}
    <a href="../users/{h.uuid}">
      <div
        class="search-thumbnail"
        style:background-image="url({IMG_URL + h.thumbnail_url})"
      >
      </div>
      <div>{h.first_name} is available for {$page.params.slug}</div>
      <div>{h.times_available[0][0].getHours()}:00&ndash;{h.times_available[0][1].getHours()}:00</div>
    </a>
    {/each}
  </BaseModal>
{/if}

<style>
  .calendar-day {
    width: 3ch;
    text-align: center;
  }

  .isSunday {
    color: var(--clr-warning);
  }

  .isToday {
    font-weight: 700;
  }

  .isPast {
    opacity: 0.4;
  }

  .hasHelpers {
    position: relative;
    color: var(--clr-primary-100);
  }

  .hasHelpers::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: -0.25em;
    left: -0.1em;
    width: 2em;
    height: 2em;
    background-color: var(--clr-blue);
    border-radius: 100vw;
  }

  .search-thumbnail {
    width: 2rem;
    height: 2rem;
    border-radius: 100vw;
    background-size: cover;
  }

</style>
