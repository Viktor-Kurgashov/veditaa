<template>
  <section class="registration">
    <div v-if="completed" class="app-form">
      <h1 class="form-header">Готово!</h1>
      <p class="form-text">Вы успешно зарегистрировались! Теперь вы можете войти.</p>
      <router-link to="/" class="app-btn">войти</router-link>
    </div>

    <form v-else class="app-form" @submit.prevent="submitForm($event)">
      <h1 class="form-header">Регистрация</h1>

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
          v-model="passwordFirst"
          @input="checkPassword()"
          @blur="checkPassword()" >

        <button tabindex="-1"
          class="form-password__switch"
          :class="{ 'form-password__switch_visible': passwordVisible }"
          @click.prevent="passwordVisible = !passwordVisible"
        ></button>

        <p v-show="passwordError" class="form-field__warning">Пароли должны совпадать</p>
      </label>

      <label class="form-field form-password">
        <p class="form-field__label">Повторите пароль</p>

        <input :type="passwordVisible ? 'text' : 'password'"
          class="form-field__input _input-theme"
          :class="{ 'form-field__input_error': passwordError }"
          v-model="passwordSecond"
          @input="checkPassword()"
          @blur="checkPassword()" >

        <button tabindex="-1"
          class="form-password__switch"
          :class="{ 'form-password__switch_visible': passwordVisible }"
          @click.prevent="passwordVisible = !passwordVisible"
        ></button>
        
        <p v-show="passwordError" class="form-field__warning">Пароли должны совпадать</p>
      </label>

      <label class="form-field">
        <p class="form-field__label">Телефон</p>

        <input type="text"
          class="form-field__input _input-theme"
          :class="{ 'form-field__input_error': phoneError }"
          v-model.trim="phone"
          @input="checkPhone()"
          @blur="checkPhone()" >
    
        <p v-show="phoneError" class="form-field__warning">Заполните это поле</p>
      </label>

      <label class="form-checkbox">
        <input type="checkbox" class="form-checkbox__removed" v-model="checkboxState" >

        <div class="form-checkbox__field" :class="{ 'form-checkbox_error': checkboxState === false }"></div>    

        <p class="form-checkbox__label">Я согласен на обработку моих данных</p>

        <p v-show="checkboxState === false" class="form-checkbox__warning">Подтвердите согласие</p>
      </label>

      <button class="form-submit-btn app-btn">зарегистрироваться</button>

      <router-link to="/" class="form-link">Войти</router-link>
    </form>
  </section>
</template>



<script>
export default {
  data () {
    return {
      completed: false,
      login: '',
      loginError: undefined,
      passwordFirst: '',
      passwordSecond: '',
      passwordVisible: false,
      passwordError: undefined,
      phone: '',
      phoneError: undefined,
      checkboxState: undefined,
    }
  },

  methods: {
    async submitForm (event) {      
      if ((this.loginError === this.passwordError === this.phoneError === false) && this.checkboxState) {
        await fetch('http://frontapi.3jz.ru/api/registration/', {
          method: 'POST',
          body: JSON.stringify({
            login: this.login,
            password: this.passwordFirst,
            phone: this.phone
          })
        })
        .then(res => this.completed = res.ok);
      }
      else {        
        for (let elem of event.currentTarget.getElementsByClassName('form-field__input')) {
          elem.focus();
          elem.blur();
        }
        if (this.checkboxState === undefined) this.checkboxState = false;
      }
    },

    checkLogin () {
      this.loginError = this.login.length < 3;
    },

    checkPassword () {
      this.passwordError = (this.passwordFirst.length < 6) || (this.passwordFirst !== this.passwordSecond);
    },

    checkPhone () {
      this.phoneError = this.phone.length < 3;
    },
  }
}
</script>
