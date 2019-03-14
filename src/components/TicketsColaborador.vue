<template>
	<div>
		<div class="list-group" v-for="item in lista" :key="item.cve_ticket">
			<a href="#" class="list-group-item list-group-item-action">
				<div class="d-flex w-100 justify-content-between">
					<h5 class="mb-1">{{item.titulo_ticket}}</h5>
					<small>Inicio: {{item.inicio_ticket | formatFecha}} Vencimiento: {{item.inicio_ticket | formatFecha}}</small>
				</div>
				<p class="mb-1">
					{{item.descripcion_ticket}}
				</p>
				<small>{{item.nombre_proyecto}}</small>
			</a>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import moment from 'moment';
	export default {
  	name: 'TicketsColaborador',
  	data () {
	    return {
			lista:[],
			resultado:''
	    }
  	},
  	created(){
  		this.listarTicketsColaborador();
  	},
  	filters: {
	  formatFecha: function (date) {
	  	var fecha = moment(date).subtract(10, 'days').calendar();
		return fecha;
	  }
	},
  	methods:{
  		listarTicketsColaborador(){
  			const id = this.$route.params.id;
  			axios.get('http://localhost:3000/colaborador/'+id+/tickets/)
			.then(res => {
				this.lista = res.data;
				console.log(this.lista);
			});
  		}
  	}
}
</script>