<template>
  <div class="player">
    <el-row>
      <el-col :span="18" class="players">
        <h2>Player</h2>
        <player-v4 v-if="activePlayer === 'v4'"></player-v4>
        <player-v3 v-if="activePlayer === 'v3'"></player-v3>
        <player-v2 v-if="activePlayer === 'v2'"></player-v2>
        <podigee v-if="activePlayer === 'podigee'"></podigee>
      </el-col>
      <el-col :span="6" class="sidebar">
        <h2>Config</h2>
        <el-form label-position="top" label-width="100px">

          <el-form-item label="Player">
            <el-select :value="activePlayer" placeholder="Select" @input="setPlayer">
              <el-option
                v-for="item in players"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Position">
            <el-select :value="activePosition" placeholder="Select" @input="setPosition">
              <el-option
                v-for="item in positions"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-button type="primary" size="large" @click="save()">Save</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { get } from 'lodash/fp'

import PlayerV2 from './players/v2/Config.vue'
import PlayerV3 from './players/v3/Config.vue'
import PlayerV4 from './players/v4/Config.vue'
import Podigee from './players/podigee/Config.vue'

export default {
  computed: {
    ...mapState('player/settings', {
      players: get('players'),
      activePlayer: get('activePlayer'),
      positions: get('positions'),
      activePosition: get('activePosition')
    })
  },
  methods: {
    ...mapMutations('player/settings', [
      'setPlayer',
      'setPosition'
    ]),
    ...mapActions('player', ['boot', 'save'])
  },
  mounted () {
    this.boot()
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
<style lang="scss">
  @import '../styles/variables';
  @import '../styles/player';

  .sidebar {
    padding: 0 $spacing;
  }

  .players {
    border-right: 1px solid $border-color;
    padding-right: $spacing;
  }
</style>
