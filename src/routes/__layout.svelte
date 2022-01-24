<script>
  import { page } from "$app/stores"
  import "../app.css"
  import IconHome from "$lib/IconHome.svelte"
  import IconIron from "$lib/IconIron.svelte"
  import IconPaw from "$lib/IconPaw.svelte"
  import IconBox from "$lib/IconBox.svelte"

  import categories from "$lib/data/categories.js"
  const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
  const categoryIcons = { IconIron, IconPaw, IconBox }
</script>

<main>
  <slot ></slot>
</main>

{#if $page.url.pathname !== "/"}
  <div class="nav-container">
    <nav class="nav-categories">
      <ul class="nav-home">
        <a
          class="nav-link"
          class:active={$page.url.pathname === '/'}
          href="/"
        >
          <li>
            <span class="nav-item__icon">
              <IconHome size="2.5em"/>
            </span>
          </li>
        </a>
      </ul>
      <ul>
        {#each categories as cat}
          <a
            class="nav-link"
            class:active={$page.url.pathname === `/categories/${cat.name}`}
            href="/categories/{cat.name}"
          >
            <li class="nav-item">
              <span class="nav-item__icon">
                <svelte:component
                  this={categoryIcons[cat.icon]}
                  size="2.5em"
                />
              </span>
              <span class="nav-item__text">
                {capitalize(cat.name)}
              </span>
            </li>
          </a>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<style>
  .nav-container {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 4em;
    background-color: var(--clr-primary-200);
    font-size: 0.7em;
    box-shadow:
    0 -1px 1px hsl(0deg 0% 0% / 0.075),
    0 -2px 2px hsl(0deg 0% 0% / 0.075),
    0 -4px 4px hsl(0deg 0% 0% / 0.075),
    0 -8px 8px hsl(0deg 0% 0% / 0.075),
    0 -16px 16px hsl(0deg 0% 0% / 0.075)
    ;
  }

  .nav-categories {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    margin-top: 0.7em;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    background-color: var(--clr-primary-200);
  }

  .nav-categories ul {
    --width-nav-item: 7.5em;

    display: flex;
    width: 100%;
  }

  .nav-categories ul li {
    position: relative;
    list-style: none;
    width: var(--width-nav-item);
    z-index: 5;
  }

  .nav-categories ul a {
    position: relative;
  }

  .nav-categories ul a li {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: 0.5s;
  }

  .nav-link li .nav-item__text {
    position: absolute;
    font-size: 1em;
    letter-spacing: 0.05em;
    opacity: 0;
    transform: translateY(-2em);
    transition: transform 0.2s;
  }

  .nav-link li .nav-item__icon {
    color: var(--clr-primary);
    position: relative;
    display: block;
  }

  .nav-link.active li .nav-item__icon {
    color: var(--clr-primary-100);
    transform: translateY(-2em);
    transition: 0.2s;
  }

  .nav-link.active li .nav-item__icon::after {
    --indicator-size: 3.2rem;

    content: "";
    position: absolute;
    top: calc(calc(var(--indicator-size) * 0.225) * -1);
    left: calc(calc(var(--indicator-size) * 0.225) * -1);
    z-index: -1;
    width: var(--indicator-size);
    height: var(--indicator-size);
    background-color: var(--clr-primary-dark);
    border: 3px solid var(--clr-primary-100);
    border-radius: 100vw;
  }

  .nav-link.active li .nav-item__text {
    transform: translateY(1.5em);
    opacity: 1;
  }

</style>
