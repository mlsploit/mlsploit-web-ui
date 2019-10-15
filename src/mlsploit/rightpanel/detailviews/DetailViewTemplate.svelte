<script>
  export let title = '';
  export let footer = '';
</script>

<style>
  .detail-view {
    margin: auto 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  :global(.detail-view-header, .detail-view-body, .detail-view-footer) {
    flex-shrink: 1;
    overflow-y: scroll;
    padding: 2rem 1rem;
  }

  :global(.detail-view-header) {
    border-bottom: var(--border);
    font-size: 1.2rem;
    font-weight: 1000;
  }

  :global(.detail-view-body) {
    flex-grow: 1;
    min-height: 40vh;
  }

  :global(.detail-view-footer) {
    border-top: var(--border);
    font-size: 0.8rem;
    color: #6c757d;
  }
</style>

<div class="detail-view">
  <slot name="detail-view-header">
    {#if title}
      <div class="detail-view-header" >
        <span>{title}</span>
      </div>
    {/if}
  </slot>

  <div class="detail-view-body">
    <slot />
  </div>

  <slot name="detail-view-footer">
    {#if footer}
      <div class="detail-view-footer">
        <span>{footer}</span>
      </div>
    {/if}
  </slot>
</div>