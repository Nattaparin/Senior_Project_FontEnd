<template>
  <div class="text-center">
    <span
      class="mb-4 mt-16 text-1xl font-extrabold text-grey-900 leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white"
      >CAR CASE INFORMATION</span
    >
    <hr
      class="w-48 h-3 mx-auto my-4 bg-gray-100 border-0 rounded md:my-2 dark:bg--700"
    />
    <div class="grid md:grid-cols-4 md:gap-6">
      <div class="relative z-auto w-full mb-6 group">
        <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
          >ชื่อเจ้าของรถ:
        </label>
      </div>
      <div class="relative z-auto w-full mb-6 group">
        <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
          >เบอร์มือถือ:
        </label>
      </div>
      <div class="relative z-auto w-full mb-6 group">
        <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
          >หมายเลขทะเบียน:
        </label>
      </div>
      <div class="relative z-auto w-full mb-6 group">
        <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
          >รุ่นรถ:
        </label>
      </div>
    </div>
    <div>
      <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
        >ช่างที่ดูแล:
      </label>
    </div>
    <div>
      <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
        >อาการของรถ:
      </label>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["GStore"],
  name: "info-card",
};
</script>
