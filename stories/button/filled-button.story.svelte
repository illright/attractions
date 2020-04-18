<script>
  import Button from '../../src/button';

  export let buttonText;
</script>

<div class="button-container">
  <h2>Filled</h2>
  <Button filled on:click>
    {buttonText}
  </Button>
  <Button filled danger on:click>
    {buttonText}
  </Button>
  <Button filled neutral on:click>
    {buttonText}
  </Button>
  <Button filled disabled on:click>
    {buttonText}
  </Button>
  <Button filled small on:click>
    {buttonText}
  </Button>
</div>

<style>
  h2 {
    margin: 0 0 1em;
    font-size: 1.2rem;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :global(.button-container .btn) {
    margin-bottom: .5em;
  }
</style>
