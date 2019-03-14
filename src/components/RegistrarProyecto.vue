<template>
	<div>
		<b-form @submit.prevent="registrar" id="registrarProyecto">
			<b-form-group
				id="labelProyectoNombre"
				description="Ingresar el nombre del proyecto."
				label="Ingresar el nombre del proyecto"
				label-for="inputProyectoNombre"
			>
			<b-form-input id="inputProyectoNombre" name="ProyectoNombre" v-model="ProyectoNombre" />
			</b-form-group>
			<b-form-group
				id="labelProyectoDescripcion"
				description="Ingresar la descripción del proyecto."
				label="Ingresar la descripción del proyecto"
				label-for="inputProyectoDescripcion"
			>
			<b-form-input id="inputProyectoDescripcion" name="ProyectoDescripcion" v-model="ProyectoDescripcion" />
			</b-form-group>
			<b-button type="submit" variant="primary">Registrar</b-button>
		</b-form>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		name: 'RegistrarProyecto',
		data () {
			return {
				lista:[],
				ProyectoNombre:'',
				ProyectoDescripcion:'',
				resultado:'',
			}
		},
		methods:{
			registrar(){
				console.log("Vamos a registrar");
				const form = document.getElementById('registrarProyecto')
				axios.post('http://localhost:3000/proyecto/registrar', new FormData(form))
				.then( res =>{
				this.resultado = res.data
				//console.log(this.resultado);
				//console.log(this.resultado[0].RESPUESTA);
				/**/
				if (this.resultado[0].RESPUESTA == 'SUCCESS') {
					this.$router.push('/')
				}else {
					console.log('FAIL');
				}
				/**/
				})
			}
		}
	}
</script>