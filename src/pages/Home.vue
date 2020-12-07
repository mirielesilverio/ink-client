<template>
  <div class="container-fluid" id="home-page">
    <div class="row vh-100 justify-content-around align-content-center">
      <div class="col-12 pb-4">
        <h3 class="text-center text-purple">Bem Vindo!</h3>
        <p class="text-center">
          Qual a próxima coisa com a qual o iNK pode te ajudar?
        </p>
      </div>
      <div class="card col-md-3 card-module" @click="goToAgenda">
        <div class="card-body text-center">
          <i class="fa fa-calendar"></i>
          <h3>Agenda</h3>
        </div>
      </div>
      <div class="card col-md-3 card-module" @click="goToClients">
        <div class="card-body text-center">
          <i class="fa fa-users"></i>
          <h3>Clientes</h3>
        </div>
      </div>
      <div class="card col-md-3 card-module" @click="goToBudget">
        <div class="card-body text-center">
          <i class="fa fa-money"></i>
          <h3>Orçamentos</h3>
        </div>
      </div>
      <div class="col-12 pb-4 d-flex justify-content-center mt-4">
        <button class="btn btn-pimary" @click="loggout">
          <i class="fa fa-power-off" aria-hidden="true"></i> Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToBudget() {
      this.$router.replace("/budget");
    },
    goToClients() {
      this.$router.replace("/clients");
    },
    goToAgenda() {
      this.$router.replace("/agenda");
    },
    loggout() {
      var vm = this;
      this.axios
        .post("http://127.0.0.1:3333/api/logout", null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {}
        })
        .then(function (response) {
          var data = response.data;
          localStorage.user_id = '';
          localStorage.token = '';
          vm.$router.replace("/login");
        })
        .catch(function (error) {
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: "Ops!",
              message: "Algo deu errado no seu loggout, tente novamente!",
            });
          }, 1000);
        });
    },
  },
};
</script>
