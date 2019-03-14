<template>
	<div>
		<b-form @submit.prevent="modificar" id="modificarTicket">
			<b-row>
				<b-col sm="6" offset-md="3">
					<b-form-group
						id="labelTicketClave"
						description="Clave del ticket."
						label="Clave"
						label-for="inputTicketClave"
					>
						<b-form-input id="inputTicketClave" name="TicketClave" v-model="TicketClave" />
					</b-form-group>
					<b-form-group
						id="labelTicketTitulo"
						description="Titulo del ticket."
						label="Titulo"
						label-for="inputTicketTitulo"
					>
						<b-form-input id="inputTicketTitulo" name="TicketTitulo" v-model="TicketTitulo" />
					</b-form-group>
					<b-form-group
						id="labelTicketDescripcion"
						description="Titulo del ticket."
						label="Titulo"
						label-for="inputTicketDescripcion"
					>
						<b-form-input id="inputTicketDescripcion" name="TicketDescripcion" v-model="TicketDescripcion" />
					</b-form-group>
					<b-form-group
						id="labelTicketInicio"
						description="Inicio del ticket."
						label="Inicio"
						label-for="inputTicketInicio"
					>
						<b-form-input type="date" id="inputTicketInicio" name="TicketInicio" v-model="TicketInicio" />
					</b-form-group>
					<b-form-group
						id="labelTicketVencimiento"
						description="Fin del ticket."
						label="Fin"
						label-for="inputTicketVencimiento"
					>
						<b-form-input type="date" id="inputTicketVencimiento" name="TicketVencimiento" v-model="TicketVencimiento" />
					</b-form-group>
					<b-button type="submit" variant="primary">Modificar</b-button>
					<b-button variant="secondary" :to="/proyecto/+ProyectoClave+/tickets/"> Regresar</b-button>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>
<script>
	import axios from 'axios';
	import moment from 'moment';
	export default {
		name: 'DetalleTicket',
		data () {
			return {
				lista:[],
				resultado:'',
				infoTicket:'',
				ProyectoClave: '',
				TicketClave: '',
				TicketTitulo: '',
				TicketDescripcion:'',
				TicketInicio: '',
				TicketVencimiento: '',
			}
		},
		created(){
		    this.verTicket();
		},
		filters: {
		  formatFecha: function (date) {
		  	var fecha = moment(date).subtract(10, 'days').calendar();
			fecha = moment(fecha).format('YYYY-MM-DD');
			return fecha;
		    //return moment(date).format('YYYY-MM-DD HH:mm Z');
		    //return moment(date).subtract(10, 'days').calendar();
		  }
		},
		methods:{
			parseFecha(date){
				var fecha = moment(date).subtract(10, 'days').calendar();
				fecha = moment(fecha).format('YYYY-MM-DD');
				return fecha;
			},
			verTicket(){
				const id_proyecto = this.$route.params.id;
				const id_ticket = this.$route.params.cve;
				axios.get('http://localhost:3000/ticket/'+id_ticket)
				.then(res => {
					this.infoTicket = res.data;
					this.ProyectoClave = this.infoTicket[0].cve_proyecto;
					this.TicketClave = this.infoTicket[0].cve_ticket;
					this.TicketTitulo = this.infoTicket[0].titulo_ticket;
					this.TicketDescripcion = this.infoTicket[0].descripcion_ticket;
					this.TicketInicio = this.parseFecha(this.infoTicket[0].inicio_ticket);
					this.TicketVencimiento = this.parseFecha(this.infoTicket[0].vencimiento_ticket);
					/*
					var fecha = moment(this.TicketInicio).subtract(10, 'days').calendar();
					fecha = moment(fecha).format('YYYY-MM-DD');
					console.log(fecha);
					this.TicketInicio = fecha;
					console.log(this.TicketInicio);
					/**/
				});
			},
			modificar(){
				console.log("Vamos a modificar");
				const form = document.getElementById('modificarTicket')
				axios.post('http://localhost:3000/ticket/modificar', new FormData(form))
				.then( res =>{
					this.resultado = res.data;
					if (this.resultado[0].RESPUESTA == 'SUCCESS') {
						this.$router.push('/proyecto/'+this.ProyectoClave+'/tickets/');
					}else{
						console.log('FAIL');
					}
				});
			}
		}
	}
</script>