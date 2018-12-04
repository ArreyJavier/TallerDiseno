/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
 function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
     $urlRouterProvider.otherwise("/index/main");

     $ocLazyLoadProvider.config({
         // Set to true if you want to see what and when is dynamically loaded
         debug: false
     });

     $stateProvider

         .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: 'views/dashboard.html',
            data: {
            pageTitle: 'dashboard '}
         })
         .state('index', {
             abstract: true,
             url: "/index",
             templateUrl: "/views/common/content.html",
         })
         .state('index.main', {
             url: "/main",
             templateUrl: "/views/main.html",
             data: { pageTitle: 'Inicio' }
         })
         .state('index.internoMantencion', {
             url: "/internoMantencion",
             templateUrl: "/views/internoMantencion.html",
             data: { pageTitle: 'Interno Mantencion' }
         })
         .state('index.externoMantencion', {
             url: "/externoMantencion",
             templateUrl: "/views/externoMantencion.html",
             data: { pageTitle: 'Externo Mantencion' }
         })
         .state('index.ingresarGastos', {
             url: "/ingresarGastos",
             templateUrl: "/views/ingresarGastos.html",
             data: { pageTitle: 'Ingresar Gastos' }
         })
         .state('index.obra', {
             url: "/obra",
             templateUrl: "/views/obra.html",
             data: { pageTitle: 'Obras' }
         })
         .state('index.cliente', {
             url: "/cliente",
             templateUrl: "/views/cliente.html",
             data: { pageTitle: 'Clientes' }
         })
         .state('index.egreso', {
             url: "/egreso",
             templateUrl: "/views/egreso.html",
             data: { pageTitle: 'Egresos' }
         })
         .state('index.ingreso', {
             url: "/ingreso",
             templateUrl: "/views/ingreso.html",
             data: { pageTitle: 'Ingresos' }
         })
         .state('index.gastosCliente', {
             url: "/gastosCliente",
             templateUrl: "/views/gastosCliente.html",
             data: { pageTitle: 'Gastos del Cliente' }
         })
 }
 angular
     .module('inspinia')
     .config(config)
     .run(function($rootScope, $state) {
         $rootScope.$state = $state;
     });
