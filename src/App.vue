<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item to="/">Inicio</b-nav-item>
          <b-nav-item to="/registrarproyecto">Registrar proyecto</b-nav-item>
          <b-nav-item to="/colaboradores">Colaboradores</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="container" style="margin-top:20px">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
