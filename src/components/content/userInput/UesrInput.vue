<template>
  <div class="user-input">
    <label for="user"></label>
    <input type="text"
           name="user"
           id="user"
           :placeholder="dataPlaceholder"
           maxlength="50"
    />
  </div>
</template>

<script>
export default {
  name: "UesrInput",
  props: {
    dataPlaceholder: {
      type: String,
      default() {
        return '';
      }
    }
  }
}
</script>

<style scoped>

</style>
