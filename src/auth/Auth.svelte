<script>
  import SignIn from './SignIn.svelte';
  import SignUp from './SignUp.svelte';

  let showSignIn = true;

  const toggleShowSignIn = (e) => {
    e.preventDefault();
    showSignIn = !showSignIn;
  };
</script>

<style>
  #logo {
    width: 200px;
    margin-bottom: 40px;
  }

  .card {
    min-width: 250px;
    max-width: 100%;
    width: 400px;
    margin: 100px auto;
  }
</style>

<div class="card shadow">
  <div class="card-body">
    <div class="container text-center">
      <img id="logo" src="/assets/img/mlsploit-logo.png" alt="MLsploit" />
    </div>
    
    {#if showSignIn}
      <SignIn {toggleShowSignIn} />
    {:else}
      <SignUp {toggleShowSignIn} />
    {/if}
  </div>
</div>
