<template>
  <card class="card-user">
    <img slot="image" src="static/img/future.JPG" alt="..."/>
    <div class="author">
      <a href="#">
        <img class="avatar border-gray" src="static/img/faces/face-0.jpg" alt="..."/>

        <h4 class="title">{{firstName}} {{lastName}}<br />
          <small>{{username}}</small>
        </h4>
      </a>
    </div>
    <p class="description text-center"> {{colony}} - {{address}}</p>

    <!-- <div slot="footer" class="text-center">
      <button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
      <button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
      <button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button>
    </div> -->
  </card>
</template>
<script>
  import Card from '@/components/UIComponents/Cards/Card.vue'
  export default {
    components: {
      Card
    },
    data () {
      return {
        firstName: this.$store.getters.getHabitant.firstName,
        lastName: this.$store.getters.getHabitant.lastName,
        username: this.$store.getters.getHabitant.username,
        colony: this.$store.getters.getHabitant.colony,
        address: this.$store.getters.getHabitant.address,
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ]
      }
    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      }
    }
  }

</script>
<style>
.card-image img {
  margin-top: -200px !important;
}
</style>
