<template>
  <div class="chatbox">
    <div class="chatbox__button">
      <button @click="toggleChatbox">
        <img src="@/assets/chatbox-icon.svg" alt="Chat" />
      </button>
    </div>
    <div
      v-if="isChatboxOpen"
      class="chatbox__support"
      :class="{ 'chatbox--active': isChatboxOpen }"
    >
      <div>
        <h1>Chatbot</h1>
        <button class="close-button" @click="closeChatbox">x</button>
      </div>

      <!-- Chat messages container -->
      <div class="chatbox__messages">
        <div id="popup" v-if="options2" v-show="options2" style="display: none">
          <div id="button-container">
            <button
              class="custom-button"
              v-for="plate in licensePlates"
              :key="plate"
              @click="sendQuery(plate)"
            >
              {{ plate }}
            </button>
          </div>
        </div>
        <div id="popup" v-if="options" v-show="options" style="display: none">
          <div id="button-container">
            <button
              class="custom-button"
              @click="sendQuery('ระยะการเปลี่ยนถ่ายของน้ำมันเครื่อง')"
            >
              ระยะการเปลี่ยนถ่ายของน้ำมันเครื่อง
            </button>
            <button
              class="custom-button"
              @click="sendQuery('ระยะการเปลี่ยนถ่ายของนํ้ามันเบรค')"
            >
              ระยะการเปลี่ยนถ่ายของนํ้ามันเบรค
            </button>
            <button
              class="custom-button"
              @click="sendQuery('ระยะการเปลี่ยนถ่ายของนํ้ามันเกียร์')"
            >
              ระยะการเปลี่ยนถ่ายของนํ้ามันเกียร์
            </button>
            <button
              class="custom-button"
              @click="
                sendQuery('ระยะการเปลี่ยนถ่ายของนํ้ายาหม้อนํ้าหรือนํ้าหล่อเย็น')
              "
            >
              ระยะการเปลี่ยนถ่ายของนํ้ายาหม้อนํ้าหรือนํ้าหล่อเย็น
            </button>
          </div>
        </div>
        <div id="popup" v-show="showOptions" style="display: none">
          <h3>ต้องการติดต่อสอบถามด้านไหนครับ</h3>
          <div id="button-container">
            <button
              class="custom-button"
              @click="sendQuery('ระยะการเปลี่ยนของเหลว')"
            >
              ระยะการเปลี่ยนของเหลว
            </button>
            <button
              class="custom-button"
              @click="sendQuery('สอบถามเกี่ยวกับอาการรถ')"
            >
              สอบถามเกี่ยวกับอาการรถ
            </button>

            <button
              v-if="GStore.role == 'user'"
              class="custom-button"
              @click="sendQuery('ติดตามสถานะของรถ')"
            >
              ติดตามสถานะของรถ
            </button>
          </div>
        </div>
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="getMessageClass(message)"
          class="messages__item"
        >
          {{ message.text }}
        </div>
      </div>
      <div class="chatbox__footer">
        <input
          v-model="userMessage"
          type="text"
          placeholder="Write a message..."
          @keyup.enter="sendMessage"
          ref="inputField"
        />
        <button
          class="chatbox__send--footer send__button"
          @click="sendMessage"
          ref="sendButton"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/AxiosClient'
// import GStore from "@/store"
export default {
  inject: ['GStore'],
  data() {
    return {
      isChatboxOpen: false,
      userMessage: '',
      messages: [], // เพิ่มตัวแปร messages ที่นี่
      chatHistory: [],
      showOptions: true,
      options: false,
      licensePlates: [],
      options2: false
    }
  },

  mounted() {
    this.fetchPlates()
  },
  methods: {
    fetchPlates() {
      apiClient
        .get('/get-plates')
        .then((response) => {
          this.licensePlates = response.data
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },
    sendQuery(query) {
      // const userMessage = this.userMessage.trim() // Remove leading/trailing spaces
      // if (userMessage === '') {
      //   return // Don't send empty messages
      // }

      this.showOptions = false
      this.options = false
      this.options2 = false // ปิด popup หลังจากผู้ใช้เลือก
      // this.messages.unshift({ id: this.messages.length + 1, text: query }) // เพิ่มข้อความที่เลือกไปยัง chatbox
      this.messages.unshift({ role: 'user', text: query })

      apiClient
        .post('/chatbot', { message: query }) // ส่ง query ไปยัง API
        .then((response) => {
          if (response.status === 200) {
            const data = response.data
            this.messages.unshift({ role: 'operator', text: data.message }) // Push chatbot response at the end
            this.userMessage = ''
            this.receiveMessage(data.message)
            this.receiveMessage2(data.message)
            if (
              data.message.startsWith('เหลือระยะทางอีก') ||
              data.message.startsWith('สำหรับปัญหา') ||
              // This third condition needs more clarification.
              // Assuming you have a way to get the message from GPT-4 directly here:
              data.message ===
                response['choices'][0]['message']['content'].strip()
            ) {
              this.showOptions = true
            } else {
              this.showOptions = false
            }
          }
        })
        .catch((error) => {
          console.error(error)
          if (error.response) {
            // Server responded with a status other than 200 range
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request)
          } else {
            // Something happened in setting up the request and triggered an error
            console.error('Error', error.message)
          }
        })
    },
    sendMessage() {
      const userMessage = this.userMessage.trim() // Remove leading/trailing spaces
      if (userMessage === '') {
        return // Don't send empty messages
      }

      // Push the user message at the beginning of the array
      this.messages.unshift({ role: 'user', text: userMessage })

      apiClient
        .post('/chatbot', { message: userMessage })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data
            this.messages.unshift({ role: 'operator', text: data.message }) // Push chatbot response at the end
            this.userMessage = ''
            this.receiveMessage(data.message)
          } else {
            throw new Error('Failed to send message')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    receiveMessage(message) {
      if (
        message.includes(
          'ข้อมูลอ้างอิงมาจากผลิตภัณฑ์ของ Liqui Moly, Motul ที่ใช้กับรถลูกค้าครับ'
        )
      ) {
        this.options = true
      }
    },
    receiveMessage2(message) {
      if (message.includes('กรุณาใส่หมายเลขทะเบียนรถ')) {
        this.options2 = true
      }
    },

    disableInput() {
      // Disable the input field and send button
      this.$refs.inputField.disabled = true
      this.$refs.sendButton.disabled = true
    },

    enableInput() {
      // Enable the input field and send button
      this.$refs.inputField.disabled = false
      this.$refs.sendButton.disabled = false

      // Focus on the input field again
      this.$refs.inputField.focus()
    },

    getMessageClass(message) {
      return message.role === 'user'
        ? 'messages__item messages__item--visitor'
        : 'messages__item messages__item--operator'
    },

    toggleChatbox() {
      this.isChatboxOpen = !this.isChatboxOpen
      this.showOptions = true
    },
    closeChatbox() {
      this.isChatboxOpen = false
    }
    // selectOption(option) {
    //   // Define a map of options and their corresponding messages
    //   const optionMessages = {
    //     fluid_change: 'ระยะการเปลี่ยนของเหลว...',
    //     car_issues: 'สอบถามเกี่ยวกับอาการรถ...',
    //     car_status: 'ติดตามสถานะของรถ...'
    //   }

    //   // Get the message corresponding to the selected option
    //   const message = optionMessages[option]

    //   // Add the user's message to the chat history
    //   this.messages.push({ name: 'You', message: message })

    //   // Send the selected option message instead of userMessage
    //   apiClient
    //     .post('/chatbot', { message: message }) // Send the selected message
    //     .then((response) => {
    //       if (response.status === 200) {
    //         return response.data
    //       } else {
    //         throw new Error('Failed to send message')
    //       }
    //     })
    //     .then((data) => {
    //       this.chatHistory.push({ name: 'You', message: message }) // Push the selected message
    //       this.chatHistory.push({ name: 'Chatbot', message: data.response })
    //       this.userMessage = '' // Clear the input field
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

/* FOOTER */
#button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.custom-button {
  margin: 10px 0;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.custom-button:hover {
  background-color: #007bff;
  color: white;
}

.messages__item--visitor {
  text-align: right;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  background: rgb(0, 149, 255); /* Change the background color if needed */
  color: rgb(6, 6, 6); /* Change the text color if needed */
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.messages__item--operator {
  display: inline-block;
  text-align: left;
  margin-right: auto;
  background: #0073ff;
  background-size: auto;
  color: #333;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 15px; /* Padding to ensure text doesn't touch the edges */
  max-width: 70%; /* Maximum width of the chat bubble */
  word-wrap: break-word; /* Ensure text wraps inside the container */
  box-sizing: border-box;
}
.h2 {
  padding: 5px 5px;
  width: 70%;
  background-color: rgb(127, 210, 255, 0.2);
  margin: 5px 0px 0px 50px;
}
h1 {
  padding: 5px 5px;
  width: 30%;
  left: 10px;
}
.close-button {
  position: absolute;
  color: red;
  top: 0;
  right: 10px;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.options button {
  margin: 10px 0px 0px 50px;
  padding: 5px 5px;
  font-size: 16px;
  border: 1px solid blue;
  text-align: left;
  box-shadow: 2px 2px 5px #888888;
  display: block;
  width: 58%;
  border-radius: 12px; /* ทำให้กรอบของปุ่มมน */
}

.options button:hover {
  background-color: lightblue;
}

.chatbox {
  position: absolute;
  bottom: 80px;
  right: 20px;
}

/* CONTENT IS CLOSE */
.chatbox__support {
  display: flex;
  flex-direction: column;
  background: #eee;
  width: 300px;
  height: 350px;
  z-index: -123456;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

/* CONTENT ISOPEN */
.chatbox--active {
  transform: translateY(-40px);
  z-index: 123456;
  opacity: 1;
}

/* BUTTON */
.chatbox__button {
  text-align: right;
}

.send__button {
  padding: 6px;
  background: #000;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

/* MESSAGES */
.chatbox__messages {
  margin-top: auto;
  display: flex;
  overflow-y: scroll;
  flex-direction: column-reverse;
}

.messages__item {
  background: rgb(255, 255, 255);
  max-width: 60.6%;
  height: 300px;
  width: fit-content;
}

/* .messages__item--operator {
  margin-left: auto;
}

.messages__item--visitor {
  margin-right: auto;
} */

.chatbox__support {
  background: white;
  height: 450px;
  width: 350px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

/* HEADER */
.chatbox__header {
  background: var(--primaryGradient);
  background: rgb(0, 149, 255);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: var(--primaryBoxShadow);
}

.chatbox__image--header {
  margin-right: 10px;
}

.chatbox__heading--header {
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
}

.chatbox__description--header {
  font-size: 0.9rem;
  color: white;
}

/* Messages */
.chatbox__messages {
  padding: 180px 20px;
}

.messages__item {
  margin-top: 10px;
  background: #e0e0e0;
  padding: 8px 12px;
  max-width: 70%;
}

/* .messages__item--visitor, */
.messages__item--typing {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.messages__item--operator {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background: rgb(0, 149, 255);
  color: rgb(255, 255, 255);
}

/* FOOTER */
.chatbox__footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background: var(--secondaryGradient);
  background: rgb(0, 149, 255);
  box-shadow: var(--secondaryBoxShadow);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  margin: 0px;
}

.chatbox__footer input {
  width: 80%;
  border: none;
  padding: 10px 10px;
  border-radius: 30px;
  text-align: left;
}

.chatbox__send--footer {
  color: rgb(255, 255, 255);
}

.chatbox__button button,
.chatbox__button button:focus,
.chatbox__button button:visited {
  padding: 10px;
  background: rgb(255, 255, 255);
  border: none;
  outline: none;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
