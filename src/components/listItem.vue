<template>
    <div class="my-3">
      <div v-show="visible" v-if="canEdit">
        <input class="form-check-input me-2" type="checkbox" :id="`flexCheckDefault_${index}`"
          :checked="itemStatus" @click="changeItemStatus">
        <label class="form-check-label col-lg-8 text-break" :for="`flexCheckDefault_${index}`"
          :class="itemStatus ? 'text-decoration-line-through' : ''">
          {{ text }}
        </label>

        <button type="button" class="btn btn-outline-secondary btn-sm ms-2"
         @click="$emit('recodeEditInfo')">編輯</button>
        <button type="button" class="btn btn-outline-danger btn-sm ms-1" 
          data-bs-toggle="modal" data-bs-target="#deleteModal"
          @click="$emit('recodeDeleteInfo')">刪除</button>
      </div>

      
      <div v-else class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" placeholder="刪除此代辦事項"
         :value="editContent" @input="$emit('handleEditValue', $event.target.value)"
         @keyup.enter="confirmEditItem(false)" @blur="confirmEditItem(false)">

        <button type="button" class="btn btn-outline-secondary btn-sm ms-2" 
          @click="confirmEditItem(true)">編輯完成</button>
        <button type="button" class="btn btn-outline-danger btn-sm ms-1" @click="deleteListItem({id: item.id})">刪除</button>
      </div>

    </div>
</template>
<script>

export default {
    name: 'listItem',
    props: {
        index: {
            default: 0
        },
        itemStatus: {
            default: true,
        },
        editContent: {
            defalut: ''
        },
        text: {
            default: ''
        },
        visible: {
            default: true,
        },
        canEdit: {
            defalut: false,
        }
    },
    data () {
        return {}
    },
    computed: {},
    methods: {
        deleteListItem () {
            this.$emit('deleteListItem');
        },
        confirmEditItem (boolean) {
            this.$emit('confirmEdit', boolean);
        },
        changeItemStatus () {
            this.$emit('changeItemStatus');
        }
    }
}
</script>
<style lang="sass">

</style>