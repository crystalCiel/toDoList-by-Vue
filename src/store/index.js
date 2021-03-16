import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idCount: 0,
        todoList: [
            // {
            //     id: 1,
            //     text: '1 to to list',
            //     status: false,
            // },
            // {   
            //     id: 2,
            //     text: '2 to do list',
            //     status: true,
            // },
            // {
            //     id: 3,
            //     text: '3 to to list',
            //     status: false,
            // },
            // {
            //     id: 4,
            //     text: '4 to do list',
            //     status: true,
            // }
        ],
    },
    getters: {
        completeList ({todoList}) {
            return todoList.filter((item) => {
                return item.status === true;
            })
        },
        notCompleteList ({todoList}) {
            return todoList.filter((item) => {
                return item.status === false;
            })
        },
        getListNumber ({ todoList }, { completeList }) {
            let all = todoList.length;
            let complete = completeList.length;
            let notComplete = all - complete;

            return {
                all,
                complete,
                notComplete
            }
        }
    },
    mutations: {
        addItem (state, item) {
            state.idCount += 1;
            let newObj = {
                id: state.idCount,
                text: item,
                status: false,
            }
            state.todoList.push(newObj);
        },
        changeItemStatus (state, id) {

            let position = void 0;

            state.todoList.forEach((item, itemIndex) => {
                if (item.id === id) {
                    position = itemIndex
                }
            });

            // console.log(id, position)

            state.todoList[position].status = !state.todoList[position].status;
        },
        deleteItem (state, { id, content }) {
            // state.todoList.splice(index, 1);

            let position = void 0;

            state.todoList.forEach((item, itemIndex) => {
                if (item.id === id) {
                    position = itemIndex
                }
            });

            // console.log(position);

            state.todoList.splice(position, 1);
        },
        editItem (state, { id, content }) {

            let position = void 0;

            state.todoList.forEach((item, itemIndex) => {
                if (item.id === id) {
                    position = itemIndex
                }
            });

            state.todoList[position].text = content;
        }
    },
    actions: {},
    // modules: {},
    // plugins: []
});