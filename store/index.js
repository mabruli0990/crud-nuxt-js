import axios from '~/plugins/axios'

export const state = () =>({
	customers : []
})

export const mutations = {
	setCustomer(state, customers){
		state.customers = customers
	},

	addCustomer(state, customers){
		state.customers.push(customers)
	},

	removeCustomer(state, id){
		const index = state.customers.findIndex(p => p.id === id)
        state.customers.splice(index, 1)
	},

	editCustomer(state, customers){
		const index = state.customers.findIndex(p => p.id === customers.id)
		const customer = state.customers[index]
		
		customer.name = customers.name
		customer.age = customers.age
		customer.active = customers.active
	}
}

export const actions = {
	async nuxtServerInit({commit}){
		const res = await axios.get('customers')
		commit('setCustomer', res.data)
	},

	async submitData({commit}, customer){

	    var ages = parseInt(customer.age)
	
		const res = await axios.post('customers', {name:customer.name, age:ages, active:customer.active})
		console.log(res.data);
		commit('addCustomer', res.data)
	},

	async removeData({commit}, id){
		await axios.delete('customers/'+ id)
		commit('removeCustomer', id)
	},

	async editData({commit}, customer){
		console.log(customer.active);
		var ages = parseInt(customer.age)
		const res = await axios.put('customers/'+ customer.id, {name:customer.name, age:ages, active:customer.active})
		commit('editCustomer', res.data)
	},

	async editActive({commit}, customer){
		const res = await axios.put('customers/'+ customer.id, {name:customer.name, age:customer.age,active:!customer.active})
		
		commit('editCustomer', res.data)
	}

	


}  