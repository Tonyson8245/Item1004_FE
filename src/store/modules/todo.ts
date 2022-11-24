import { defineStore } from "pinia";
import type { TodoItem } from "../index.interface";

export const useStoreTodo = defineStore("todo", {
  state: () => ({
    todoList: [] as TodoItem[],
  }),
  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    // 액션 동작 예시
    addTodoItem(item: TodoItem) {
      this.todoList.push(item);
    },
    removeTodoItem(id: number) {
      this.todoList.splice(id, 1);
    },
    changedStatus({
      id,
      status,
    }: {
      id: TodoItem["id"];
      status: TodoItem["status"];
    }) {
      this.todoList[id].status = status;
    },
  },
});
