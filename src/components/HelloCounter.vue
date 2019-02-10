<template>
    <div>
      <p>{{ counter }}＋10＝{{ counter10 }}</p>
      <button @click="increment">Up</button>
      <button @click="increment2">Up×2</button>
      <button @click="set(0)">Set(0)</button>
      <button @click="square">^2</button>
      <button @click="add(5)">+5</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, /*mapMutations,*/ mapActions } from 'vuex';
import { Getters, Actions } from '../store';

@Component({
  computed: {
    ...mapGetters({ counter: Getters.COUNTER }),
  },
  methods: {
    // ...mapMutations([increment: Mutations.INC_COUNTER]),
    ...mapActions({ increment: Actions.DO_INC_COUNTER }),
  },
})
export default class HelloCounter extends Vue {
  // private get counter(): number {
  //   return this.$store.getters[Getters.COUNTER];
  // }
  private get counter10(): number {
    return this.$store.getters[Getters.COUNTER_PLUS10];
  }
  // private increment(): void {
  //   this.$store.dispatch(Actions.DO_INC_COUNTER);
  // }
  private increment2(): void {
    this.$store.dispatch(Actions.DO_INC2_COUNTER);
  }
  private async set(count: number): Promise<void> {
    await this.$store.dispatch(Actions.DO_SET_COUNTER, count)/*.then(() => { 次の処理を書く })*/;
  }
  private square(): void {
    this.$store.dispatch(Actions.DO_SQE_COUNTER);
  }
  private add(count: number): void {
    this.$store.dispatch(Actions.DO_ADD_COUNTER, count);
  }
}
</script>