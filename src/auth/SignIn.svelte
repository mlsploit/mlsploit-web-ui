<script>
  import API from '../rest.js'
  import { setToken } from './token.js';

  export let toggleShowSignIn;

  const SIGN_IN_MESSAGE = 'Sign In';
  const SIGNING_IN_MESSAGE = 'Signing in...';

  let username = '', password = '';
  let busySigningIn = false;

  $: signInEnabled = username && password && !busySigningIn;
  $: signUpEnabled = !busySigningIn;
  $: signInBtnValue = busySigningIn ? SIGNING_IN_MESSAGE : SIGN_IN_MESSAGE;

  const handleSignInClick = (e) => {
    e.preventDefault();

    busySigningIn = true;

    API.signin(username, password)
      .then(response => {
        const token = response.token;
        setToken(token);
      }).catch(err => {
        username = '';
        password = '';
      }).finally(() => {
        busySigningIn = false;
      });
  };
</script>

<form class="container">
  <div class="form-group">
    <!-- <label for="username">Username</label> -->
    <input type="text" class="form-control" name="username" placeholder="Username" bind:value={username} />
  </div>

  <div class="form-group">
    <!-- <label for="password">Password</label> -->
    <input type="password" class="form-control" name="password" placeholder="Password" bind:value={password} />
  </div>

  <input type="submit" class="btn btn-lg btn-primary"
    value={signInBtnValue}
    disabled={!signInEnabled}
    on:click={handleSignInClick}
  />
  <input type="button" class="btn btn-lg btn-outline-primary" value="Sign Up"
    disabled={!signUpEnabled}
    on:click={toggleShowSignIn}
  />
</form>
