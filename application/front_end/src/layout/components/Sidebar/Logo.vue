<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <!-- <h1 v-else class="sidebar-title">{{ title }} </h1> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <!-- <h1 class="sidebar-title">{{ title }} </h1> -->
      </router-link>
    </transition>
    <hr class="sidebar-divider">
  </div>

</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'TrackSoul',
      logo: 'assets/images/TrackSoul.png'
    }
  }
}
</script>

<style lang="scss" scoped>
hr.sidebar-divider {
  margin: 0 1rem 1rem;
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container.collapse{
  height: 50px;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  // height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 100%;
      height: 120px;
      vertical-align: middle;
      // margin-top: 18.5px;
      // border:black 1px solid;
      // border-radius: 5%;
      background-color: white;
      // margin-right: 38.5px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    height: 50px;
    .sidebar-logo {
      margin-right: 0px;
      width: 33.2px;
      height: 32px;
      vertical-align: middle;
      margin-top: 0;
      // margin-right: 12px;
    }
  }
}
</style>
