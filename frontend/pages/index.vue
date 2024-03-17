<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <img src="/logo.png" alt="Logo" height="30" />
        </a>

        <!-- Login/Register Button -->
        <button class="btn btn-primary ml-auto" @click="openModal">
          Login/Register
        </button>
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

    <!-- Shared Videos List -->
    <div class="container mt-4">
      <h2>Shared Videos</h2>
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
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      showModal: false,
      videoList: [
        {
          id: '65f57ac888a595d62f51e9c2',
          title:
            'CHƯA QUÊN NGƯỜI YÊU CŨ | HÀ NHI X HỨA KIM TUYỀN | OFFICIAL MUSIC VIDEO',
          description:
            'Bài hát: Chưa Quên Người Yêu Cũ | Hà Nhi x \nCHƯA QUÊN NGƯỜI YÊU CŨ - HÀ NHI OFFICIAL MV \n\nSáng tác : Hứa Kim Tuyền\nPhối khí : Lê hữu minh \nMix master : Bố Thỏ Heo \nRecording : Phạm Nguyên Studio \nManager : Tiến Trương \nMUA : Dương Hữu Nghĩa \nHair : Hương Đào \nstylist : Bin Nguyễn \nAssistant : Nguyễn Thiện Nhân , Cá Sấu \nCamera Op : Trương Hồ Quang Huy \nThiết kế : Anh Vương \nLighting : Nhàn Nguyễn \nEquipment : BLL media \n\n\n\nTheo dõi Nhi qua những kênh mạng xã hội dưới đây nhé: \n► Facebook: https://www.facebook.com/xu.milo\n► Fanpage: https://www.facebook.com/HaNhiOfficial/\n► Instagram: https://www.instagram.com/hanhiidol/?hl=vi\n► Youtube: http://popsww.com/hanhi\n\nMọi liên hệ về BOOKING mọi người vui lòng liên lạc theo số điện thoại và địa chỉ dưới đây:\n📷• Business & Show Bookings: Mr. Tio : 0866777868\n📷• Email: ongmatproduction@gmail.com  \nTHANKSSSS!\n\n#hanhi \n#huakimtuyen\n#chuaquennguoiyeucu\n#official \n#mv',
          url: 'https://www.youtube.com/watch?v=8Q4_O4A2Ux4',
          embed_url: 'https://www.youtube.com/embed/8Q4_O4A2Ux4',
          thumbnail:
            'https://i.ytimg.com/vi/8Q4_O4A2Ux4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBf5h0LTHO-lqfLPiT6PtoF27wmaQ',
          created_at: '2024-03-16T10:56:08.742Z',
          author_id: '65f54f66acd8da07bc46dc2c',
          author: {
            id: '65f54f66acd8da07bc46dc2c',
            email: 'test@example.com',
          },
          showMore: undefined,
        },
        {
          id: '65f57aa788a595d62f51e9bf',
          title:
            'CHƯA QUÊN NGƯỜI YÊU CŨ | HÀ NHI X HỨA KIM TUYỀN | OFFICIAL MUSIC VIDEO',
          description:
            'Bài hát: Chưa Quên Người Yêu Cũ | Hà Nhi x \nCHƯA QUÊN NGƯỜI YÊU CŨ - HÀ NHI OFFICIAL MV \n\nSáng tác : Hứa Kim Tuyền\nPhối khí : Lê hữu minh \nMix master : Bố Thỏ Heo \nRecording : Phạm Nguyên Studio \nManager : Tiến Trương \nMUA : Dương Hữu Nghĩa \nHair : Hương Đào \nstylist : Bin Nguyễn \nAssistant : Nguyễn Thiện Nhân , Cá Sấu \nCamera Op : Trương Hồ Quang Huy \nThiết kế : Anh Vương \nLighting : Nhàn Nguyễn \nEquipment : BLL media \n\n\n\nTheo dõi Nhi qua những kênh mạng xã hội dưới đây nhé: \n► Facebook: https://www.facebook.com/xu.milo\n► Fanpage: https://www.facebook.com/HaNhiOfficial/\n► Instagram: https://www.instagram.com/hanhiidol/?hl=vi\n► Youtube: http://popsww.com/hanhi\n\nMọi liên hệ về BOOKING mọi người vui lòng liên lạc theo số điện thoại và địa chỉ dưới đây:\n📷• Business & Show Bookings: Mr. Tio : 0866777868\n📷• Email: ongmatproduction@gmail.com  \nTHANKSSSS!\n\n#hanhi \n#huakimtuyen\n#chuaquennguoiyeucu\n#official \n#mv',
          url: 'https://www.youtube.com/watch?v=8Q4_O4A2Ux4',
          embed_url: 'https://www.youtube.com/embed/8Q4_O4A2Ux4',
          thumbnail:
            'https://i.ytimg.com/vi/8Q4_O4A2Ux4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBf5h0LTHO-lqfLPiT6PtoF27wmaQ',
          created_at: '2024-03-16T10:55:35.560Z',
          author_id: '65f54f66acd8da07bc46dc2c',
          author: {
            id: '65f54f66acd8da07bc46dc2c',
            email: 'test@example.com',
          },
          showMore: undefined,
        },
        {
          id: '65f5797188a595d62f51e9bb',
          title:
            'CHƯA QUÊN NGƯỜI YÊU CŨ | HÀ NHI X HỨA KIM TUYỀN | OFFICIAL MUSIC VIDEO',
          description:
            'Bài hát: Chưa Quên Người Yêu Cũ | Hà Nhi x \nCHƯA QUÊN NGƯỜI YÊU CŨ - HÀ NHI OFFICIAL MV \n\nSáng tác : Hứa Kim Tuyền\nPhối khí : Lê hữu minh \nMix master : Bố Thỏ Heo \nRecording : Phạm Nguyên Studio \nManager : Tiến Trương \nMUA : Dương Hữu Nghĩa \nHair : Hương Đào \nstylist : Bin Nguyễn \nAssistant : Nguyễn Thiện Nhân , Cá Sấu \nCamera Op : Trương Hồ Quang Huy \nThiết kế : Anh Vương \nLighting : Nhàn Nguyễn \nEquipment : BLL media \n\n\n\nTheo dõi Nhi qua những kênh mạng xã hội dưới đây nhé: \n► Facebook: https://www.facebook.com/xu.milo\n► Fanpage: https://www.facebook.com/HaNhiOfficial/\n► Instagram: https://www.instagram.com/hanhiidol/?hl=vi\n► Youtube: http://popsww.com/hanhi\n\nMọi liên hệ về BOOKING mọi người vui lòng liên lạc theo số điện thoại và địa chỉ dưới đây:\n📷• Business & Show Bookings: Mr. Tio : 0866777868\n📷• Email: ongmatproduction@gmail.com  \nTHANKSSSS!\n\n#hanhi \n#huakimtuyen\n#chuaquennguoiyeucu\n#official \n#mv',
          url: 'https://www.youtube.com/watch?v=8Q4_O4A2Ux4',
          embed_url: 'https://www.youtube.com/embed/8Q4_O4A2Ux4',
          thumbnail:
            'https://i.ytimg.com/vi/8Q4_O4A2Ux4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBf5h0LTHO-lqfLPiT6PtoF27wmaQ',
          created_at: '2024-03-16T10:50:25.881Z',
          author_id: '65f54f66acd8da07bc46dc2c',
          author: {
            id: '65f54f66acd8da07bc46dc2c',
            email: 'test@example.com',
          },
          showMore: undefined,
        },
        {
          id: '65f57923538a424a508ddcb8',
          title:
            'CHƯA QUÊN NGƯỜI YÊU CŨ | HÀ NHI X HỨA KIM TUYỀN | OFFICIAL MUSIC VIDEO',
          description:
            'Bài hát: Chưa Quên Người Yêu Cũ | Hà Nhi x \nCHƯA QUÊN NGƯỜI YÊU CŨ - HÀ NHI OFFICIAL MV \n\nSáng tác : Hứa Kim Tuyền\nPhối khí : Lê hữu minh \nMix master : Bố Thỏ Heo \nRecording : Phạm Nguyên Studio \nManager : Tiến Trương \nMUA : Dương Hữu Nghĩa \nHair : Hương Đào \nstylist : Bin Nguyễn \nAssistant : Nguyễn Thiện Nhân , Cá Sấu \nCamera Op : Trương Hồ Quang Huy \nThiết kế : Anh Vương \nLighting : Nhàn Nguyễn \nEquipment : BLL media \n\n\n\nTheo dõi Nhi qua những kênh mạng xã hội dưới đây nhé: \n► Facebook: https://www.facebook.com/xu.milo\n► Fanpage: https://www.facebook.com/HaNhiOfficial/\n► Instagram: https://www.instagram.com/hanhiidol/?hl=vi\n► Youtube: http://popsww.com/hanhi\n\nMọi liên hệ về BOOKING mọi người vui lòng liên lạc theo số điện thoại và địa chỉ dưới đây:\n📷• Business & Show Bookings: Mr. Tio : 0866777868\n📷• Email: ongmatproduction@gmail.com  \nTHANKSSSS!\n\n#hanhi \n#huakimtuyen\n#chuaquennguoiyeucu\n#official \n#mv',
          url: 'https://www.youtube.com/watch?v=8Q4_O4A2Ux4',
          embed_url: 'https://www.youtube.com/embed/8Q4_O4A2Ux4',
          thumbnail:
            'https://i.ytimg.com/vi/8Q4_O4A2Ux4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBf5h0LTHO-lqfLPiT6PtoF27wmaQ',
          created_at: '2024-03-16T10:49:07.088Z',
          author_id: '65f54f66acd8da07bc46dc2c',
          author: {
            id: '65f54f66acd8da07bc46dc2c',
            email: 'test@example.com',
          },
          showMore: undefined,
        },
        {
          id: '65f578c1466b4ffc1457978b',
          title:
            'CHƯA QUÊN NGƯỜI YÊU CŨ | HÀ NHI X HỨA KIM TUYỀN | OFFICIAL MUSIC VIDEO',
          description:
            'Bài hát: Chưa Quên Người Yêu Cũ | Hà Nhi x \nCHƯA QUÊN NGƯỜI YÊU CŨ - HÀ NHI OFFICIAL MV \n\nSáng tác : Hứa Kim Tuyền\nPhối khí : Lê hữu minh \nMix master : Bố Thỏ Heo \nRecording : Phạm Nguyên Studio \nManager : Tiến Trương \nMUA : Dương Hữu Nghĩa \nHair : Hương Đào \nstylist : Bin Nguyễn \nAssistant : Nguyễn Thiện Nhân , Cá Sấu \nCamera Op : Trương Hồ Quang Huy \nThiết kế : Anh Vương \nLighting : Nhàn Nguyễn \nEquipment : BLL media \n\n\n\nTheo dõi Nhi qua những kênh mạng xã hội dưới đây nhé: \n► Facebook: https://www.facebook.com/xu.milo\n► Fanpage: https://www.facebook.com/HaNhiOfficial/\n► Instagram: https://www.instagram.com/hanhiidol/?hl=vi\n► Youtube: http://popsww.com/hanhi\n\nMọi liên hệ về BOOKING mọi người vui lòng liên lạc theo số điện thoại và địa chỉ dưới đây:\n📷• Business & Show Bookings: Mr. Tio : 0866777868\n📷• Email: ongmatproduction@gmail.com  \nTHANKSSSS!\n\n#hanhi \n#huakimtuyen\n#chuaquennguoiyeucu\n#official \n#mv',
          url: 'https://www.youtube.com/watch?v=8Q4_O4A2Ux4',
          embed_url: 'https://www.youtube.com/embed/8Q4_O4A2Ux4',
          thumbnail:
            'https://i.ytimg.com/vi/8Q4_O4A2Ux4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBf5h0LTHO-lqfLPiT6PtoF27wmaQ',
          created_at: '2024-03-16T10:47:29.495Z',
          author_id: '65f54f66acd8da07bc46dc2c',
          author: {
            id: '65f54f66acd8da07bc46dc2c',
            email: 'test@example.com',
          },
          showMore: undefined,
        },
      ],
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    register() {
      // Make API call to register endpoint (/auth/register)
      // Example using Axios:
      // axios.post('/auth/register', { email: this.email, password: this.password })
      //   .then(response => {
      //     // Handle success
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });
      console.log('Register button clicked')
    },
    login() {
      // Make API call to login endpoint (/auth/login)
      // Example using Axios:
      // axios.post('/auth/login', { email: this.email, password: this.password })
      //   .then(response => {
      //     // Handle success
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });
      console.log('Login button clicked')
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
    rgba(255, 255, 255, 1) 100%
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
  align-items: center;
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
