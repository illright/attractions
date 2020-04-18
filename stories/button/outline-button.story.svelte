<script>
  import Button from '../../src/button';

  export let buttonText;
</script>

<div class="button-container">
  <h2>Outline</h2>
  <Button outline on:click>
    {buttonText}
  </Button>
  <Button outline danger on:click>
    {buttonText}
  </Button>
  <Button outline neutral on:click>
    {buttonText}
  </Button>
  <Button outline disabled on:click>
    {buttonText}
  </Button>
  <Button outline small on:click>
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
