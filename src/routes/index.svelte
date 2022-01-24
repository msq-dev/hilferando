<script>
  import { onMount } from "svelte"
  import {
    userPostalCode
  } from "$lib/stores/hilferandoUser.js"
  import {
    helpersHousekeeping,
    helpersPets,
    helpersMoving
  } from "$lib/stores/hilferandoHelpers.js"

  import IconIron from "$lib/IconIron.svelte"
  import IconPaw from "$lib/IconPaw.svelte"
  import IconBox from "$lib/IconBox.svelte"

  import categories from "$lib/data/categories.js"
  import { USERS } from "$lib/data/users01.js"
  import { generateAvailableTimes } from "$lib/data/utils.js"
  const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`


  function updateHelpersHousekeeping(helpers) {
    helpersHousekeeping.update((h) => helpers)
  }
  function updateHelpersPets(helpers) {
    helpersPets.update((h) => helpers)
  }
  function updateHelpersMoving(helpers) {
    helpersMoving.update((h) => helpers)
  }

  function getHelpers(cat) {
    return HELPERS.filter((u) => u.skills.indexOf(cat) !== -1)
  }

  const categoryIcons = { IconIron, IconPaw, IconBox }

  $: currentCarouselIndex = 0

  function carouselItemTransform(itemIndex, currentIndex) {
    const relativeIndex = relativeCurrentIndex(currentIndex)
    const isCurrent = relativeIndex === itemIndex

    let xTranslation

    if (isCurrent) {
      xTranslation = "0"
    }
    else if (Math.abs(relativeIndex - 2) === itemIndex) {
      xTranslation = "-50%"
    }
    else if (Math.abs(relativeIndex - 1) === itemIndex) {
      xTranslation = "50%"
    }

    return `translateX(${xTranslation}) scale(${isCurrent ? 1 : 0.4}) rotateY(${isCurrent ? 0 : 180}deg)`
  }

  function relativeCurrentIndex(currentIndex) {
    const absMod = Math.abs(currentIndex % categories.length)
    return absMod
  }

  function isCurrentCarouselItem(itemIndex, currentIndex) {
    const absMod = Math.abs(currentIndex % categories.length)
    if (currentIndex < 0 && absMod !== 0) {
      itemIndex = Math.abs(currentIndex -= categories.length)
    }
    return itemIndex === absMod
  }

  function moveCarousel(direction) {
    currentCarouselIndex += direction
  }

  let showPostalLogin = false
  let HELPERS = USERS

  onMount(() => {
    HELPERS.forEach((h) => {
      h.times_available = generateAvailableTimes(3)
    })

    updateHelpersHousekeeping(getHelpers("housekeeping"))
    updateHelpersPets(getHelpers("pets"))
    updateHelpersMoving(getHelpers("moving"))
  })
</script>

<div class="title-container">
  <h1 class="home-title">Hilferando</h1>
  <div class="home-subtitle">
    Have stuff? <span>Get help!</span> Have stuff done.
  </div>
</div>

{#if !showPostalLogin}
  <div class="carousel-container">
    <!-- <div
      class="carousel-nav left"
      on:click={() => moveCarousel(-1)}
    >
      &lsaquo;
    </div> -->
    <div
      class="carousel-nav right"
      on:click={() => moveCarousel(1)}
    >
      &rsaquo;
    </div>
    <div class="carousel">
      {#each categories as cat, index}
        <a href="/categories/{cat.name}">
          <div
            class="cat-item"
            class:active={isCurrentCarouselItem(index, currentCarouselIndex)}
            style:transform={carouselItemTransform(index, currentCarouselIndex)}
            style:color={cat.clrPrimary}
          >
            <div
              class="cat-item__icon"
              style:background="linear-gradient(140deg, {cat.clrPrimary} 55%, {cat.clrSecondary} 100%)"
              >
              <svelte:component
                this={categoryIcons[cat.icon]}
                fill="var(--clr-primary-100)"
                size="5em" />
            </div>
            <div
              class="cat-item__title"
              style:background="linear-gradient(140deg, {cat.clrPrimary} 55%, {cat.clrSecondary} 100%)"
            >
              {capitalize(cat.name)}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
{:else}
  <label for="postalCode">Please enter your postal code</label>
  <input type="text" id="postalCode" bind:value={$userPostalCode}>
  <button on:click={() => showPostalLogin = false}>Find help</button>
{/if}

<style>
  .title-container {
    text-align: center;
    margin-top: 10vh;
  }

  .home-title {
    font-family: var(--ff-accent), sans-serif;
    text-transform: uppercase;
    font-size: 3rem;
    background-image: linear-gradient(140deg, var(--clr-blue) 25%, var(--clr-primary) 100%);
    background-clip: text;
    color: transparent;
  }

  .home-subtitle {
    font-size: 1.1rem;
    color: var(--clr-primary);
  }

  .home-subtitle > span {
    color: var(--clr-primary-dark);
  }

  .carousel-container {
    position: relative;
    perspective: 1000px;
    width: 50vw;
    height: 25vh;
    margin-top: 4em;
  }

  .carousel-nav {
    position: absolute;
    top: 0;
    height: 100%;
    color: var(--clr-primary);
    font-size: 3rem;
    padding-top: 1em;
    cursor: pointer;
  }

  /* .carousel-nav.left {
    left: -45%;
    padding-right: 1.5em;
  } */

  .carousel-nav.right {
    right: -45%;
    padding-left: 1.5em;
  }

  .carousel {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .cat-item {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    opacity: 0.3;
    z-index: -1;
    filter: blur(7px);
    transition: 0.5s ease-in-out;

  }

  /* .cat-item::after {
    content: "";
    position: absolute;
    top: 110%;
    width: 150%;
    height: 20%;
    border-radius: 100%;
    background-image: radial-gradient(rgb(0 0 0 / 0.075), rgb(0 0 0 / 0) 50%);

  } */

  .cat-item.active {
    opacity: 1;
    z-index: 1;
    filter: blur(0);
  }

  .cat-item.active > .cat-item__icon,
  .cat-item.active > .cat-item__title {
    box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075)
    ;
  }

  .cat-item__icon {
    display: grid;
    place-items: center;
    border-radius: 100vw;
    width: 10rem;
    height: 10rem;
  }

  .cat-item__title {
    font-size: 1.5rem;
    color: var(--clr-primary-100);
    padding: 0.2em 0.5em;
    border-radius: 0.3em;
  }

</style>


