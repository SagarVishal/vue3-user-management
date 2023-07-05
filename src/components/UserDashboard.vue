<script>
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";

export default {
  name: "UserDashboard",
  setup() {
    const form = ref({
      id: null,
      username: "",
      email: "",
      role: "",
      firstName: "",
      lastName: "",
    });
    let data = reactive([
      {
        id: 1120,
        username: "test",
        email: "test@gmail.com",
        role: "testing",
        firstName: "john",
        lastName: "doe",
      },
      {
        id: 1121,
        username: "cj",
        email: "cena@gmail.com",
        role: "wrestling",
        firstName: "john",
        lastName: "cena",
      },
      {
        id: 1122,
        username: "carryM",
        email: "carry@gmail.com",
        role: "youtuber",
        firstName: "carry",
        lastName: "minaty",
      },
      {
        id: 1123,
        username: "mj",
        email: "mark@gmail.com",
        role: "ceo",
        firstName: "mark",
        lastName: "zuzu",
      },
    ]);
    const editMode = ref(false);
    const searchMode = ref(false);
    const toast = useToast();

    function resetForm() {
      form.value = {
        id: null,
        username: "",
        email: "",
        role: "",
        firstName: "",
        lastName: "",
      };
    }

    function addUser() {
      form.value.id = Math.floor(1000 + Math.random() * 9000).toString();
      data.unshift(form.value);
      toast.success("User added successfully.");
      resetForm();
    }

    function editUser() {
      deleteUser(form.value.id);
      data.unshift(form.value);
      toast.success("User edited successfully.");
      resetForm();
      editMode.value = false;
    }

    function deleteUser(id) {
      data.filter((user, index) => {
        if (user.id === id) {
          data.splice(index, 1);
        }
      });

      if (!editMode.value) toast.error("User deleted successfully.");
    }

    function onSubmit() {
      editMode.value ? editUser() : addUser();
    }

    function onAction(type, user) {
      if (searchMode.value) onSearch();

      if (type === "edit") {
        editMode.value = true;
        form.value = Object.assign({}, user);
      } else {
        deleteUser(user.id);
      }
    }

    function onSearch() {
      searchMode.value = !searchMode.value;
      if (!searchMode.value) {
        resetForm();
      }
    }

    function checkFormValue() {
      if (
        form.value.username ||
        form.value.email ||
        form.value.role ||
        form.value.firstName ||
        form.value.lastName
      )
        return true;
      else return false;
    }

    const userList = computed(() => {
      if (searchMode.value && checkFormValue()) {
        return data.filter(
          (user) =>
            user.username == form.value.username ||
            user.email == form.value.email ||
            user.role == form.value.role ||
            user.firstName == form.value.firstName ||
            user.lastName == form.value.lastName
        );
      }

      return data;
    });

    return {
      editMode,
      form,
      onAction,
      onSearch,
      onSubmit,
      searchMode,
      userList,
    };
  },
};
</script>

<template>
  <nav class="navbar bg-light">
    <div class="container-fluid justify-content-center">
      <h3>User Management Deployed on Netlify</h3>
    </div>
  </nav>
  <div class="container w-50 bg-light mt-3">
    <form class="p-5" @submit.prevent="onSubmit()">
      <div class="row g-5 d-flex align-items-center">
        <div class="col-4">
          <label for="Username" class="visually-hidden">Username</label>
          <input
            type="text"
            class="form-control"
            id="Username"
            required
            v-model="form.username"
            placeholder="Username"
          />
        </div>
        <div class="col-4">
          <label for="Email" class="visually-hidden">Email</label>
          <input
            type="email"
            class="form-control"
            id="Email"
            required
            v-model="form.email"
            placeholder="Email"
          />
        </div>
        <div class="col-4">
          <label for="Role" class="visually-hidden">Role</label>
          <input
            type="text"
            class="form-control"
            id="Role"
            v-model="form.role"
            placeholder="Role"
          />
        </div>
      </div>
      <div class="row g-5 d-flex align-items-center pt-3">
        <div class="col-4">
          <label for="FirstName" class="visually-hidden">First Name</label>
          <input
            type="text"
            class="form-control"
            id="FirstName"
            v-model="form.firstName"
            placeholder="First Name"
          />
        </div>
        <div class="col-4">
          <label for="Last Name" class="visually-hidden">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="LastName"
            v-model="form.lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div
        class="row g-5 d-flex align-items-center justify-content-center pt-5"
      >
        <button
          type="submit"
          :class="[
            searchMode ? 'invisible' : 'visible',
            'btn btn-primary col-3',
          ]"
        >
          {{ editMode ? "Edit User" : "Add User" }}
        </button>
      </div>
    </form>
  </div>

  <div v-if="!editMode" class="container w-50 bg-light mt-3 p-1">
    <div class="card">
      <div
        class="card-header h5 d-flex justify-content-between align-items-center"
      >
        <div>User List</div>
        <div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="onSearch('search')"
          >
            {{ searchMode ? "Clear Search" : "Search" }}
          </button>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="userList.length">
            <tr v-for="(user, index) in userList" :key="index">
              <th class="align-middle" scope="row">{{ index + 1 }}</th>
              <td class="align-middle">{{ user.username }}</td>
              <td class="align-middle">
                {{ user.firstName + " " + user.lastName }}
              </td>
              <td class="align-middle">{{ user.email }}</td>
              <td class="align-middle">{{ user.role }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  @click="onAction('edit', user)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm ms-2"
                  @click="onAction('delete', user)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center">--- No Users ---</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
