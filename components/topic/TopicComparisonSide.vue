<template>
  <div>
    <div
      id="comparison-side-container"
      class="justify-center text-center align-center"
    >
      <multiselect
        v-model="version"
        class="text-black shadow-none outline-none"
        placeholder="เลือกฉบับรัฐธรรมนูญ"
        track-by="name"
        label="name"
        :options="versions"
        :searchable="false"
        :allow-empty="false"
        select-label=""
        deselect-label=""
        :style="
          sideL
            ? `margin-left: auto; margin-right: 0;`
            : `margin-left: 0; margin-right: auto;`
        "
        @select="selectVersion"
      >
      </multiselect>

      <div
        v-for="(section, index) in sections"
        :key="index"
        style="margin-top: 64px"
      >
        <div
          class="flex flex-col"
          :style="
            sideL
              ? `padding-left: 30%; padding-right: 12px;`
              : `padding-left: 12px; padding-right: 30%;`
          "
        >
          <Paragraph1
            class="flex flex-row text-left"
            v-html="section.content"
          />
          <Label1
            style="
              text-align: right;
              margin-top: 30px;
              margin-bottom: 16px;
              width: 100%;
            "
            v-html="section.footer"
          />
          <!-- <div
            v-for="(amendment, index) in section.amendments"
            :key="'amend-' + index"
            style="background-color: #ccc; margin-top: 64px"
            class="text-left"
          >
            <Label1 v-html="amendment.header" />
            <Paragraph1 class="text-left" v-html="amendment.content" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
Vue.component('Multiselect', Multiselect);
export default Vue.extend({
  components: {
    Multiselect,
  },
  props: {
    versions: Array,
    sideL: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      version: null,
      sections: null,
      amendments: null,
    };
  },
  methods: {
    selectVersion(value: any): void {
      this.sections = value.sections;
      value.sections.forEach(function (section: any) {
        section.content = section.content.replace('\\n', '<br/>');
        section.content = section.content.replace('\n', '<br/>');

        section.footer = '<b>มาตรา</b> ' + section.id;
        if (section.partId) {
          section.footer +=
            ' <b>ส่วน</b> ' + section.partId + ' ' + section.partName;
        }
        if (section.chapterId) {
          section.footer +=
            ' <b>หมวด</b> ' + section.chapterId + ' ' + section.chapterName;
        }
        console.log(section.footer);

        section.amendments = [];
        section.amendmentIds.forEach(function (id: number) {
          const amendment = value.amendments.filter(function (a: any) {
            return a.id === id;
          })[0];
          amendment.header = '<b>' + amendment.affectedBy + '</b>';
          section.amendments.push(amendment);
        });
      });
    },
  },
});
</script>

<style src="@/assets/vue-multiselect.min.css"></style>

<style scoped>
#comparison-side-container {
  width: 100%;
}
</style>
