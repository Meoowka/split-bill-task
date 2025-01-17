<script>
import {mapState, mapActions} from 'vuex'
import {nextTick} from "vue";

export default {
  data() {
    return {
      editName: "",
      editId: null
    }
  },
  computed: {
    ...mapState('userStore', {
      usersFromStore: state => state.user,
    }),
  },
  methods: {
    ...mapActions('userStore', [
      'addUser',
      'editUser',
      'removeUser'
    ]),
    remove(id) {
      this.stopEdit();
      this.removeUser(id);
    },
    startEdit(id) {
      this.stopEdit();
      this.editId = id;
      this.editName = this.usersFromStore.find(c => c.id === id).name;
    },
    stopEdit() {
      if (this.editId === null) {
        return;
      }
      this.editUser({id: this.editId, name: this.editName.trim()});
      this.editId = null;
    },
    add() {
      this.addUser({name: ""});
      this.startEdit(this.usersFromStore[this.usersFromStore.length - 1].id);
      nextTick(() => {
        const ul = this.$el.querySelector('ul');
        ul.scrollTop = ul.scrollHeight;

      });
    },
    handleInputKey(e, target) {
      if (!['Tab', 'Enter'].includes(e.code)) {
        return;
      }
      e.preventDefault();
      this.$el.querySelector(target).click();
    },
    handleProductAdd() {
      if (this.usersFromStore.length === 0) {
        alert("Сначала создайте хотя бы одного пользователя!");
        return;
      }
      this.$router.push("/products");
    }
  },
  unmounted() {
    this.stopEdit();
  },
}
</script>

<template>
  <div class="container">
    <h1>Пользователи</h1>
    <ul>
      <li
          class="list-item"
          v-for="{id, name} in usersFromStore"
          :class="{editing: id === editId}"
          :key="id"
      >
        <div class="details">
          <div class="icon">{{ name[0] }}</div>
          <p v-if="id !== editId" class="name">{{ name }}</p>
          <input
              v-else
              v-model="editName"
              type="text"
              :placeholder="`User ${usersFromStore.length}`"
              @keydown="(e) => this.handleInputKey(e, '.bi-check-lg')"
          />
        </div>
        <div>
        <v-btn v-if="id !== editId" class="bi bi-pencil-fill" @click="startEdit(id)"></v-btn>
        <v-btn v-else class="bi bi-check-lg" @click="stopEdit()"></v-btn>
        <v-btn class="bi bi-trash-fill" @click="remove(id)"></v-btn>
        </div>
      </li>

      <li class="list-btn" @click="add()">
        <v-btn variant="tonal" class="bi bi-person-plus-fill" >
          Добавить пользователя
        </v-btn>
      </li>
    </ul>
    <p v-if="usersFromStore.length === 0" class="info-message">
      Пожалуйста, создайте пользователя перед добавлением продукта.
    </p>
    <v-btn
        v-if="usersFromStore.length >= 3"
        variant="tonal"
        class="link next-btn"
        @click.prevent="handleProductAdd"
    >
      Добавить продукт
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
@import "./style.scss";
</style>