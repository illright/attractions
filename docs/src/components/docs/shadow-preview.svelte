<script>
  import { Popover } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';

  export let value;
</script>

<Popover position={PopoverPositions.LEFT}>
  <div class="preview" style="box-shadow: {value};" />
  <div slot="popover-content" class="value-popover">
    {value.replace(/\), /g, '),\n')}
  </div>
</Popover>


<style src="../../../static/css/components/docs/shadow-preview.scss"></style>
