<script>
  import { page } from "$app/stores"
  import { dev } from "$app/env"
  import { USERS } from "$lib/data/users01.js"
  import IconCalendar from "$lib/IconCalendar.svelte"
  import IconMessage from "$lib/IconMessage.svelte"
  import IconStar from "$lib/IconStar.svelte"
  import IconStarHalf from "$lib/IconStarHalf.svelte"
  import BaseModal from "$lib/BaseModal.svelte"
  import Calendar from "$lib/Calendar.svelte"

  let IMG_URL
  if (dev) {
    IMG_URL = "http://localhost:8888/hilferando/profileimgs/"
  } else {
    IMG_URL = "https://apps.maxspuling.de/hilferando/profileimgs/"
  }

  const helper = USERS.filter((u) => u.uuid === $page.params.uuid)[0]
  const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let modalOpen = false

  function closeModal(event) {
    modalOpen = event.detail
  }
</script>

<div class="page-profile">

  <!-- <BaseModal open={modalOpen}>
    <Calendar events={helper.times_available}/>
  </BaseModal> -->

  <div class="page-profile-top">
    <div class="profile-actions">
      <span class="profile-action-calendar" on:click={() => modalOpen = true}>
        <IconCalendar size="2em" />
      </span>
      <span class="profile-action-message">
        <IconMessage size="2em"/>
      </span>
    </div>
    <div class="profile-image-container">
      <img
        src={IMG_URL + helper.image_url}
        alt="{helper.first_name} {helper.last_name}"
        class="profile-image"
      >
    </div>
  </div>
  <div class="profile-name">
    {helper.first_name} {helper.last_name}
  </div>
  <div class="profile-skill-container">
    {#each helper.skills as skill}
      <div class="profile-skill">{capitalize(skill)}</div>
      <div class="profile-skill-rating">
        {#each Array(3) as _}
          <IconStar size="1.5em"/>
        {/each}
        {#each Array(Math.floor(Math.random() * 2)) as _}
          <IconStar size="1.5em"/>
        {/each}
        {#if Math.floor(Math.random() * 2 - 1)}
          <IconStar size="1.5em"/>
        {:else}
          <IconStarHalf size="1.5em"/>
        {/if}
      </div>
    {/each}
  </div>
  <div class="profile-description">
    {helper.description}
  </div>
</div>
<BaseModal open={modalOpen} on:closeModal={closeModal}>
  {#each helper.times_available as t}
    <div>{helper.first_name} is available on {months[t[0].getMonth()]}, {t[0].getDate()}</div>
    <div>{t[0].getHours()}:00&ndash;{t[1].getHours()}:00</div>
  {/each}
</BaseModal>

<style>
  .page-profile {
    position: relative;
    overflow-x: hidden;
    padding: 0 1em;
  }

  .page-profile-top {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }

  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 2em;
    margin-top: 3em;
  }

  .profile-image-container {
    height: 15rem;
    margin: 0 0 1.5em 0;
  }

  .profile-image {
    position: absolute;
    top: -1rem;
    right: 0;
    width: 80vw;
    border-radius: 0 0 0 2em;
  }

  .profile-name {
    font-weight: bold;
    font-size: 2rem;
    margin: 2em 0 0.5em;
  }

  .profile-skill-container {
    display: grid;
    grid-template-columns: 12ch auto;
    margin-bottom: 0.5em;
    font-style: italic;
  }

  .profile-skill-rating {
    color: var(--clr-orange);
    white-space: nowrap;
  }

  .profile-description {
    margin: 1.2em 0 20vh;
    white-space: pre-line;
  }
</style>
