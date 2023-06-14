<template>
  <div
    class="flex items-center py-6 px-0 fixed top-0 left-0 w-full h-16 bg-sky-600 z-50"
  >
    <div class="ml-3 flex items-center gap-0">
      <InputField />
      <PrimaryButton buttonText="搜尋" />
      <div class="absolute right-5">
        <PrimaryButton buttonText="登出" />
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "../assets/Input.vue";
import PrimaryButton from "../assets/PrimaryButton.vue";

export default {
  components: { InputField, PrimaryButton },
};
</script>

