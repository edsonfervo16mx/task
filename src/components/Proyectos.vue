<template>
  <div>
    <b-button @click="showModal" id="showBtn" variant="primary" class="btn-modal">Registrar proyecto</b-button>
    <b-modal ref="myModalRegistrar" hide-footer title="Registrar proyecto nuevo">
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
    </b-modal>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Proyecto</th>
          <th scope="col">Descripción</th>
          <th scope="col">Creado</th>
          <th scope="col">Modificado</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in lista" :key="item.cve_proyecto">
          <td>{{item.nombre_proyecto}}</td>
          <td>{{item.descripcion_proyecto}}</td>
          <td>{{item.created_proyecto}}</td>
          <td>{{item.upgrade_proyecto}}</td>
          <td>
            <b-button variant="secondary" :to="/proyecto/+item.cve_proyecto"> @ </b-button>
            <b-button variant="secondary" :to="/proyecto/+item.cve_proyecto+/tickets/"> * </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--<b-table striped hover :items="lista"/>-->
    <!--
    <b-list-group v-for="item in lista" :key="item.cve_proyecto">
      <b-list-group-item href="#" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{item.nombre_proyecto}}</h5>
          <small>{{item.created_proyecto}}</small>
        </div>
        <p class="mb-1">
          {{item.descripcion_proyecto}}
        </p>
      </b-list-group-item>
    </b-list-group>
    -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Proyectos',
  data () {
    return {
      lista:[],
      msg:'',
      ProyectoNombre:'',
      ProyectoDescripcion:'',
      resultado:'',
      titulos: ['Id', 'Proyecto', 'Descripcion','Creado', 'Modificado', 'Estatus'],
    }
  },
  created(){
    this.listar();
  },
  updated(){
    this.listar();
  },
  methods:{
      showModal() {
        this.$refs.myModalRegistrar.show();
      },
      hideModal() {
        this.$refs.myModalRegistrar.hide();
      },
      listar() {
        axios.get('http://localhost:3000/proyecto')
        .then(res => {
          this.lista = res.data;
        });
      },
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
          this.hideModal();
          //this.$router.push('/');
        }else {
          console.log('FAIL');
        }
        /**/
        })
      }
    }
}
</script>
<style>
  .btn-modal{
    margin-bottom: 20px;
  }
</style>
