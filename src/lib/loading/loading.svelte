<!-- Adapted from SpinKit by @tobiasahlin: https://tobiasahlin.com/spinkit/ -->
<script lang="ts">
  import classes from '../utils/classes.js';

  let _class: string | false | null = null;
  export { _class as class };
</script>

<div class={classes('spinner', _class)}>
  <div class="bounce1" />
  <div class="bounce2" />
  <div class="bounce3" />
</div>

<style lang="scss">
  /* Adapted from SpinKit by @tobiasahlin: https://tobiasahlin.com/spinkit/ */

  $dot-size: 0.4em;

  .spinner {
    align-items: center;
    color: var(--a-primary);
    display: flex;
    justify-content: center;

    > div {
      animation: sk-bouncedelay 1.2s infinite ease-in-out both;
      background: currentColor;
      border-radius: 100%;
      display: inline-block;
      height: $dot-size;
      margin: 0 0.1em;
      width: $dot-size;
    }

    .bounce1 {
      animation-delay: -0.32s;
    }

    .bounce2 {
      animation-delay: -0.16s;
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }

    40% {
      transform: scale(1);
    }
  }
</style>
