<template>
  <div class="about">
    <h1>This is an about page {{ id }}</h1>
    <div class="info" v-if="item !== null">
      <p>label: {{ item.label }}</p>
      <p>Positive: {{ item.sentiment.positive || 0}}</p>
      <p>Negative: {{ item.sentiment.negative || 0}}</p>
      <p>Neutral: {{ item.sentiment.neutral || 0}}</p>
      <p>
        Total:
        {{
          (item.sentiment.positive || 0) +
            (item.sentiment.negative || 0) +
            (item.sentiment.neutral || 0) 
        }}
      </p>
      <div>
        <span v-for="(value, name) in item.pageType" :key="name">
          {{ name }}: <b>{{ value }}</b>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "details",
  components: {},
  computed: {
    item() {
      return this.$store.getters.item(this.id);
    }
  },
  props: ["id"],
  created() {
    // console.log('created')
    this.getItems();
  },
  methods: {
    getItems() {
      this.$store.dispatch(
        "get",
        "https://gist.githubusercontent.com/snownoop/e6ca04705cf03cbe6ef9beaf16a306ab/raw/07906333730ca961a8091a8c16b05d26a8ee7cd9/Tags%2520Cloud%2520Data"
      );
    }
  }
};
</script>
