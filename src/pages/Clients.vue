<template>
  <div class="container-fluid d-flex vh-100 justify-content-center align-items-center">
    <div class="card w-100">
      <div class="card-header border-0">
        <a @click="backToMenu"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>Voltar</a>
      </div>
      <div class="card-body table-responsive-sm">
        <div class="row mb-4 p-4 justify-content-between">
          <h3 class="text-gray">Clientes Cadastrados</h3>
          <button class="btn btn-pimary" data-toggle="collapse" data-target="#collapse-register" aria-expanded="false" aria-controls="collapse-register">
            Cadastrar Novo
          </button>
        </div>
        <div class="collapse row mb-3 bg-black p-4 ml-1 mr-1" id="collapse-register">
          <form>
            <div class="row p-4">
              <div class="col-md-4">
                <label class="text-white" for="client-name">Nome do cliente</label>
                <input v-model="newClient.name" required type="text" class="form-control mb-2 mr-sm-2" id="client-name" placeholder="Digite o nome do ciente"/>
              </div>
              <div class="col-md-4">
                <label class="text-white" for="client-email">Email do cliente</label>
                <input v-model="newClient.email" type="email" class="form-control mb-2 mr-sm-2" id="client-email" placeholder="Digite o email do cliente"/>
              </div>
              <div class="col-md-4">
                <label class="text-white" for="client-telephone">Telefone do cliente</label>
                <input v-model="newClient.telephone" type="text" class="form-control mb-2 mr-sm-2" id="client-telephone" placeholder="Digite o email do cliente"/>
              </div>
            </div>
            <div class="col-12 pl-4">
              <button type="button" class="btn btn-secondary col-2" data-toggle="collapse" data-target="#collapse-register" aria-expanded="false" aria-controls="collapse-register">
                Cancelar
              </button>
              <button type="button" class="btn btn-pimary col-2 ml-2" @click="addClient">
                Salvar
              </button>
            </div>
          </form>
        </div>
        <table class="table table-striped table-dark table-borderless">
          <thead>
            <tr>
              <th scope="col">Nome do cliente</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.telephone }}</td>
              <td>
                <button
                  class="rounded-circle btn btn-primary"
                  data-toggle="collapse"
                  :data-target="'#collapse-edit-' + client.id + ''"
                  aria-expanded="false"
                  :aria-controls="'collapse-edit-' + client.id + ''"
                >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  class="rounded-circle btn btn-danger"
                  data-toggle="collapse"
                  :data-target="'#collapse-delete-' + client.id + ''"
                  aria-expanded="false"
                  :aria-controls="'#collapse-delete-' + client.id + ''"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr  v-for="client in clients" :key="client.id" class="collapse" :id="'collapse-edit-' + client.id + ''">
              <td colspan="4">
                <div class="card card-body">
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <label class="text-white" for="client-name"
                          >Nome do cliente</label
                        >
                        <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="client-name"
                          placeholder="Digite o nome do ciente"
                          v-model="client.name"
                        />
                      </div>
                      <div class="col-md-4">
                        <label class="text-white" for="client-email"
                          >Email do cliente</label
                        >
                        <input
                          type="email"
                          class="form-control mb-2 mr-sm-2"
                          id="client-email"
                          placeholder="Digite o email do cliente"
                          v-model="client.email"
                        />
                      </div>
                      <div class="col-md-4">
                        <label class="text-white" for="telephone-email"
                          >Telefone do cliente</label
                        >
                        <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="telephone-email"
                          placeholder="Digite o telefone do cliente"
                          v-model="client.telephone"
                        />
                      </div>
                    </div>
                    <div class="row pl-3 mt-3">
                      <button
                        type="button"
                        class="btn btn-secondary col-2"
                        data-toggle="collapse"
                        data-target="#collapse-edit"
                        aria-expanded="false"
                        aria-controls="collapse-edit"
                      >
                        Cancelar
                      </button>
                      <button type="button" class="btn btn-pimary col-2 ml-2" @click="editClient(client)">
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </td>
            </tr>
            <tr v-for="client in clients" :key="client.id" class="collapse" :id="'collapse-delete-' + client.id + ''">
              <td colspan="4">
                <div class="card card-body">
                  <h3 class="text-purple">Atenção</h3>
                  <p>
                    Você tem certeza de que deseja apagar os dados desse
                    cliente?
                  </p>
                  <div class="row pl-2">
                    <button
                      type="button"
                      class="btn btn-secondary col-2"
                      data-toggle="collapse"
                      data-target="#collapse-delete"
                      aria-expanded="false"
                      aria-controls="collapse-delete"
                    >
                      Cancelar
                    </button>
                    <button type="button" class="btn btn-pimary col-2 ml-2" @click="deleteClient(client)">
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
      newClient: {},
    };
  },
  mounted() {
    var vm = this;
    this.axios.get('http://127.0.0.1:3333/api/clients', 
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      user_id: localStorage.getItem('user_id') })
    .then(function(response) {
      if (typeof(response.data) == 'object') {
        vm.clients = response.data;
      }
    }).catch(function(error) {
      console.log(error);
    });
  },
  methods: {
    backToMenu() {
      this.$router.replace("/home");
    },
    addClient() {
      if (!this.newClient.name || !this.newClient.email || !this.newClient.telephone) {
        setTimeout(() => {
          this.$floatingAlert.warn({
            title: 'Atenção!',
            message: 'Todos os campos de cadastro do clente devem ser preenchidos.',
          })
        }, 1000)
      } 
      else {
        var vm = this;
        console.log(localStorage.getItem('token'));
        this.axios.post('http://127.0.0.1:3333/api/clients', null,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: {
          name: vm.newClient.name,
          telephone: vm.newClient.telephone,
          email: vm.newClient.email,
          id_user: localStorage.getItem('user_id')} }
        )
        .then( function(response) {
          vm.clients.push(response.data);
          setTimeout(() => {
          vm.$floatingAlert.success({
              title: 'Sucesso!',
              message: 'Cliente cadastrado com sucesso.',
            })
          }, 1000)
        }).catch( function(error) {
          console.log(error);
          setTimeout(() => {
            vm.$floatingAlert.error({
              title: 'Erro!',
              message: 'Ops! Algo deu errado no cadastro de seu cliente, tente novamente.',
            })
          }, 1000)
        });
      }
    },
    editClient(client) {
        var vm = this;
        if (!client.telephone || !client.name || !client.email) {
          setTimeout(() => {
            this.$floatingAlert.warn({
                title: 'Atenção!',
                message: 'Todo os dados de cliente devem ser preenchidos.',
              })
          }, 1000)
        } else {
          this.axios.put('http://127.0.0.1:3333/api/clients/'+client.id, null,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: {
            name: client.name,
            telephone: client.telephone,
            email: client.email,
            id_user: localStorage.getItem('user_id')} }
          )
          .then( function(response) {
            console.log(response);
            setTimeout(() => {
            vm.$floatingAlert.success({
                title: 'Sucesso!',
                message: 'Cliente alterado com sucesso.',
              })
            }, 1000)
          }).catch( function(error) {
            setTimeout(() => {
              vm.$floatingAlert.error({
                title: 'Erro!',
                message: 'Ops! Algo deu errado na alteração de seu cliente, tente novamente.',
              })
            }, 1000)
          });
        }
    },
    deleteClient(client) {
      var vm = this;
      this.axios.delete('http://127.0.0.1:3333/api/clients/'+client.id,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, data : {} } }
          )
          .then( function(response) {
            setTimeout(() => {
            vm.$floatingAlert.success({
                title: 'Sucesso!',
                message: 'Cliente deletado com sucesso.',
              })
            }, 1000)
          }).catch( function(error) {
            console.log(error);
            setTimeout(() => {
              vm.$floatingAlert.error({
                title: 'Erro!',
                message: 'Ops! Algo deu errado na deleção de seu cliente, tente novamente.',
              })
            }, 1000)
          });
    }
  },
};
</script>
