<script>
  import NavigationHeader from "./components/NavigationHeader.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<NavigationHeader />
<main class="landing-main">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <h1 class="title">Make<br />learning fun!</h1>
        <p class="sub-title">
          Where your instructor knows the best way to make you understand.<br />
        </p>
        <a class="btn-fill" href="/signup">Sign up for free</a>
      </div>
      <div class="col-sm-12 col-md-6">
        <img src="/images/content.svg" alt="" />
      </div>
    </div>
  </div>
</main>
<Footer />
