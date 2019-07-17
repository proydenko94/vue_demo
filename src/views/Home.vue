<template>
  <div class="home">
    <tag-cloud :items="items"></tag-cloud>
  </div>
</template>

<script>
// @ is an alias to /src
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "home",
  components: {
    TagCloud
  },
  computed: {
    items() {
      return this.$store.getters.items;
    }
  },
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
