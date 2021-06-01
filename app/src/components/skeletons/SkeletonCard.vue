<template>
  <div id="q-app">
    <div class="q-pa-md q-gutter-md flex flex-center">
      <q-card
        v-for="i in numberCards"
        :key="i"
        style="width: 200px"
        animation="pulse-x"
      >
        <q-skeleton
          height="200px"
          square
          animation="pulse-x"
        />
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-skeleton
                type="text"
                animation="pulse-x"
              />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton
                type="text"
                animation="pulse-x"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-actions
          align="left"
          class="q-gutter-md"
        >
          <q-skeleton
            type="QBtn"
            animation="pulse-x"
            width="40px"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonCard',
  props: {
    numberCards: {
      type: Number,
      default: 20,
      required: false
    }
  }
}
</script>
