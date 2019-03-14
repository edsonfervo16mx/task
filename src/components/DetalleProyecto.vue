<template>
	<div>
		<b-form @submit.prevent="modificar" id="modificarProyecto">
			<b-form-group
				id="labelProyectoClave"
				description="Clave del proyecto."
				label="Clave"
				label-for="inputProyectoClave"
			>
			<b-form-input id="inputProyectoClave" name="ProyectoClave" v-model="ProyectoClave" />
			</b-form-group>
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
			<b-button type="submit" variant="primary">Modificar</b-button>
			<b-button variant="secondary" to="/"> Regresar</b-button>
		</b-form>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		name: 'DetalleProyecto',
		data () {
			return {
				lista:[],
				ProyectoClave:'',
				ProyectoNombre:'',
				ProyectoDescripcion:'',
				resultado:'',
			}
		},
		created(){
		    this.listar();
		},
		methods:{
			listar(){
				const id = this.$route.params.id;
				axios.get('http://localhost:3000/proyecto/'+id)
				.then(res => {
		          this.lista = res.data;
		          this.ProyectoClave = this.lista[0].cve_proyecto;
		          this.ProyectoNombre = this.lista[0].nombre_proyecto;
		          this.ProyectoDescripcion = this.lista[0].descripcion_proyecto;
		          console.log(this.ProyectoClave);
		          console.log(this.lista);
		        });
			},
			modificar(){
				console.log("Vamos a modificar");
				const form = document.getElementById('modificarProyecto')
				axios.post('http://localhost:3000/proyecto/modificar', new FormData(form))
				.then( res =>{
					this.resultado = res.data;
					if (this.resultado[0].RESPUESTA == 'SUCCESS') {
						this.$router.push('/');
					}else{
						console.log('FAIL');
					}
				});
			}
		}
	}
</script>