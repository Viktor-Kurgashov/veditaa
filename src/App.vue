<template>
  <nav>
    <div class="app-nav">
      <router-link class="nav-logo" to="/">LOGO</router-link>
      <button v-show="$store.state.token" class="nav-logout-btn" @click="logout()">выйти</button>
    </div>
  </nav>

  <main>
    <div class="app-main">
      <router-view/>
    </div>
  </main>
</template>



<script>
  export default {
    methods: {
      async logout () {
        await fetch('http://frontapi.3jz.ru/api/logout/', {
          method: 'POST',
          body: JSON.stringify({
            token: this.$store.state.token
          })
        })
        .then(res => res.json())
        .then(res => {
          if (res.status) {
            this.$store.state.token = undefined;
            this.$router.push('/')
          }
        })
      },
    }
  }
</script>



<style>
  body {
    padding-top: 56px;
  }

  nav, main {
    padding: 0 5%;
  }

  .app-nav,
  .app-main {
    max-width: 1440px;
    margin: 0 auto;
  }

  nav {
    background: white;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
  }

  .app-nav {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .nav-logo {
    font-size: 18px;
    font-weight: 700;
    line-height: 58px;
  }

  .nav-logout-btn {
    background: url('/icons/logout.svg') no-repeat 6px 52%;
    padding-right: 6px;
    padding-left: 30px;
    font-weight: 500;
  }

  section {
    padding-top: 30px;
    padding-bottom: 60px;
  }



  @media screen and (min-width: 768px) {
    body {
      padding-top: 62px;
    }

    nav {
      height: 62px;
    }

    .nav-logo {
      font-size: 20px;
      line-height: 64px;
    }

    .nav-logout-btn {
      background-size: 18px;
      padding-left: 33px;
      font-size: 18px;
    }

    section {
      padding-top: 42px;
    }
  }
</style>
