<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Add New Post</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" class="pa-5" enctype="multipart/form-data" @submit.prevent="submitForm">
            <v-text-field label="Title" prepend-icon="mdi-note" :rules="rules" v-model="post.title"></v-text-field>
            <v-text-field label="Category" prepend-icon="mdi-view-list" :rules="rules" v-model="post.category"></v-text-field>
            <v-textarea label="Description" prepend-icon="mdi-note-plus" :rules="rules" v-model="post.description"></v-textarea>
            <v-file-input label="Select an Image" :rules="rules" show-size counter multiple @change="selectFile"></v-file-input>
            <v-btn type="submit" class="mt-3" color="primary">Add Post</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import API from "../api";

  export default {
    data() {
      return {
        rules: [(value) => !!value || "This field is required!"],
        post: { title: "", category: "", description: "", image: "" },
        image: "",
      };
    },
    methods: {
      selectFile(file) {
        this.image = file[0];
      },
      async submitForm() {
        const formData = new FormData();

        formData.append("image", this.image);
        formData.append("title", this.post.title);
        formData.append("category", this.post.category);
        formData.append("description", this.post.description);
        if (this.$refs.form.validate()) {
          const response = await API.addPost(formData);

          this.$router.push({ name: "home", params: { message: response.message } });
        }
      },
    },
  };
</script>
