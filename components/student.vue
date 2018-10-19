<template>
 
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>

    <b-container>
      <b-row >

        <b-col sm="6">

          <b-col sm="3"><label>Name</label></b-col>
          <b-col sm="9">
            <b-form-input type="text"  v-model="customer.name"></b-form-input>
          </b-col>

          <b-col sm="3"><label>Age</label></b-col>
          <b-col sm="9">    
            <b-form-input type="text"  v-model="customer.age"></b-form-input>
          </b-col>

          <b-col>
            <b-button variant="primary" @click="add()">submit</b-button>
            <b-button variant="primary" @click="clear()">clear</b-button>
          </b-col>

        </b-col>

        <b-col sm="6">
          <b-form-input v-model="searchKey"></b-form-input>
          <b-table :items= "customers" :fields="fields">
            <!-- <template slot="action">
              <b-button  @click = "edit(res.id)" >edit</b-button>
              <b-button  @click = "remove(res.id)">hapus</b-button>
            </template> -->
            <template slot="active" slot-scope="data">
              <div v-if="data.item.active === true">
                <b-button variant="primary" @click="active(data.item.id)">aktif</b-button>
              </div>
              <div v-else>
                <b-button variant ="danger" @click="active(data.item.id)">tidak aktif</b-button>
              </div>
            </template>

            <template slot="index" slot-scope="data">
              <b-button variant="primary" @click="edit(data.item.id)">edit</b-button>
              <b-button variant ="primary" @click="remove(data.item.id)">remove</b-button>
            </template>

          </b-table>
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
        active : false
      },
      customers : this.$store.state.customers,
      searchKey : '',

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
        

      }
      
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
        this.$store.dispatch('editData', this.customer)
      }
      

      this.customer.name ='',
      this.customer.age = ''
      
      
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

    clear(){
      this.customer.name ='',
      this.customer.age = ''
    }
  },
 
  components: {
    // Negara,
    // AddNegara
  },
};
</script>
