<template>
  <section class="login">
    <div v-if="$store.state.token" class="app-form">
      <h1 class="form-header">Вы уже авторизованы</h1>
    </div>

    <form v-else class="app-form" @submit.prevent="submitForm($event)">
      <h1 class="form-header">Авторизация</h1>

      <label class="form-field">
        <p class="form-field__label">Логин</p>

        <input type="text"
          class="form-field__input _input-theme"
          :class="{ 'form-field__input_error': loginError }"
          v-model.trim="login"
          @input="checkLogin()"
          @blur="checkLogin()" >
    
        <p v-show="loginError" class="form-field__warning">Длина логина от 3 символов</p>
      </label>

      <label class="form-field form-password">
        <p class="form-field__label">Пароль</p>

        <input :type="passwordVisible ? 'text' : 'password'"
          class="form-field__input _input-theme"
          :class="{ 'form-field__input_error': passwordError }"
          v-model="password"
          @input="checkPassword()"
          @blur="checkPassword()" >

        <button tabindex="-1"
          class="form-password__switch"
          :class="{ 'form-password__switch_visible': passwordVisible }"
          @click.prevent="passwordVisible = !passwordVisible"
        ></button>

        <p v-show="passwordError" class="form-field__warning">Введите пароль</p>
      </label>

      <button class="app-btn">войти</button>

      <p v-show="wrongData" class="form-field__warning">Неправильный логин или пароль</p>

      <router-link to="/registration" class="form-link">Регистрация</router-link>
    </form>
  </section>
</template>



<script>
export default {
  data () {
    return {
      login: '',
      loginError: undefined,
      password: '',
      passwordError: undefined,
      passwordVisible: false,
      wrongData: false
    }
  },

  methods: {
    async submitForm (event) {
      if (this.loginError === false && this.passwordError === false) {
        await fetch('http://frontapi.3jz.ru/api/login/', {
          method: 'POST',
          body: JSON.stringify({
            login: this.login,
            password: this.password
          })
        })
        .then(res => res.json())
        .then(res => {
          if (res.status) {
            this.$store.state.token = res.token;
            this.$router.push('/cabinet');
          }
          else this.wrongData = true;
        })
      }
      else {
        for (let elem of event.currentTarget.getElementsByClassName('form-field__input')) {
          elem.focus();
          elem.blur();
        }
      }
    },

    checkLogin () {
      this.loginError = this.login.length < 3;
    },

    checkPassword () {
      this.passwordError = this.password.length < 6;
    },
  }
}
</script>
