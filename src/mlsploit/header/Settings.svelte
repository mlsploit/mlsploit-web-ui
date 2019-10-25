<script>
  import API from '../../rest.js';
  import { purgeToken } from '../../auth/token.js';
</script>

<style>
  .dropdown {
    margin: 0 0.09rem;
  }
  .dropdown-menu {
    padding: 10px;
  }

  .dropdown-btn {
    font-size: 1.2rem;
  }
</style>

<div class="dropdown">
  <button type="button"
          class="btn btn-secondary dropdown-btn"
          style="order: 1;"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
    <i class="fas fa-cog"></i>
  </button>
  <div class="dropdown-menu dropdown-menu-right">
    <h6>
      {#await API.getCurrentUser() }
        <!-- promise is pending -->
        Hello!
      {:then currentUser}
        <!-- promise was fulfilled -->
        Hello, {currentUser.username}!
      {:catch error}
        <!-- promise was rejected -->
      {/await}
    </h6>

    <div class="dropdown-divider"></div>

    <a class="btn btn-danger btn-block"
          href="#" tabindex="0"
          on:click={purgeToken}>
      Sign Out
    </a>
  </div>
</div>