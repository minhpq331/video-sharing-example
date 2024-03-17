<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <img
            src="https://nuxt.com/assets/design-kit/icon-black.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          Funny Youtube
        </a>

        <!-- Login/Register Button -->

        <div v-if="$auth.loggedIn" class="ml-2">
          <span class="navbar-text mr-2">
            Welcome, {{ $auth.user?.email }}
          </span>
          <button class="btn btn-primary mr-2" @click="openShareModal">
            Share a Video
          </button>
          <button class="btn btn-secondary" @click="logout">Logout</button>
        </div>
        <div v-else class="ml-2">
          <button class="btn btn-primary ml-auto" @click="openModal">
            Login/Register
          </button>
        </div>
      </div>
    </nav>

    <!-- Login/Register Modal -->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      :class="{ 'd-block': showModal }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Login/Register</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- Modal Body (Your Login/Register Form Goes Here) -->
          <div class="modal-body">
            <!-- Example Form -->
            <form>
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <!-- Buttons for Register and Login -->
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-success mr-2"
                  @click="register"
                >
                  Register
                </button>
                <button type="button" class="btn btn-primary" @click="login">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      :class="{ 'd-block': showShareModal }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Share Video</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeShareModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="url">YouTube URL</label>
              <input type="text" class="form-control" id="url" v-model="url" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="shareVideo">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Shared Videos List -->
    <div class="container mt-4">
      <div v-for="(video, index) in videoList" :key="index" class="row mb-3">
        <!-- Left 1/3 width on desktop, full width on mobile: YouTube Player -->
        <div class="col-md-5 col-12 mb-md-0 mb-3">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              :src="video.embed_url"
              :title="video.title"
              class="embed-responsive-item"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <!-- Right 2/3 width on desktop, full width on mobile: Video Details -->
        <div class="col-md-7 col-12">
          <!-- Title -->
          <h3 class="font-weight-bold">
            <a :href="video.url" target="_blank">{{ video.title }}</a>
          </h3>
          <!-- Shared by Author -->
          <div>
            Shared by
            <span class="font-weight-bold">{{ video.author.email }}</span>
          </div>
          <!-- Description -->
          <div
            class="description-wrapper"
            :class="{ expanded: video.showMore }"
          >
            <p class="description-text">
              {{ video.description }}
            </p>
            <button class="view-more-btn" @click="toggleDescription(index)">
              {{ video.showMore ? 'View Less' : 'View More' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NuxtSocket } from 'nuxt-socket-io'
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/videos')
    return { videoList: data }
  },
  data() {
    return {
      showModal: false,
      showShareModal: false,
      url: '',
      email: '',
      password: '',
      videoList: [],
      socket: undefined as any as NuxtSocket,
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      transports: ['websocket'],
    })
    /* Listen for events: */
    this.socket.on('video.shared', (msg, cb) => {
      // show notification and add the new video to the list
      if (msg.data?.author_id !== this.$auth.user?.id) {
        this.$toast.success(
          `User ${msg.data?.author?.email} has just shared a video: ${msg.data?.title}`,
          { duration: 5000, position: 'top-right' }
        )
      }
      this.videoList.unshift(msg.data)
    })
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    openShareModal() {
      this.showShareModal = true
    },
    closeShareModal() {
      this.showShareModal = false
    },
    async register() {
      try {
        await this.$auth.loginWith('local', {
          url: '/auth/register',
          data: {
            email: this.email,
            password: this.password,
          },
        })
        // display a toast message and close the modal
        this.$toast.success('Register successful!', { duration: 3000 })
        this.showModal = false
      } catch (error) {
        // display a toast message
        this.$toast.error('Register failed!', { duration: 3000 })
      }
    },
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        // display a toast message and close the modal
        this.$toast.success('Login successful!', { duration: 3000 })
        this.showModal = false
      } catch (error) {
        // display a toast message
        this.$toast.error('Login failed!', { duration: 3000 })
      }
    },
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Logout successful!', { duration: 3000 })
      window.location.reload()
    },
    async shareVideo() {
      try {
        await this.$axios.post('/videos', {
          url: this.url,
        })
        this.$toast.success('Video shared!', { duration: 3000 })
        this.showShareModal = false
      } catch (error) {
        this.$toast.error('Failed to share video!', { duration: 3000 })
      }
    },
    toggleDescription(index: number) {
      this.$set(
        this.videoList[index],
        'showMore',
        !this.videoList[index].showMore
      )
    },
  },
})
</script>

<style scoped>
.description-wrapper {
  max-height: 150px; /* Adjust this value as needed */
  overflow: hidden;
  position: relative;
}

.description-text {
  white-space: pre-line;
}

.view-more-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /* Set height to 50px */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 70%
  );
  color: #007bff;
  /* -webkit-background-clip: text; */
  /* background-clip: text; */
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.view-more-btn:focus,
.view-more-btn:hover {
  text-decoration: underline;
}

.expanded {
  max-height: none !important;

  .view-more-btn {
    background: none;
  }
}
</style>
