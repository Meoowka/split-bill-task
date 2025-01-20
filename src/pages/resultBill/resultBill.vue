<script>
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      result: [],
      someonePays: false,
    }
  },
  methods: {
    ...mapActions(['clearAllData']),
    clearData() {
      this.clearAllData(); // Вызываем глобальное действие для очистки
    }
  },
  computed: {
    ...mapState('userStore', {
      user: state => state.user,
    }),
    ...mapState('productStore', {
      products: state => state.products,
    }),
  },
  created() {
    const ind = {}
    this.user.forEach(({id, name}, index) => {
      ind[id] = index;
      this.result.push({id, name, payed: 0, consumed: 0, owed: []})
    });
    if (!this.result.length) {
      return;
    }
    this.products.forEach(({buyer, consumers, price}) => {
      this.result[ind[buyer]].payed += price;

      if (consumers.length === 0) {
        return this.result[ind[buyer]].consumed += price;
      }

      const dividedPrice = price / consumers.length;
      consumers.forEach(c => this.result[ind[c]].consumed += dividedPrice);
    })

    const lenders = []
    this.result.forEach(c => {
      if (c.payed) {
        this.someonePays = true;
        c.diff = c.payed - c.consumed;
        if (c.diff > 0) {
          lenders.push({id: c.id, debt: c.diff, name: c.name});
        }
      }
    })

    this.result.forEach(c => {
      if (c.diff >= 0) {
        return;
      }
      c.diff *= -1;

      while (c.diff > 0.01) {
        const l = lenders.at(-1);
        c.owed.push({id: l.id, name: l.name});

        if (c.diff < l.debt) {
          c.owed.at(-1).sum = c.diff;
          l.debt -= c.diff;
          break;
        } else {
          c.owed.at(-1).sum = l.debt;
          c.diff -= l.debt;
          lenders.pop();
        }
      }
    });

  },
}
</script>
<template>
  <!--Исправил момент с "атрибутов у компонента больше 1-2"-->
  <div class="container">
    <h1>Result</h1>
    <ul v-if="user.length && products.length && someonePays">
      <template v-for="{id, name, payed, owed} in result">
        <li v-if="payed > 0 || owed.length > 0"
            class="list-item"
            :key="id">
          <p v-if="payed > 0" class="payment">
            <span class="name">{{ name }}</span>
            заплатил
            <span class="money">{{ payed.toFixed(2) }} рубликов</span>
          </p>
          <p v-for="lender, index in owed" class="debt">
            <span class="name" :transparent="payed > 0 || index > 0">
              {{ name }}
            </span>
            должен
            <span class="name">{{ lender.name }}</span>
            <span class="money"> {{ lender.sum.toFixed(2) }} рубликов</span>
          </p>
        </li>
      </template>
    </ul>
    <h4
        v-else-if="user.length && products.length"
        class="info-message"
    >
      Никто ничего не платит
    </h4>
    <h4 v-else class="info-message">Пользователи или товары не были добавлены</h4>
    <router-link
        v-if="user.length && products.length"
        to="/"
        @click.native="clearData"
    >
      <v-btn class="link next-btn">
        Новый чек
      </v-btn>
    </router-link>

    <router-link
        v-else-if="user.length"
        to="/products"
    >
      <v-btn class="link next-btn">
        Добавить продукт
      </v-btn>
    </router-link>
    <router-link
        v-else
        class="link next-btn"
        to="/users"
    >
      <v-btn class="link next-btn">
        Добавить пользователей
      </v-btn>
    </router-link>
  </div>

</template>

<style scoped lang="scss">
@import "./style.scss";
</style>