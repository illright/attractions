<script>
  import Button from '../../src/button';

  export let buttonText;
</script>

<div class="button-container">
  <h2>Flat</h2>
  <Button on:click>
    {buttonText}
  </Button>
  <Button danger on:click>
    {buttonText}
  </Button>
  <Button neutral on:click>
    {buttonText}
  </Button>
  <Button disabled on:click>
    {buttonText}
  </Button>
  <Button small on:click>
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
