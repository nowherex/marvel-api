<template>
  <q-card class="my-card flex flex-center">
    <q-item-section avatar>
      <q-btn
        flat
        round
        color="red"
        icon="favorite_border"
      />
    </q-item-section>

    <q-img
      :src="data.thumbnail.path+'.'+data.thumbnail.extension"
      style="width: 200px; height: 200px; margin: 10px 10px 0 10px;"
      contain
    />
    <q-card-section>
      <div class="title">
        {{ data.name || data.title }}
      </div>
    </q-card-section>
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
  font-size: 0.8em
  padding: 0

.my-card
  width: 100%
  max-width: 230px
</style>
