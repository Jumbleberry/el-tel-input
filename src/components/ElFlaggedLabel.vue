<template>
  <div class="el-flagged-label">
    <span class="el-flagged-label__icon" :class="[`el-flagged-label__icon--${country.iso2.toLowerCase()}`]"></span>
    <span v-if="showName" class="el-flagged-label__name">{{country.name}}</span>
  </div>
</template>
<script>
import '@/assets/css/flags-sprite.css';
export default {
  name: 'ElFlaggedLabel',
  props: {
    country: {
      type: Object,
      required: true
    },
    showName: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss">
.el-flagged-label {
  display: flex;
  align-items: center;
  height: 100%;
  .el-flagged-label__icon {
    margin: 4px 0;
  }
  .el-flagged-label__name {
    padding-left: 5px;
  }
}
</style>
