<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>

    <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <template v-for="(user, i) in users" :key="i">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ user.id }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label >{{ user.name }}</q-item-label>
            <q-item-label caption lines="1">{{ user.email }}</q-item-label>
          </q-item-section>


          <q-item-section side>
            <!-- <q-icon name="chat_bubble" color="green" /> -->
             {{ user.age }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
  </q-page>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import useCrudsAPIClient from 'src/composables/useCrudsAPIClient';

// (async () => {
//   const users =  useCrudsAPIClient();

//   console.log(users);

// })()

const users = ref<{ id: number; name: string; age: number; email: string; }[]>([]);
const apiClient = useCrudsAPIClient();

void (async () => {
  try {
    // Replace with your actual tRPC procedure call
    const userData = await apiClient.userList.query();
    // users.value = userData;
    console.log(userData);
    users.value = userData;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }

})();

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
