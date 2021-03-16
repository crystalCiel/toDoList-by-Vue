<template>
    <div class="modal " id="deleteModal" data-bs-backdrop="static" >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">警告</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
             @click="close"></button>
          </div>
          
          <div class="modal-body">
            是否刪除「{{deleteContent}}」此代辦事項?
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
             @click="confirm" data-bs-dismiss="modal">確定</button>
            <button type="button" class="btn btn-secondary"
             data-bs-dismiss="modal" @click="close">取消</button>
          </div>

        </div>
      </div>
    </div>
</template>
<script>


export default {
    name: 'deletePromt',
    props: {
        deleteContent: {
            default: '',
        }
    },
    data () {
        return {}
    },
    computed: {},
    methods: {
        close () {
            this.$emit('close');
        },
        confirm () {
            this.$emit('confirm');
        }
    }
}
</script>
<style lang="sass">

</style>