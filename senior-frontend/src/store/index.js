import { reactive } from "vue";
export default reactive({
  currentEmail: JSON.parse(localStorage.getItem("email")) || null,
});
