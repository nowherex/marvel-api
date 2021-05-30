<template>
  <q-card
    v-ripple
    class="my-card"
    clickable
  >
    <div
      class="flex flex-center"
      @click="$emit('click-on-card')"
    >
      <q-img
        :src="data.thumbnail.path+'.'+data.thumbnail.extension"
        style="width: 200px; height: 200px; margin: 10px 10px 0 10px;"
        contain
      />
      <q-card-section>
        <div
          class="title"
          style="width: 200px; height: 55px;"
        >
          {{ data.name || data.title }}
        </div>
      </q-card-section>
    </div>
    <q-card-actions>
      <q-btn
        flat
        round
        color="red"
        icon="favorite_border"
        class="likeBtn"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'Card',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data']
}
</script>

<style lang="sass" scoped>
.title
  font-size: 0.9em

.my-card
  width: 100%
  max-width: 230px
  opacity: .8
.my-card:hover
  transition: all 0.7s ease-out
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2)
  top: -4px
  border: 1px solid #cccccc
  background-color: white
  cursor: pointer
  opacity: 1
  .likeBtn
    opacity: .5
</style>
