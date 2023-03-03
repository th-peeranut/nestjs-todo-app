<template>
    <div id='app'>
        <div class="createNewTask">
            <span>
                <input type="text" class="inputTask" v-model="newTaskName" />
                <button type="button" class="buttonAdd" v-on:click="onCreateNewTask">
                    Create new task
                </button>
            </span>
        </div>

        <div class="taskTable">
            <table>
                <tr v-for="task in tasks" v-bind:key="task.id">
                    <td>
                        <input type="checkbox" v-model="task.is_complete" v-on:click="() => onToggleTaskStatus(task.id)">
                    </td>
                    <td>
                        <input v-model="task.name" 
                            style="border: none;" 
                            v-bind:style="task.is_complete && { textDecoration: 'line-through' }" 
                            @change="() => onEditTask(task)"
                        />
                    </td>
                    <td>
                        <button type="button" class="buttonDelete" v-on:click="() => onDeleteTask(task.id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </table>
        </div>

        <button type="button" v-on:click="saveFile()">Export</button>
    </div>
</template>
  
<script>
import { server } from "../helper";
import axios from "axios";

export default {
    name: 'App',
    data() {
        return {
            newTaskName: '',
            tasks: []
        };
    },
    created() {
        this.onFetchData();
    },
    methods: {
        onFetchData() {
            axios
                .get(`${server.baseURL}/tasks`)
                .then(data => (this.tasks = data.data));
        },

        onCreateNewTask() {
            const newTask = {
                name: this.newTaskName
            };

            axios.post(`${server.baseURL}/tasks/create`, newTask)
                .then(data => (this.tasks = data.data));

            this.newTaskName = '';
        },

        onEditTask(task) {
            axios.put(`${server.baseURL}/tasks/update/${task.id}`, task)
                .then(data => (this.tasks = data.data));
        },

        onDeleteTask(id) {
            axios.delete(`${server.baseURL}/tasks/delete/${id}`)
                .then(data => (this.tasks = data.data));
        },

        onToggleTaskStatus(id) {
            axios.put(`${server.baseURL}/tasks/toggle/${id}`)
                .then(data => (this.tasks = data.data));
        },

        saveFile() {
            axios.get(`${server.baseURL}/tasks/`, { responseType: 'blob' })
                .then(response => {
                    const blob = new Blob([response.data], { type: 'application/txt' })
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = "export-todolist"
                    link.click();
                    URL.revokeObjectURL(link.href)
                }).catch(console.error);
        }
    },
};
</script>
  
<style>
#app {
    text-align: center;
}

.creatNewTask {
    margin-bottom: 10px;
}

.creatNewTask .inputTask {
    width: 300px;
    height: 28px;
}

.creatNewTask .buttonAdd {
    height: 28px;
    margin-left: 10px;
}

.taskTable table {
    background-color: white;
    margin: 0px auto;
    width: 420px;
}

.taskTable p {
    text-align: left;
}

</style>