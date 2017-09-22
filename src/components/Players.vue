<template>
  <div class="player">
    <el-row>
      <el-col :span="18" class="players">
        <h2>Player</h2>
        <player-v4 v-if="active === 'v4'"></player-v4>
        <player-v3 v-if="active === 'v3'"></player-v3>
        <player-v2 v-if="active === 'v2'"></player-v2>
        <podigee v-if="active === 'podigee'"></podigee>
      </el-col>
      <el-col :span="6" class="sidebar">
        <h2>Config</h2>
        <el-form label-position="top" label-width="100px">

          <el-form-item label="Player">
            <el-select :value="active" placeholder="Select" @input="changePlayer">
              <el-option
                v-for="item in players"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Position">
            <el-select :value="position" placeholder="Select" @input="changePosition">
              <el-option
                v-for="item in positions"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PlayerV2 from './players/PlayerV2.vue'
import PlayerV3 from './players/PlayerV3.vue'
import PlayerV4 from './players/v4/Config.vue'
import Podigee from './players/Podigee.vue'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: mapState({
    players: state => state.player.players,
    active: state => state.player.active,
    positions: state => state.player.positions,
    position: state => state.player.position
  }),
  methods: {
    changePlayer(id) {
      this.$store.commit('setPlayer', id)
    },
    changePosition(id) {
      this.$store.commit('setPosition', id)
    }
  },
  components: {
    PlayerV2,
    PlayerV3,
    PlayerV4,
    Podigee
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/variables';

  .sidebar {
    padding: 0 $spacing;
  }

  .players {
    border-right: 1px solid $border-color;
  }
</style>
