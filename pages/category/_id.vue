<template>
  <div
    class="flex flex-col px-4 md:px-8 py-8 space-y-8 md:space-y-8 max-w-6xl mx-auto"
  >
    <!-- Heading -->
    <section class="text-center my-8 md:my-12 mx-auto max-w-2xl space-y-12">
      <Heading1 class="font-black">{{ category.name }}</Heading1>
      <Subtitle2 class="font-semibold">{{ category.content }}</Subtitle2>
    </section>
    <!-- End of Heading -->
    <SectionDivider />
    <!-- Sub-categories -->
    <section
      v-for="subcategory in category.subcategories"
      :key="subcategory.id"
      class="flex flex-col space-y-8"
    >
      <div
        class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6"
      >
        <div class="px-4 md:px-6 space-y-6 md:max-w-sm">
          <Heading4 class="font-black">{{ subcategory.name }}</Heading4>
          <Paragraph2>{{ subcategory.content }}</Paragraph2>
          <div>
            <Label2 class="font-semibold">
              {{ subcategory.topics.length }} posts
            </Label2>
          </div>
        </div>
        <TopicsCarousal :topics="subcategory.topics" class="flex-1" />
      </div>
      <SectionDivider />
    </section>
    <!-- End of Sub-categories -->

    <section>
      <SocialSharer />
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getCategoryById } from '~/utils/strapi';

export default Vue.extend({
  async asyncData({ params }) {
    return { category: await getCategoryById(params.id) };
  },
});
</script>
