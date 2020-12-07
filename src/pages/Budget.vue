<template>
  <div
    class="container-fluid d-flex vh-100 h-100 justify-content-center align-items-center"
  >
    <div class="card w-100">
      <div class="card-header border-0">
        <a @click="backToMenu"
          ><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
          Voltar</a
        >
      </div>
      <div class="card-body table-responsive-sm">
        <div class="row mb-4 p-4 justify-content-between">
          <h3 class="text-gray">Orçamentos Cadastrados</h3>
          <button
            class="btn btn-pimary"
            data-toggle="collapse"
            data-target="#collapse-register"
            aria-expanded="false"
            aria-controls="collapse-register"
          >
            Cadastrar Novo
          </button>
        </div>
        <div
          class="collapse row mb-3 bg-black p-4 ml-1 mr-1"
          id="collapse-register"
        >
          <form class="col-12">
            <div class="row p-4">
              <div class="col-md-3">
                <label class="text-white" for="budget-title"
                  >Descrição do orçamento</label
                >
                <input
                  type="text"
                  class="form-control mb-2 mr-sm-2"
                  id="budget-title"
                  placeholder="Digite uma descrição para o orçamento"
                  v-model="newBudget.title"
                />
              </div>
              <div class="col-md-2">
                <label class="text-white" for="budget-body_part"
                  >Parte do corpo</label
                >
                <input
                  type="text"
                  class="form-control mb-2 mr-sm-2"
                  id="budget-body_part"
                  placeholder="Digite uma parte do corpo"
                  v-model="newBudget.body_part"
                />
              </div>
              <div class="col-md-2">
                <label class="text-white" for="value-budget">Valor</label>
                <input
                  type="number"
                  class="form-control mb-2 mr-sm-2"
                  id="value-budget"
                  placeholder="15.50"
                  min="0"
                  step=".01"
                  v-model="newBudget.amount"
                />
              </div>
              <div class="col-md-2">
                <label class="text-white" for="size-budget">Tamanho</label>
                <input
                  type="number"
                  class="form-control mb-2 mr-sm-2"
                  id="size-budget"
                  placeholder="15.50"
                  min="0"
                  step=".01"
                  v-model="newBudget.size"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="client-event">Cliente</label>
                <select
                  class="form-control"
                  id="client-event"
                  v-model="newBudget.client"
                >
                  <option
                    v-for="client in clients"
                    :key="client.id"
                    :value="client.id"
                  >
                    {{ client.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 pl-4">
              <button
                type="button"
                class="btn btn-secondary col-2"
                data-toggle="collapse"
                data-target="#collapse-register"
                aria-expanded="false"
                aria-controls="collapse-register"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-pimary col-2 ml-2"
                @click="addBudget"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
        <table class="table table-striped table-dark table-borderless">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Parte do Corpo</th>
              <th scope="col">Tamanho</th>
              <th scope="col">Valor</th>
              <th scope="col">Cliente</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="budget in budgets" :key="budget.id">
              <td>{{ budget.title }}</td>
              <td>{{ budget.body_part }}</td>
              <td>{{ budget.size }}</td>
              <td>{{ budget.amount }}</td>
              <td>{{ budget.name }}</td>
              <td>
                <button
                  class="rounded-circle btn btn-primary"
                  data-toggle="collapse"
                  :data-target="'#collapse-edit-' + budget.id + ''"
                  aria-expanded="false"
                  :aria-controls="'#collapse-edit-' + budget.id + ''"
                >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  class="rounded-circle btn btn-danger"
                  data-toggle="collapse"
                  :data-target="'#collapse-delete-' + budget.id + ''"
                  aria-expanded="false"
                  :aria-controls="'#collapse-delete-' + budget.id + ''"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr
              v-for="budget in budgets"
              :key="budget.id"
              class="collapse"
              :id="'collapse-edit-' + budget.id + ''"
            >
              <td colspan="6">
                <div class="card card-body">
                  <form class="col-12">
                    <div class="row p-4">
                      <div class="col-md-3">
                        <label class="text-white" for="budget-title"
                          >Descrição do orçamento</label
                        >
                        <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="budget-title"
                          placeholder="Digite uma descrição para o orçamento"
                          v-model="budget.title"
                        />
                      </div>
                      <div class="col-md-2">
                        <label class="text-white" for="budget-body_part"
                          >Parte do corpo</label
                        >
                        <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="budget-body_part"
                          placeholder="Digite uma parte do corpo"
                          v-model="budget.body_part"
                        />
                      </div>
                      <div class="col-md-2">
                        <label class="text-white" for="value-budget"
                          >Valor</label
                        >
                        <input
                          type="number"
                          class="form-control mb-2 mr-sm-2"
                          id="value-budget"
                          placeholder="15.50"
                          min="0"
                          step=".01"
                          v-model="budget.amount"
                        />
                      </div>
                      <div class="col-md-2">
                        <label class="text-white" for="size-budget"
                          >Tamanho</label
                        >
                        <input
                          type="number"
                          class="form-control mb-2 mr-sm-2"
                          id="size-budget"
                          placeholder="15.50"
                          min="0"
                          step=".01"
                          v-model="budget.size"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="client-event">Cliente</label>
                        <select
                          class="form-control"
                          id="client-event"
                          v-model="budget.id_client"
                        >
                          <option
                            v-for="client in clients"
                            :key="client.id"
                            :value="client.id"
                          >
                            {{ client.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 pl-4">
                      <button
                        type="button"
                        class="btn btn-secondary col-2"
                        data-toggle="collapse"
                        :data-target="'#collapse-edit-' + budget.id + ''"
                        aria-expanded="false"
                        :aria-controls="'collapse-edit-' + budget.id + ''"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        class="btn btn-pimary col-2 ml-2"
                        @click="editBudget(budget)"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </td>
            </tr>
            <tr
              v-for="budget in budgets"
              :key="budget.id"
              class="collapse"
              :id="'collapse-delete-' + budget.id + ''"
            >
              <td colspan="6">
                <div class="card card-body">
                  <h3 class="text-purple">Atenção</h3>
                  <p>
                    Você tem certeza de que deseja apagar os dados desse orçamento?
                  </p>
                  <div class="row pl-2">
                    <button
                      type="button"
                      class="btn btn-secondary col-2"
                      data-toggle="collapse"
                      :data-target="'#collapse-delete-' + budget.id + ''"
                      aria-expanded="false"
                      :aria-controls="'collapse-delete-' + budget.id + ''"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="btn btn-pimary col-2 ml-2"
                      @click="deleteBudget(budget)"
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [],
      budgets: [],
      newBudget: {},
    };
  },
  mounted() {
    var vm = this;
    this.axios
      .get("http://127.0.0.1:3333/api/clients?user_id="+localStorage.getItem("user_id"), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: {},
      })
      .then(function (response) {
        console.log(response);
        if (typeof response.data == "object") {
          vm.clients = response.data;
          console.log(vm.clients);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: "Erro!",
              message: "Token Expirado, faça login  novamente.",
            });
            vm.$router.replace("/login");
          }, 1000);
        } else {
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: "Erro!",
              message: "Ops! parece que algo deu errado, tente novamente.",
            });
          }, 1000);
        }
      });
    this.axios
      .get(
        "http://127.0.0.1:3333/api/budget?user_id=" +
          localStorage.getItem("user_id"),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: {},
        }
      )
      .then(function (response) {
        if (typeof response.data == "object") {
          vm.budgets = response.data;
        }
      })
      .catch(function (error) {
        setTimeout(() => {
          vm.$floatingAlert.error({
            title: "Erro!",
            message: "Ops! parece que algo deu errado, tente novamente.",
          });
        }, 1000);
      });
  },
  methods: {
    backToMenu() {
      this.$router.replace("/home");
    },
    addBudget() {
        var vm = this;
      if (
        !this.newBudget.title ||
        !this.newBudget.amount ||
        !this.newBudget.client ||
        !this.newBudget.body_part ||
        !this.newBudget.size
      ) {
        setTimeout(() => {
          this.$floatingAlert.warn({
            title: "Atenção!",
            message:
              "Todos os campos de cadastro do orçamento devem ser preenchidos.",
          });
        }, 1000);
      } else {
        this.axios
          .post("http://127.0.0.1:3333/api/budget", null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              title: vm.newBudget.title,
              amount: vm.newBudget.amount,
              size: vm.newBudget.size,
              body_part: vm.newBudget.body_part,
              id_client: vm.newBudget.client,
              id_user: localStorage.getItem("user_id"),
            },
          })
          .then(function (response) {
            vm.budgets.push(response.data[0]);
            setTimeout(() => {
              vm.$floatingAlert.success({
                title: "Sucesso!",
                message: "Orçamento cadastrado com sucesso.",
              });
            }, 1000);
          })
          .catch(function (error) {
              console.log(error);
            vm.apiError(error);
          });
      }
    },
    editBudget(budget) {
      var vm = this;
      if (
        !budget.title ||
        !budget.amount ||
        !budget.id_client ||
        !budget.body_part ||
        !budget.size) {
        setTimeout(() => {
          this.$floatingAlert.warn({
            title: "Atenção!",
            message: "Todo os dados de orçamento devem ser preenchidos.",
          });
        }, 1000);
      } else {
        this.axios
          .put("http://127.0.0.1:3333/api/budget/" + budget.id, null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              title: budget.title,
              amount: budget.amount,
              size: budget.size,
              body_part: budget.body_part,
              id_client: budget.id_client,
              id_user: localStorage.getItem("user_id"),
            },
          })
          .then(function (response) {
            console.log(response);
            setTimeout(() => {
              vm.$floatingAlert.success({
                title: "Sucesso!",
                message: "Orçamento alterado com sucesso.",
              });
            }, 1000);
          })
          .catch(function (error) {
            vm.apiError(error);
          });
      }
    },
    deleteBudget(budget) {
      var vm = this;
      this.axios
        .delete("http://127.0.0.1:3333/api/budget/" + budget.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            data: {},
          },
        })
        .then(function (response) {
          setTimeout(() => {
            vm.$floatingAlert.success({
              title: "Sucesso!",
              message: "Orçamento deletado com sucesso.",
            });
          }, 1000);
        })
        .catch(function (error) {
          console.log(error);
          vm.apiError(error);
        });
    },
    apiError(error) {
        console.log(error);
        var vm = this;
      if (error.response && error.response.status === 401) {
        setTimeout(() => {
          vm.$floatingAlert.error({
            title: "Erro!",
            message: "Token Expirado, faça login  novamente.",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          vm.$floatingAlert.error({
            title: "Erro!",
            message: "Ops! parece que algo deu errado, tente novamente.",
          });
        }, 1000);
      }
    },
  },
};
</script>
