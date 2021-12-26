<template>
  <section class="cabinet">
    <div v-if="!$store.state.token" class="app-form">
      <h1 class="form-header">Вы не авторизованы</h1>
    </div>

    <template v-else>
      <h1 class="cabinet-header">Список заявок</h1>

      <ul class="cabinet-list">
        <li class="cabinet-list__item">
          <p class="cabinet-list__title">Заголовок заявки</p>
          <p class="cabinet-list__text">Гомогенная среда экстремально отклоняет фонон. Турбулентность стабилизирует гидродинамический удар. 
            Сверхновая тормозит фонон. Призма, как следует из совокупности экспериментальных наблюдений, притягивает лазер.</p>
        </li>

        <li v-for="item of tasks" class="cabinet-list__item" :key="item.name">
          <p class="cabinet-list__title">{{ item.name }}</p>
          <p class="cabinet-list__text">{{ item.text_task }}</p>
        </li>
      </ul>

      <button class="cabinet-button app-btn" @click="openModal()">создать заявку</button>

      <div v-show="modalVisible" class="cabinet-modal" @click.self="closeModal()">
        <form class="app-form" @submit.prevent="createRequest($event)">
          <h1 class="form-header">Создать заявку</h1>

          <label class="form-field">
            <p class="form-field__label">Заголовок</p>

            <input type="text"
              class="form-field__input _input-theme"
              :class="{ 'form-field__input_error': titleError }"
              v-model.trim="title"
              @input="checkTitle()"
              @blur="checkTitle()" >

            <p v-show="titleError" class="form-field__warning">Длина заголовка от 3 символов</p>
          </label>

          <label class="form-field">
            <p class="form-field__label">Заголовок</p>

            <textarea rows="7"
              class="form-field__textarea _input-theme"
              :class="{ 'form-field__input_error': textError }"
              v-model.trim="text"
              @input="checkText()"
              @blur="checkText()"
            ></textarea>

            <p v-show="textError" class="form-field__warning">Длина текста минимум 10 символов</p>
          </label>

          <button class="app-btn">создать заявку</button>
        </form>
      </div>
    </template>
  </section>
</template>



<script>
export default {
  data () {
    return {
      tasks: [],
      modalVisible: false,
      title: '',
      titleError: undefined,
      text: '',
      textError: undefined
    }
  },

  mounted () {
    if (this.$store.state.token) {
      this.getTasks();
    }
  },

  methods: {    
    async createRequest (event) {
      if ((this.titleError === false) && (this.textError === false)) {
        await fetch('http://frontapi.3jz.ru/api/create_task/', {
          method: 'POST',
          body: JSON.stringify({
            token: this.$store.state.token,
            task_info: {
              name: this.title,
              text_task: this.text
            }
          })
        })
        .then(res => res.json())
        .then(res => {
          if (res.status) {
            this.closeModal();
            this.getTasks();
          }
        })
      }
      else {
        for (let elem of event.currentTarget.getElementsByClassName('_input-theme')) {
          elem.focus();
          elem.blur();
        }
      }
    },

    async getTasks () {
      await fetch('http://frontapi.3jz.ru/api/get_tasks/', {
        method: 'POST',
        body: JSON.stringify({
          token: this.$store.state.token
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          this.tasks = res.message;
        }
      })
    },

    openModal () {
      document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
      document.body.style.overflowY = 'hidden';
      this.modalVisible = true;
    },

    closeModal () {
      document.body.style.paddingRight = document.body.style.overflowY = '';
      this.modalVisible = false;
    },

    checkTitle () {
      this.titleError = this.title.length < 3;
    },

    checkText () {
      this.textError = this.text.length < 10;
    },
  }
}
</script>



<style>
  .cabinet-header {
    padding-left: 6px;
    color: black;
  }

  .cabinet-list {
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .cabinet-list__item {
    padding: 22px min(24px, 8%) 24px;
    border-radius: 6px;
    background: white;
  }

  .cabinet-list__title {
    color: black;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .cabinet-list__text {
    font-size: 15px;
    line-height: 20px;
  }

  .cabinet-button {
    width: max(50%, 240px);
    margin-right: auto;
    margin-left: auto;
  }

  .cabinet-modal {
    background: rgba(0,0,0,0.45);
    position: fixed;
    z-index: 20;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 80px 5% 0;
  }



  @media screen and (min-width: 768px) {
    .cabinet-list {
      margin-top: 26px;
      row-gap: 22px;
    }

    .cabinet-list__item {
      padding: 25px 30px 27px;
    }

    .cabinet-list__title {
      font-size: 18px;
      margin-bottom: 13px;
    }

    .cabinet-list__text {
      font-size: 16px;
      line-height: 22px;
    }

    .cabinet-button {
      width: 525px;
    }

    .cabinet-modal {
      padding-top: 100px;
    }
  }
</style>
