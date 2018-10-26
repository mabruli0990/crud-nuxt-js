<template>
 
  <div>
    <b-container style="pading-top:300px">
      <b-row>

        <b-col md="6">
          <b-row>

            <b-col md="2" class="my-1">
              <label>Name</label>
            </b-col>
            <b-col md="9">
              <b-form-input type="text"  v-model="customer.name"></b-form-input>
            </b-col>

            <b-col sm="2" class="my-1">
              <label>Age</label>
            </b-col>
            <b-col sm="9">    
              <b-form-input type="text"  v-model="customer.age"></b-form-input>
            </b-col>

            <b-col class="my-1">
              <b-button variant="primary" @click="add()">submit</b-button>
            </b-col>

          </b-row>
        </b-col>

        <b-col md="6">
          <b-row>

            <b-col md="6" class="my-1">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
              </b-input-group>
            </b-col>

            <b-col md="6">
              <b-row>
                <b-col md="4" class="my-2">
                  <label>Per Page</label>
                </b-col>
                <b-col>
                  <b-form-select :options="pageOptions" v-model="perPage" />
                </b-col>
              </b-row>
            </b-col>

            <b-table show-empty
              stacked="md"
             :items="customers"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
               
               @filtered="onFiltered">

              <template slot="active" slot-scope="data">
                <div v-if="data.item.active === 1 || data.item.active === true ">
                  <b-button size="sm" variant="primary" @click="active(data.item.id)">aktif</b-button>
                </div>
                <div v-else>
                  <b-button size="sm" variant ="danger" @click="active(data.item.id)">tidak aktif</b-button>
                </div>
              </template>

              <template slot="index" slot-scope="data">
                <b-button size="sm" variant="primary" @click="edit(data.item.id)">edit</b-button>
                <b-button size="sm" variant ="danger" @click="remove(data.item.id)">remove</b-button>
              </template>

            </b-table>

            <b-row>
              <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              </b-col>
            </b-row>

          </b-row>
        </b-col>

      </b-row>

    </b-container>

  </div>
    

</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {

  data(){
    return {
      customer : {
        id : 0,
        name : '',
        age : '',
        active : 1
      },
      customers : this.$store.state.customers,
      // searchKey : '',
     

      fields : {
       
        name : {
          label : 'Name',
          sortable : true
        },
        age : {
          label : 'Age',
          sortable : true
        } ,
        active : {
          label : 'Active',
          sortable : true
        },
        index: {
          label : 'Action'
        }
        
      },

      currentPage: 1,
      perPage: 5,
      totalRows: this.$store.state.customers.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null
      
    }
  },

  // cara 1
  // computed : mapState([
  //   'customers'
  // ]),

  computed : {
    // filterCustomers(){
    //   return this.customers.filter(res => res.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1)
    // }
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
    
  },

  methods : {

    // cara 1
    // ...mapActions(['add'])

    // cara 2
    add(){
 
    var index = this.customers.findIndex(p => p.id === this.customer.id)
       
      if(index < 0){
         this.$store.dispatch('submitData', this.customer)
      }
      else if(this.customers[index].id === this.customer.id){
        this.customer.active = this.customers[index].active
        this.$store.dispatch('editData', this.customer)
      }
      

      this.customer.name ='',
      this.customer.age = ''
      this.customer.id = 0
      
      
      // redirect
      // this.$router.push('/kemana')
    },

    remove(id){
      this.$store.dispatch('removeData',id)
    },

    edit(id){

      var index = this.customers.findIndex(p => p.id === id)
      var indexData = this.customers[index];

      this.customer.name = indexData.name,
      this.customer.age = indexData.age,
      this.customer.id = indexData.id

    },

    active(id){
      var index = this.customers.findIndex(p => p.id === id)

      this.$store.dispatch('editActive', this.customers[index])
    },

    
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
 
  components: {
    // Negara,
    // AddNegara
  },
};
</script>
