<script>
  import {
    Dialog,
    TextField,
  } from '../attractions/index.js';

  export let closeCallback;
</script>

<Dialog title="Test dialog" {closeCallback} constrainWidth>
  You don't have to enter anything below, but, you know, if you'd like...
  I would appreciate, okay? I know it's hard right now.
  <TextField />
</Dialog>
