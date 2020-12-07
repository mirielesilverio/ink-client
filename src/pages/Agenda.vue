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
          <h3 class="text-gray">Eventos Cadastrados</h3>
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
                <label class="text-white" for="event-name"
                  >Título do evento</label
                >
                <input
                  type="text"
                  class="form-control mb-2 mr-sm-2"
                  id="event-name"
                  placeholder="Digite um nome para o evento"
                  v-model="newEvent.title"
                />
              </div>
              <div class="col-md-2">
                <label class="text-white" for="event-date">Data</label>
                <input
                  type="date"
                  class="form-control mb-2 mr-sm-2"
                  id="event-date"
                  placeholder=""
                  v-model="newEvent.date"
                />
              </div>
              <div class="col-md-2">
                <label class="text-white" for="time-event">Horário</label>
                <input
                  type="time"
                  class="form-control mb-2 mr-sm-2"
                  id="time-event"
                  placeholder=""
                  v-model="newEvent.time"
                />
              </div>
              <div class="col-md-2">
                <label class="text-white" for="time-event">Valor</label>
                <input
                  type="number"
                  class="form-control mb-2 mr-sm-2"
                  id="value-event"
                  placeholder="15.50"
                  min="0"
                  step=".01"
                  v-model="newEvent.amount"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="client-event">Cliente</label>
                <select
                  class="form-control"
                  id="client-event"
                  v-model="newEvent.client"
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
                @click="addEvent"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
        <table class="table table-striped table-dark table-borderless">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Data</th>
              <th scope="col">Valor</th>
              <th scope="col">Cliente</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td>{{ event.title }}</td>
              <td>{{ new Date(event.date).toLocaleString() }}</td>
              <td>{{ event.amount }}</td>
              <td>{{ event.name }}</td>
              <td>
                <button
                  class="rounded-circle btn btn-primary"
                  data-toggle="collapse"
                  :data-target="'#collapse-edit-' + event.id + ''"
                  aria-expanded="false"
                  :aria-controls="'#collapse-edit-' + event.id + ''"
                >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  class="rounded-circle btn btn-danger"
                  data-toggle="collapse"
                  :data-target="'#collapse-delete-' + event.id + ''"
                  aria-expanded="false"
                  :aria-controls="'#collapse-delete-' + event.id + ''"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr
              v-for="event in events"
              :key="event.id"
              class="collapse"
              :id="'collapse-edit-' + event.id + ''"
            >
              <td colspan="6">
                <div class="card card-body">
                  <form class="col-12">
                    <div class="row p-4">
                      <div class="col-md-3">
                        <label class="text-white" for="event-name"
                          >Título do evento</label
                        >
                        <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="event-name"
                          placeholder="Digite um nome para o evento"
                          v-model="event.title"
                        />
                      </div>
                      <div class="col-md-2">
                        <label class="text-white" for="time-event">Valor</label>
                        <input
                          type="number"
                          class="form-control mb-2 mr-sm-2"
                          id="value-event"
                          placeholder="15.50"
                          min="0"
                          step=".01"
                          v-model="event.amount"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="client-event">Cliente</label>
                        <select
                          class="form-control"
                          id="client-event"
                          v-model="event.id_client"
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
                        :data-target="'#collapse-edit-' + event.id + ''"
                        aria-expanded="false"
                        aria-controls="'collapse-edit-' + event.id + ''"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        class="btn btn-pimary col-2 ml-2"
                        @click="editEvent(event)"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </td>
            </tr>
            <tr
              v-for="event in events"
              :key="event.id"
              class="collapse"
              :id="'collapse-delete-' + event.id + ''"
            >
              <td colspan="6">
                <div class="card card-body">
                  <h3 class="text-purple">Atenção</h3>
                  <p>
                    Você tem certeza de que deseja apagar os dados desse evento?
                  </p>
                  <div class="row pl-2">
                    <button
                      type="button"
                      class="btn btn-secondary col-2"
                      data-toggle="collapse"
                      :data-target="'#collapse-delete-' + event.id + ''"
                      aria-expanded="false"
                      :aria-controls="'collapse-delete-' + event.id + ''"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="btn btn-pimary col-2 ml-2"
                      @click="deleteEvent(event)"
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
      events: [],
      newEvent: {},
    };
  },
  mounted() {
    var vm = this;
    this.axios
      .get("http://127.0.0.1:3333/api/clients?user_id=" + localStorage.getItem("user_id"), {
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
        if (error.response && error.response.status === 401 ) {
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: 'Erro!',
              message: 'Token Expirado, faça login  novamente.',
            })
            vm.$router.replace('/login');
          }, 1000)
        } else {
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: 'Erro!',
              message: 'Ops! parece que algo deu errado, tente novamente.',
            })
          }, 1000)
        }
      });
    this.axios
      .get(
        "http://127.0.0.1:3333/api/agenda?user_id=" +
          localStorage.getItem("user_id"),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: {},
        }
      )
      .then(function (response) {
        if (typeof response.data == "object") {
          vm.events = response.data;
        }
      })
      .catch(function (error) {
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: 'Erro!',
              message: 'Ops! parece que algo deu errado, tente novamente.',
            })
          }, 1000)
      });
  },
  methods: {
    backToMenu() {
      this.$router.replace("/home");
    },
    addEvent() {
      var vm = this;
      var eventDate = this.newEvent.date + " " + this.newEvent.time;
      if (
        !this.newEvent.title ||
        !this.newEvent.date ||
        !this.newEvent.time ||
        !this.newEvent.amount ||
        !this.newEvent.client
      ) {
        setTimeout(() => {
          this.$floatingAlert.warn({
            title: "Atenção!",
            message:
              "Todos os campos de cadastro do evento devem ser preenchidos.",
          });
        }, 1000);
      } else {
        console.log(localStorage.getItem("token"));
        this.axios
          .post("http://127.0.0.1:3333/api/agenda", null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              title: vm.newEvent.title,
              date: eventDate,
              amount: vm.newEvent.amount,
              id_client: vm.newEvent.client,
              id_user: localStorage.getItem("user_id"),
            },
          })
          .then(function (response) {
            vm.events.push(response.data[0]);
            setTimeout(() => {
              vm.$floatingAlert.success({
                title: "Sucesso!",
                message: "Evento cadastrado com sucesso.",
              });
            }, 1000);
          })
          .catch(function (error) {
            vm.apiError(error);
          });
      }
    },
    editEvent(event) {
      var vm = this;
        if (!event.title || !event.amount || !event.id_client) {
          setTimeout(() => {
            this.$floatingAlert.warn({
                title: 'Atenção!',
                message: 'Todo os dados de evento devem ser preenchidos.',
              })
          }, 1000)
        } else {
          this.axios.put('http://127.0.0.1:3333/api/agenda/'+event.id, null,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: {
            title: event.title,
            amount: event.amount,
            id_client: event.id_client,
            id_user: localStorage.getItem('user_id')} }
          )
          .then( function(response) {
            console.log(response);
            setTimeout(() => {
            vm.$floatingAlert.success({
                title: 'Sucesso!',
                message: 'Evento alterado com sucesso.',
              })
            }, 1000)
          }).catch( function(error) {
            vm.apiError(error);
          });
        }
    },
    deleteEvent(event) {
      var vm = this;
      this.axios
        .delete("http://127.0.0.1:3333/api/agenda/" + event.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            data: {},
          },
        })
        .then(function (response) {
          setTimeout(() => {
            vm.$floatingAlert.success({
              title: "Sucesso!",
              message: "Evento deletado com sucesso.",
            });
          }, 1000);
        })
        .catch(function (error) {
          console.log(error);
          vm.apiError(error);
        });
    },
    apiError(error) {
      if (error.response && error.response.status === 401 ) {
        setTimeout(() => {
          vm.$floatingAlert.error({
            title: 'Erro!',
            message: 'Token Expirado, faça login  novamente.',
          })
        }, 1000)
      } else {
        setTimeout(() => {
          vm.$floatingAlert.error({
            title: 'Erro!',
            message: 'Ops! parece que algo deu errado, tente novamente.',
          })
        }, 1000)
      }
    }
  },
};
</script>
