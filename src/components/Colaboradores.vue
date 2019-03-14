<template>
	<div>
		<b-container class="bv-example-row">
			<b-row>
				<b-col sm="4" v-for="item in lista" :key="item.cve_colaborador">
					<div class="card-group">
						<div class="card">
							<img src="../assets/avatar.png" class="card-img-top">
							<div class="card-body">
								<h5 class="card-title">{{item.nickname_colaborador}}</h5>
								<p class="card-text">{{item.puesto_colaborador}}</p>
								<p class="card-text">
									<b-button variant="warning">Tickets completados <b-badge variant="light">{{item.pts_colaborador}}</b-badge></b-button>
								</p>
								<b-button variant="info" :to="/colaborador/+item.cve_colaborador+/tickets/"> Editar </b-button>
							</div>
						</div>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
  	name: 'Colaboradores',
  	data () {
	    return {
			lista:[],
			resultado:''
	    }
  	},
  	created(){
  		this.listarColaboradores();
  	},
  	methods:{
  		listarColaboradores(){
  			axios.get('http://localhost:3000/colaborador/')
			.then(res => {
				this.lista = res.data;
			});
  		}
  	}
}
</script>