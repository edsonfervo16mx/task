import Vue from 'vue'
import Router from 'vue-router'
import Proyectos from '@/components/Proyectos'
import RegistrarProyecto from '@/components/RegistrarProyecto'
import DetalleProyecto from '@/components/DetalleProyecto'
import Tickets from '@/components/Tickets'
import DetalleTicket from '@/components/DetalleTicket'
import Colaboradores from '@/components/Colaboradores'
import TicketsColaborador from '@/components/TicketsColaborador'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Proyectos',
      component: Proyectos
    },
    {
      path: '/registrarproyecto',
      name: 'RegistrarProyecto',
      props: true,
      component: RegistrarProyecto
    },
    {
      path: '/proyecto/:id',
      name: 'DetalleProyecto',
      props: true,
      component: DetalleProyecto
    },
    {
      path: '/proyecto/:id/tickets',
      name: 'Tickets',
      props: true,
      component: Tickets
    },
    {
      path: '/proyecto/:id/ticket/:cve',
      name: 'DetalleTicket',
      props: true,
      component: DetalleTicket
    },
    {
      path: '/colaboradores',
      name: 'Colaboradores',
      props: true,
      component: Colaboradores
    },
    {
      path: '/colaborador/:id/tickets',
      name: 'TicketsColaborador',
      props: true,
      component: TicketsColaborador
    },
  ]
})
