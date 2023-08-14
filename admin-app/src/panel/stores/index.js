import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

/**
 * create random ID
 */
const createId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

/**
 *
 * @param ({data: any, action: string})
 * @returns json
 */
const fetchAPI = async ({ data, action } = { action: null }) => {
  if (!action) return;

  const dataToSend = new FormData();
  dataToSend.append("action", action);
  if (data) {
    dataToSend.append("data", data);
  }
  try {
    const call = await fetch(window.ajaxurl, {
      method: "POST",
      credentials: "same-origin",
      body: dataToSend,
    });
    const response = await call.text();
    return JSON.parse(response.replace(/\\"/g, '"'));
  } catch (error) {
    console.log(error);
  }
};

export const useMainStore = defineStore("main", () => {
  const loading = ref(false);

  /**
   * fetch data on load
   */
  onMounted(async () => {
    loading.value = true;
    loading.value = false;
  });

  return {
    loading,
  };
});
