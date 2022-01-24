<script>
  export let size = "1em"
  export let fill = "currentColor"
  export let vBox = 24
</script>

<svg
  class="base-icon"
  width={size}
  height={size}
  style:fill
  viewBox="0 0 {vBox} {vBox}"
><slot /></svg>
