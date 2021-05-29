<template>
  <q-card class="my-card">
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
          style="width: 200px; height: 30px;"
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
</style>
