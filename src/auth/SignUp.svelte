<script>
  import API from '../rest.js'
  import { setToken } from './token.js';

  export let toggleShowSignIn;

  const SIGN_UP_MESSAGE = 'Sign Up';
  const SIGNING_UP_MESSAGE = 'Signing up...';

  let username = '', password1 = '', password2 = '';
  let busySigningUp = false;

  $: signInEnabled = !busySigningUp;
  $: signUpEnabled = (
    username
    && (
      password1
      && password2
      && password1 == password2
    )
    && !busySigningUp
  );
  $: signUpBtnValue = busySigningUp ? SIGNING_UP_MESSAGE : SIGN_UP_MESSAGE;

  const handleSignUpClick = (e) => {
    e.preventDefault();

    busySigningUp = true;

    API.signup(username, password1, password2)
      .then(response => {
        const token = response.token;
        setToken(token);
      }).catch(err => {
        username = '';
        password1 = '';
        password2 = '';
      }).finally(() => {
        busySigningUp = false;
      });
  };
</script>

<style>
  .textbox {
    font-size: 1.25rem;
  }

  #btn-signin {float: left;}
  #btn-signup {float: right;}
</style>

<form class="container">
  <div class="form-group">
    <!-- <label for="username">Username</label> -->
    <input type="text" class="form-control textbox" name="username" placeholder="Username" bind:value={username} />
  </div>

  <div class="form-group">
    <!-- <label for="password1">Password</label> -->
    <input type="password" class="form-control textbox" name="password1" placeholder="Password (min. 8 characters)" bind:value={password1} />
  </div>

  <div class="form-group">
    <!-- <label for="password2">Password (again)</label> -->
    <input type="password" class="form-control textbox" name="password2" placeholder="Password (again)" bind:value={password2} />
  </div>

  <input type="button" id="btn-signin" class="btn btn-lg btn-outline-dark"
    value="Sign In"
    disabled={!signInEnabled}
    on:click={toggleShowSignIn}
  />
  <input type="submit" id="btn-signup" class="btn btn-lg btn-primary"
    value={signUpBtnValue}
    disabled={!signUpEnabled}
    on:click={handleSignUpClick}
  />
</form>
