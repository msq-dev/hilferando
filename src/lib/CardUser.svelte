<script>
  import categories from "$lib/data/categories.js"
  import { dev } from "$app/env"

  let IMG_URL
  if (dev) {
    IMG_URL = "http://localhost:8888/hilferando/profileimgs/"
  } else {
    IMG_URL = "https://apps.maxspuling.de/hilferando/profileimgs/"
  }

  export let first_name
  export let thumbnail_url
  export let skills

  // function chipColor(skill) {
  //   const cat = categories.filter((c) => c.name === skill)[0]
  //   return cat.clrPrimary
  // }

</script>

<div class="user-card">
  <img src="{IMG_URL}{thumbnail_url}" alt="Photo of {first_name}" class="user-card-img">
  <div class="user-card-info">
    <div class="user-card__name">{first_name}</div>
    <div class="user-card__skills">
      {#each skills as skill }
        <div class="skill-chip" style:background-color="var(--clr-primary)">{skill}</div>
        <!-- <div class="skill-chip" style:background-color={chipColor(skill)}>{skill}</div> -->
      {/each}
    </div>
  </div>
</div>

<style>
  .user-card {
    --usr-border-radius: 0.5em;

    position: relative;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    gap: 1em;
    width: 100%;
    /* background-color: #fff; */
    background-color: var(--clr-primary-200);
    border-radius: var(--usr-border-radius);
    margin-bottom: 1em;
  }

  .user-card-img {
    width: 5em;
    border-radius: var(--usr-border-radius) 0 0 var(--usr-border-radius);
  }

  .user-card__name {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  .user-card__skills {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .skill-chip {
    color: var(--clr-primary-100);
    font-size: 0.65rem;
    padding: 0.2em 0.75em;
    border-radius: 100vw;
  }
</style>
