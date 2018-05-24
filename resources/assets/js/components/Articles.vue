<template>
  <div>
    <h2>Trips</h2>
    <form @submit.prevent="addTrip" class="mb-3">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Title" v-model="trip.title">
      </div>
      <div class="form-group">
        <textarea class="form-control" placeholder="Body" v-model="trip.body"></textarea>
      </div>
      <button type="submit" class="btn btn-light btn-block">Save</button>
    </form>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item"><a class="page-link" href="#" @click="fetchTrips(pagination.prev_page_url)">Previous</a></li>

        <li class="page-item disabled"><a class="page-link text-dark" href="#">Page {{ pagination.current_page }} of {{ pagination.last_page }}</a></li>
    
        <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item"><a class="page-link" href="#" @click="fetchTrips(pagination.next_page_url)">Next</a></li>
      </ul>
    </nav>
    <div class="card card-body mb-2" v-for="trip in trips" v-bind:key="trip.id">
      <h3>{{ trip.title }}</h3>
      <p>{{ trip.body }}</p>
      <hr>
      <button @click="editTrip(trip)" class="btn btn-warning mb-2">Edit</button>
      <button @click="deleteTrip(trip.id)" class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trips: [],
      trip: {
        id: '',
        title: '',
        body: ''
      },
      trip_id: '',
      pagination: {},
      edit: false
    };
  },

  created() {
    this.fetchTrips();
  },

  methods: {
    fetchTrips(page_url) {
      let vm = this;
      page_url = page_url || '/fulltrip/public/api/trips';
      fetch(page_url)
        .then(res => res.json())
        .then(res => {
          this.trips = res.data;
          vm.makePagination(res.meta, res.links);
        })
        .catch(err => console.log(err));
    },
    makePagination(meta, links) {
      let pagination = {
        current_page: meta.current_page,
        last_page: meta.last_page,
        next_page_url: links.next,
        prev_page_url: links.prev
      };

      this.pagination = pagination;
    },
    deleteTrip(id) {
      if (confirm('Are You Sure?')) {
        fetch(`fulltrip/public/api/trip/${id}`, {
          method: 'delete'
        })
          .then(res => res.json())
          .then(data => {
            alert('Trip Removed');
            this.fetchTrips();
          })
          .catch(err => console.log(err));
      }
    },
    addTrip() {
      if (this.edit === false) {
        // Add
        fetch('fulltrip/public/api/trip', {
          method: 'post',
          body: JSON.stringify(this.trip),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.trip.title = '';
            this.trip.body = '';
            alert('Trip Added');
            this.fetchTrips();
          })
          .catch(err => console.log(err));
      } else {
        // Update
        fetch('fulltrip/public/api/trip', {
          method: 'put',
          body: JSON.stringify(this.trip),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.trip.title = '';
            this.trip.body = '';
            alert('Trip Updated');
            this.fetchTrips();
          })
          .catch(err => console.log(err));
      }
    },
    editTrip(trip) {
      this.edit = true;
      this.trip.id = trip.id;
      this.trip.trip_id = trip.id;
      this.trip.title = trip.title;
      this.trip.body = trip.body;
    }
  }
};
</script>