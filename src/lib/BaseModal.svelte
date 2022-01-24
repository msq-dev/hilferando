<script>
  import { createEventDispatcher } from "svelte"
  export let open = false
  const dispatch = createEventDispatcher()

</script>

{#if open}
  <div class="modal-container">
    <slot>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur maxime dolorum explicabo corrupti nostrum quos quidem saepe, quisquam culpa temporibus illo consequatur commodi doloribus quibusdam eos? Provident doloremque laboriosam quam.</slot>
    <button class="btn-modal-close" on:click={() => dispatch("closeModal", false)}>&times;</button>
  </div>
{/if}

<style>
  .modal-container {
    position: absolute;
    inset: 0;
    z-index: 10;
    background-color: var(--clr-primary-100);
    height: 90vh;
    padding: 1em;
    margin: 0.5em;
    border-radius: 0.5em;
    box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075)
    ;
  }

  .btn-modal-close {
    margin-top: 5rem;
    padding: 1em;
    color: var(--clr-primary-100);
    background-color: var(--clr-warning);
    border-radius: 100vw;


  }


</style>
