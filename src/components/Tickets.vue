<template>
	<div>
		<b-jumbotron :header="ProyectoNombre" :lead="ProyectoDescripcion">
	    	<b-button @click="showModal" id="showBtn" variant="primary">Registrar ticket</b-button>
	  	</b-jumbotron>
	  	<b-modal ref="myModalRegistrar" hide-footer title="Registrar ticket">
	  		<b-form @submit.prevent="registrar" id="registrarTicket">
	  			<b-form-group
					id="labelTicketTitulo"
					description="Ingresar el titulo del ticket."
					label="Ingresar el titulo del ticket"
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
					<b-form-group
						id="labelProyectoClave"
						description="Clave del proyecto."
						label="Clave del proyecto"
						label-for="inputProyectoClave"
					>
						<b-form-input type="text" id="inputProyectoClave" name="ProyectoClave" v-model="ProyectoClave" />
					</b-form-group>
						<b-form-select v-model="TicketIdColaborador" name="TicketIdColaborador" class="mb-3">
							<option :value="item.cve_colaborador" v-for="item in listaColaborador" :key="item.cve_colaborador">
								{{item.nickname_colaborador}}
							</option>
						</optgroup>
					</b-form-select>
					<b-button type="submit" variant="primary">Registrar</b-button>
	  		</b-form>
	  	</b-modal>
		<b-container class="bv-example-row">
			<b-row>
				<b-col v-for="item in lista" :key="item.cve_ticket" sm="6">
					<b-card :title="item.titulo_ticket" :sub-title="item.nickname_colaborador" class="box">
						<b-badge variant="danger" v-if="item.estatus_ticket == 'ACTIVO'">{{item.estatus_ticket}}</b-badge>
						<b-badge variant="success" v-if="item.estatus_ticket == 'INACTIVO'">{{item.estatus_ticket}}</b-badge>
						<b-card-text>
							{{item.descripcion_ticket}}
						</b-card-text>
						<b-button variant="info" :to="/proyecto/+ProyectoClave+/ticket/+item.cve_ticket"> Editar </b-button>
						<b-button variant="dark" @click="cambiarEstado(item.cve_ticket,item.estatus_ticket)"> Cambiar estatus </b-button>
				    	<!--<b-link href="#" class="card-link">Cambiar estatus</b-link>-->
						<div slot="footer">
							<small class="text-muted">
								Inicio: {{item.inicio_ticket | formatFecha}} - Vence: {{item.vencimiento_ticket | formatFecha}}
							</small>
						</div>
				  	</b-card>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>
<script>
	import axios from 'axios';
	import moment from 'moment';

	export default {
		name: 'Tickets',
		data () {
			return {
				lista:[],
				listaColaborador:[],
				infoProyecto:[],
				resultado:'',
				ProyectoClave:'',
				ProyectoNombre:'',
				ProyectoDescripcion:'',
				TicketClave: '',
				TicketTitulo: '',
				TicketDescripcion:'',
				TicketInicio: '',
				TicketVencimiento: '',
				TicketIdProyecto: '',
				TicketIdColaborador: '',
			}
		},
		created(){
		    this.verProyecto();
		    this.listarTickets();
		    this.listarColaboradores();
		},
		filters: {
		  formatFecha: function (date) {
		  	var fecha = moment(date).subtract(10, 'days').calendar();
			return fecha;
		  }
		},
		methods:{
			showModal() {
		    	this.$refs.myModalRegistrar.show();
		    },
		    hideModal() {
		        this.$refs.myModalRegistrar.hide();
		    },
		    parseFecha(date){
				var fecha = moment(date).subtract(10, 'days').calendar();
				fecha = moment(fecha).format('YYYY-MM-DD');
				return fecha;
			},
			verProyecto(){
				const id = this.$route.params.id;
        		axios.get('http://localhost:3000/proyecto/'+id)
        		.then(res => {
		          this.infoProyecto = res.data;
		          this.ProyectoClave = this.infoProyecto[0].cve_proyecto;
		          this.ProyectoNombre = this.infoProyecto[0].nombre_proyecto;
		          this.ProyectoDescripcion = this.infoProyecto[0].descripcion_proyecto;
		          //console.log(this.infoProyecto);
		        });
			},
			listarTickets(){
				const id = this.$route.params.id;
				axios.get('http://localhost:3000/proyecto/'+id+'/ticket')
				.then(res => {
					this.lista = res.data;
				});
			},
			listarColaboradores(){
				axios.get('http://localhost:3000/colaborador')
				.then(res => {
					this.listaColaborador = res.data;
					//console.log(this.listaColaborador);
				});
			},
			registrar(){
				//console.log("Vamos a registrar");
				const form = document.getElementById('registrarTicket')
				axios.post('http://localhost:3000/ticket/registrar', new FormData(form))
				.then( res =>{
        			this.resultado = res.data
        			if (this.resultado[0].RESPUESTA == 'SUCCESS') {
			        	this.hideModal();
			        	this.listarTickets();
			        }else {
			        	console.log('FAIL');
			        }
        		})
			},
			cambiarEstado(id,estado){
				//console.log(id);
				//console.log(estado);
				if (estado == 'ACTIVO') {
					axios.get('http://localhost:3000/ticket/baja/'+id)
					.then( res =>{
	        			this.resultado = res.data
	        			if (this.resultado[0].RESPUESTA == 'SUCCESS') {
				        	this.listarTickets();
				        }else {
				        	console.log('FAIL');
				        }
	        		});
				}else{
					axios.get('http://localhost:3000/ticket/alta/'+id)
					.then( res =>{
	        			this.resultado = res.data
	        			if (this.resultado[0].RESPUESTA == 'SUCCESS') {
				        	this.listarTickets();
				        }else {
				        	console.log('FAIL');
				        }
	        		});
				}
			}
		}
	}
</script>

<style>
	.box{
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>