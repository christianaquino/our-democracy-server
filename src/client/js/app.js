!function(){"use strict";function configFn($stateProvider,$urlRouterProvider,APP_SETTINGS){$urlRouterProvider.otherwise("/home"),$stateProvider.state("app",{"abstract":!0,templateUrl:"assets/views/main/main.html"}).state("app.home",{url:"/home",views:{content:{templateUrl:"assets/views/home/home.html",controller:"HomeController",controllerAs:"homeCtrl",resolve:{listaCandidatosResponse:["DetalleService",function(DetalleService){return DetalleService.getCandidatos()}]}}}}).state("app.detalle",{url:"/detalle/:id",views:{content:{templateUrl:"assets/views/detalle/detalle.html",controller:"DetalleController",controllerAs:"detalleCtrl",resolve:{infoCandidatoResponse:["DetalleService","$stateParams",function(DetalleService,$stateParams){return DetalleService.getInfoCandidato($stateParams.id)}]}}}})}angular.module("OurDemocracyApp",["ngAnimate","ui.router"]),angular.module("OurDemocracyApp").constant("APP_SETTINGS",{BASE_URL:"http://ourdemocracy.cloudapp.net:3000/api"}),angular.module("OurDemocracyApp").config(configFn),configFn.$inject=["$stateProvider","$urlRouterProvider","APP_SETTINGS"]}(),function(){"use strict";function Controller($stateParams,infoCandidatoResponse){var vm=this;vm.infoCandidato=infoCandidatoResponse}angular.module("OurDemocracyApp").controller("DetalleController",Controller),Controller.$inject=["$stateParams","infoCandidatoResponse"]}(),function(){"use strict";function Service($http,APP_SETTINGS){function getCandidatos(){return listaCandidatos}function compareCandidatos(_id,candidato){return parseInt(candidato.id,10)===parseInt(_id,10)}function getNombreCandidato(_id){return listaCandidatos.filter(compareCandidatos.bind(this,_id))[0]}function getInfoCandidato(_id){var searched_candidato=getNombreCandidato(_id),request_params={method:"GET",url:APP_SETTINGS.BASE_URL+"/search/"+searched_candidato.tag+"?analize=true&type=recent&count=100"};return $http(request_params).then(function(response){var monkey_learn_data=response.data.data;return{nombre:searched_candidato.nombre,foto:searched_candidato.foto,partido:searched_candidato.partido,total:monkey_learn_data.total,positivos:monkey_learn_data.positive,negativos:monkey_learn_data.negative,neutrales:monkey_learn_data.neutral}})}var listaCandidatos=[{id:1,nombre:"Michelle Bachelet",tag:"michelle bachelet",foto:"./assets/images/bachelet.png",partido:"Nueva Mayoría"},{id:2,nombre:"Alejandro Guiller",tag:"alejandro guiller",foto:"./assets/images/guiller.png",partido:"Indepediente"},{id:3,nombre:"Isabel Allende",tag:"isabel allende",foto:"./assets/images/allende.png",partido:"PPD"},{id:4,nombre:"Ricardo Lagos",tag:"ricardo lagos",foto:"./assets/images/rlagos.png",partido:"PPD"}];this.getInfoCandidato=getInfoCandidato,this.getCandidatos=getCandidatos}angular.module("OurDemocracyApp").service("DetalleService",Service),Service.$inject=["$http","APP_SETTINGS"]}(),function(){"use strict";function Controller($state,listaCandidatosResponse){function cargarDetalle(idCandidato){$state.go("app.detalle",{id:idCandidato})}var vm=this;vm.listaCandidatos=listaCandidatosResponse,vm.cargarDetalle=cargarDetalle}angular.module("OurDemocracyApp").controller("HomeController",Controller),Controller.$inject=["$state","listaCandidatosResponse"]}(),angular.module("OurDemocracyApp").run(["$templateCache",function($templateCache){"use strict";$templateCache.put("assets/views/detalle/detalle.html",'\n<div class="profile"><img src="{{detalleCtrl.infoCandidato.foto}}">\n  <h1>{{::detalleCtrl.infoCandidato.nombre}}</h1>\n  <h5>{{::detalleCtrl.infoCandidato.partido}}</h5>\n  <div class="val">\n    <div class="icon"><img src="./assets/images/happy.png" class="icon-happy icon-xs"></div><span class="hr"></span>\n    <div class="icon"><img src="./assets/images/neutro.png" class="icon-noun icon-m"></div><span class="hr"></span>\n    <div class="icon"><img src="./assets/images/angry.png" class="icon-angry icon-xl"></div>\n  </div>\n  <div class="votes">\n    <div class="vote happy"><span>{{::detalleCtrl.infoCandidato.positivos}}</span></div><span class="hr"></span>\n    <div class="vote noun"><span>{{::detalleCtrl.infoCandidato.neutrales}}</span></div><span class="hr"></span>\n    <div class="vote angry"><span>{{::detalleCtrl.infoCandidato.negativos}}</span></div>\n  </div>\n  <button class="match">Versus</button>\n</div>\n<div class="tweets">\n  <blockquote data-lang="es" class="twitter-tweet">\n    <p lang="es" dir="ltr">¡Qué alegría el premio Nobel de Literatura para Bob Dylan! Muchos y gratos recuerdos de mi adolescencia están asociados a su música. — Michelle Bachelet (@mbachelet) </p><a href="https://twitter.com/mbachelet/status/786534079848124416">13 de octubre de 2016</a>\n  </blockquote>\n  <script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>\n</div>'),$templateCache.put("assets/views/home/home.html",'\n<div id="content">\n  <div id="list_pol">\n    <div ng-repeat="candidato in homeCtrl.listaCandidatos track by candidato.id" ng-click="homeCtrl.cargarDetalle(candidato.id)" class="pol">\n      <div class="ava"><img ng-src="{{::candidato.foto}}" class="avatar"><span class="flag"></span></div>\n      <div class="desc">\n        <p class="nom">{{::candidato.nombre}}</p>\n        <p class="part">{{::candidato.partido}}</p>\n      </div>\n      <div class="val">\n        <div class="icon"><img src="./assets/images/happy.png" class="icon-happy icon-xs"></div><span class="hr"></span>\n        <div class="icon"><img src="./assets/images/neutro.png" class="icon-noun icon-m"></div><span class="hr"></span>\n        <div class="icon"><img src="./assets/images/angry.png" class="icon-angry icon-xl"></div>\n      </div>\n      <div class="votes">\n        <div class="vote happy"><span>10%</span></div><span class="hr"></span>\n        <div class="vote noun"><span>60%</span></div><span class="hr"></span>\n        <div class="vote angry"><span>30%</span></div>\n      </div>\n    </div>\n  </div>\n</div>'),$templateCache.put("assets/views/main/main.html",'\n<div id="header">\n  <div class="bg"><img src="./assets/images/twitter.png" class="logo">\n    <h1>Nuestra democracia</h1>\n    <h3>Conoce cómo reacciona la gente ante los tweets de los políticos. </h3>\n  </div>\n</div>\n<div ui-view="content"></div>')}]);