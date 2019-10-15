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

  .detail-view-header, .detail-view-body, .detail-view-footer {
    flex-shrink: 1;
    padding: 2rem 1rem;
  }

  .detail-view-header {
    border-bottom: var(--border);
    font-size: 1.2rem;
    font-weight: 1000;
  }

  .detail-view-body {
    flex-grow: 1;
    overflow-y: scroll;
  }

  .detail-view-footer {
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
      <div class="footer-text">
        <span>{footer}</span>
      </div>
    {/if}
  </slot>
</div>