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
  }
</style>

<div class="detail-view">
  <div class="detail-view-header">
    <slot name="detail-view-header" >
      <span>{title}</span>
    </slot>
  </div>

  <div class="detail-view-body">
    <slot />
  </div>

  <div class="detail-view-footer">
    <slot name="footer-text text-muted">
      <span class="text-muted">{footer}</span>
    </slot>
  </div>
</div>