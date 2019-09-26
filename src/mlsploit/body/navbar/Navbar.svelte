<script>
  import API from '../../../rest.js';
  import { purgeToken } from '../../../auth/token.js';
</script>

<style>
  a:focus {
    outline: 0;
  }

  .user-icon-wrapper {
    font-size: 24px;
    cursor: pointer;
    margin-left: auto;
    margin-bottom: 0.5em;
  }

  .dropdown-toggle::after {
    display: none;
  }

  .fa-stack {
    text-align: center;
    vertical-align: top;
  }
</style>

<nav class="navbar navbar-expand-lg navbar-light">
  
  <button type="button" class="bp3-button bp3-large bp3-intent-primary">
    <span class="bp3-icon bp3-icon-plus"></span>
    <span class="bp3-button-text">New Pipeline</span>
  </button>

  <div class="user-icon-wrapper dropdown">
    <a class="dropdown-toggle" href="#" id="navbarUserDropdownMenuLink" 
      role="button" data-toggle="dropdown" 
      aria-haspopup="true" aria-expanded="false"
    >
      <span class="fa-stack">
        <i class="far fa-circle fa-stack-2x"></i>
        <i class="fas fa-user"></i>
      </span>
    </a>
    <div class="dropdown-menu dropdown-menu-right bp3-menu" 
      aria-labelledby="navbarUserDropdownMenuLink"
    >
      <li class="bp3-menu-header">
        <h5 class="bp3-heading">
          {#await API.getCurrentUser() }
            <!-- promise is pending -->
            Hello!
          {:then currentUser}
            <!-- promise was fulfilled -->
            Hello, {currentUser.username}!
          {:catch error}
            <!-- promise was rejected -->
          {/await}
        </h5>
      </li>
      
      <li class="bp3-menu-divider"></li>
      
      <li>
        <a class="bp3-menu-item bp3-icon-log-out bp3-intent-danger" 
          href="#" tabindex="0"
          on:click={purgeToken}
        >
          Sign Out
        </a>
      </li>
    </div>
  </div>
</nav>
