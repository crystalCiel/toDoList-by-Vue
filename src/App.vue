<template>
  <div id="app" class="container border rounded my-3">

    <div class="input-group mt-3 mb-1">
      <input type="text" class="form-control" :class="inputError ? 'borderColor-red' : ''" placeholder="新增代辦事項" 
        v-model="currentInput" @keyup.enter="addNewItem" @focus="inputErrorShow(false)">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2"
        @click="addNewItem">新增</button>
    </div>

    <p v-show="inputError" class="text-danger" style="font-size: 0.6rem">*未輸入代辦事項</p>

    <div class="d-flex justify-content-around my-3">
      <button type="button" class="btn btn-outline-primary" @click="changeListType('all')">全部 {{getListNumber.all}}</button>
      <button type="button" class="btn btn-outline-primary" @click="changeListType('complete')">完成 {{getListNumber.complete}}</button>
      <button type="button" class="btn btn-outline-primary" @click="changeListType('notComplete')">未完成 {{getListNumber.notComplete}}</button>
    </div>

    <div v-for="(item, index) in todoList" :key="`item_${index}`"
      class="my-3">

      <div v-show="showListType(item.status)" v-if="editInfo.index !== index">
        <input class="form-check-input me-2" type="checkbox" :id="`flexCheckDefault_${index}`"
          :checked="item.status" @click="changeItemStatus(item.id)">
        <label class="form-check-label" :for="`flexCheckDefault_${index}`"
          :class="item.status ? 'text-decoration-line-through' : ''">
          {{ item.text }}
        </label>

        <button type="button" class="btn btn-outline-secondary btn-sm ms-2"
         @click="recodeEditInfo(index, item.id)">編輯</button>
        <button type="button" class="btn btn-outline-danger btn-sm ms-1" 
          data-bs-toggle="modal" data-bs-target="#deleteModal"
          @click="recodeDeleteInfo(index, item.id)">刪除</button>
      </div>

      
      <div v-else class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="basic-addon1">{{index + 1}}.</span>
        <input type="text" class="form-control" placeholder="刪除此代辦事項"
         v-model="editInfo.content" @keyup.enter="confirmEdit(false)" @blur="confirmEdit(false)">

        <button type="button" class="btn btn-outline-secondary btn-sm ms-2" 
          @click="confirmEdit()">編輯完成</button>
        <button type="button" class="btn btn-outline-danger btn-sm ms-1" @click="deleteItem({id: item.id})">刪除</button>
      </div>

    </div>

    <div class="modal " id="deleteModal" data-bs-backdrop="static" >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">警告</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
             @click="reset('deleteInfo')"></button>
          </div>
          
          <div class="modal-body">
            是否刪除「{{deleteInfo.content}}」此代辦事項?
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"
             @click="confirmDelete" data-bs-dismiss="modal">確定</button>
            <button type="button" class="btn btn-secondary"
             data-bs-dismiss="modal" @click="reset('deleteInfo')">取消</button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import vuex from 'vuex';

export default {
  name: 'App',
  components: {},
  data () {
    return {
      currentInput: '',
      inputError: false,
      editInfo: {
        id: -1,
        index: -1,
        content: '',
      },
      deleteInfo: {
        id: -1,
        index: -1,
        content: '',
      },
      listType: 'all', // all、complete、notComplete
    }
  },
  watch: {
    currentInput () {
      this.inputErrorShow(false);
    },
  },
  computed: {
    ...vuex.mapState([
      'todoList'
    ]),
    ...vuex.mapGetters([
      'getListNumber',
      'completeList',
      'notCompleteList'
    ]),
    list () {
      let list = void 0;

      switch (this.listType) {
        case 'complete': 
          list = this.completeList;
          break;
        
        case 'notComplete':
          list = this.notCompleteList;
          break;

        default:
          list = this.todoList;
          break;
      }

      return list;
    }
  },
  methods: {
    ...vuex.mapMutations([
      'addItem',
      'changeItemStatus',
      'deleteItem',
      'editItem'
    ]),
    showListType (itemBoolean) {
      let type = this.listType;
      if (type === 'all') {
        return true;
      } else if (type === 'complete') {
        return itemBoolean === true;
      } else  {
        return itemBoolean === false;
      }
    },
    addNewItem () {
      let currentInput = this.currentInput;

      if (currentInput === '') {
        this.inputErrorShow(true);
      } else {
        this.addItem(currentInput);
        this.currentInput = '';
      }
    },
    inputErrorShow (force) {
      let visible = typeof force === 'boolean' ? force : !this.inputError;

      this.inputError = visible;
    },
    recodeDeleteInfo (index, id) {
      this.deleteInfo.id = this.todoList[index].id,
      this.deleteInfo.index = index;
      this.deleteInfo.content = this.todoList[index].text;
    },
    confirmDelete () {
      let {id, content} = this.deleteInfo;
      this.deleteItem({id, content});

      this.reset('deleteInfo');
    },
    recodeEditInfo (index, id) {
      this.editInfo.id = this.todoList[index].id,
      this.editInfo.index = index;
      this.editInfo.content = this.todoList[index].text;
    },
    confirmEdit (initValue = true) {
      let {index, id, content} = this.editInfo;

      // console.log(index, id, content);

      if (content.length < 0 && initValue || content.length === 0 && index >= 0) {
        this.deleteItem({id, content});
      } else if (index >= 0 ) {
        this.editItem({id, content});
      }
       
      this.reset('editInfo');
    },
    reset (name) {
      this[name].id = -1,
      this[name].index = -1;
      this[name].content = '';
    },
    changeListType (typeName) {
      this.listType = typeName;

      this.reset('editInfo');
      this.reset('deleteInfo');
    },
  },

}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';  

body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 200vh;
}

.borderColor-red {
  border-color: red;
}


</style>
