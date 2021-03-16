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
      <button v-for="(btn, index) in listTypeButton" :key="`${index}_${btn.typeName}`"
        type="button" class="btn btn-outline-primary" @click="changeListType(btn.typeName)">
        {{btn.text}} {{getListNumber[btn.typeName]}}
      </button>
    </div>

    <listItem v-for="(item, index) in todoList" :key="`item_${index}`"
      :index="index"
      :text="item.text"
      :itemStatus="item.status"
      :editContent="editInfo.content"
      :visible="showListType(item.status)"
      :canEdit="editInfo.index !== index"
      @recodeEditInfo="recodeEditInfo(index, item.id)"
      @recodeDeleteInfo="recodeDeleteInfo(index, item.id)"
      @changeItemStatus="changeItemStatus(item.id)"
      @handleEditValue="handleEditValue"
      @confirmEdit="confirmEdit"
      @deleteListItem="deleteItem({id: item.id})" />

    <deletePromt 
      :deleteContent="deleteInfo.content"
      @confirm="confirmDelete"
      @close="reset('deleteInfo')"/>
  </div>
</template>

<script>
import vuex from 'vuex';
import deletePromt from './components/deletePromt.vue';
import listItem from './components/listItem.vue';

export default {
  name: 'App',
  components: {
    deletePromt,
    listItem,
  },
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
      listTypeButton: [
        {
          typeName: 'all',
          text: '全部'
        },
        {
          typeName: 'complete',
          text: '完成'
        },
        {
          typeName: 'notComplete',
          text: '未完成'
        }
      ]
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
    handleEditValue (value) {
      this.editInfo.content = value;
    }
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
  height: 100vh;
}

.borderColor-red {
  border-color: red;
}


</style>
