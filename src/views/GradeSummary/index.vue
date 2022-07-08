<template>
  
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  setup(){
    ElMessage('该功能正在开发中...')
    setTimeout(() => {
      window.history.back()
    }, 3000);
    
  }
}
</script>

<style>

</style>