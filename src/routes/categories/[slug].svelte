<script>
  import { afterUpdate } from "svelte"
  import { page } from "$app/stores"
  import { dev } from "$app/env"
  import {
    helpersHousekeeping,
    helpersPets,
    helpersMoving
  } from "$lib/stores/hilferandoHelpers.js"
  import IconCalendar from "$lib/IconCalendar.svelte"
  import CardUser from "$lib/CardUser.svelte"
  import Calendar from "$lib/Calendar.svelte"

  let IMG_URL
  if (dev) {
    IMG_URL = "http://localhost:8888/hilferando/profileimgs/"
  } else {
    IMG_URL = "https://apps.maxspuling.de/hilferando/profileimgs/"
  }

  const HELPERS_CAT = {
    housekeeping: $helpersHousekeeping,
    pets: $helpersPets,
    moving: $helpersMoving,
  }

  $: optionSelected = ""

  let helpers = []
  let helpersThumbs = []

  afterUpdate(() => {
    helpers = HELPERS_CAT[$page.params.slug]
    helpersThumbs = helpers
  })

</script>

<h1 class="category-title">Find someone to help with your {$page.params.slug}!</h1>

<div class="search-options-container">
  <div class="search-option" on:click={() => optionSelected = "date"}>
    <IconCalendar size="4em" fill="var(--clr-primary)"/>
    by date
  </div>
  <div class="search-option" on:click={() => optionSelected = "person"}>
    <div class="search-thumbnail-box">
      {#each helpersThumbs as h}
        <div
          class="search-thumbnail"
          style:background-image="url({IMG_URL + h.thumbnail_url})"
        >
        </div>
      {/each}
    </div>
    by person
  </div>
</div>

<div class="search-result">
  {#if optionSelected === "person"}
    {#each helpers as h (h.uuid)}
      <a href="../users/{h.uuid}">
        <CardUser
          thumbnail_url={h.thumbnail_url}
          first_name={h.first_name}
          skills={h.skills}
        />
      </a>
    {/each }
  {:else if optionSelected === "date"}
    <Calendar/>
  {:else}
    <div></div>
  {/if}
</div>

<style>
  .category-title {
    font-size: 0.9rem;
    margin: 1em auto 1.5em;
  }

  .search-options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    width: 100%;
    padding: 0 1em;
  }

  .search-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    border: 2px solid var(--clr-primary);
    border-radius: 0.7em;
    aspect-ratio: 1;
  }

  .search-thumbnail-box {
    height: 5em;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em;
    padding: 0.5em;
  }

  .search-thumbnail {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100vw;
    background-size: cover;
  }

  .search-result {
    margin: 2em 0 20vh;
    padding: 0 1em;
    width: 100%;
  }
</style>
