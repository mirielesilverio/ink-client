<template>
    <div class="container-fluid" id="login-page">
        <div class="row vh-100 justify-content-center align-content-center">
            <div class="card shadow-sm p-4 login-card">
                <div class="card-body">
                    <h3 class="text-center">Entrar</h3>
                    <form>
                        <div class="form-group">
                            <label for="input-email">Email</label>
                            <input v-model="user.email"  type="email" class="form-control" id="input-email" placeholder="Digite seu email">
                        </div>
                        <div class="form-group">
                            <label for="input-senha">Senha</label>
                            <input v-model="user.password" type="password" class="form-control" id="input-senha" placeholder="Digite sua senha">
                        </div>
                        <button type="button" class="btn btn-block btn-pimary" @click="onLogIn">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{},
        };
    },
    methods: {
        onLogIn() {
            console.log('oi');
            if (!this.user.email || !this.user.password) {
                setTimeout(() => {
                    this.$floatingAlert.warn({
                        title: 'Atenção!',
                        message: 'Todos os campos devem ser preenchidos.',
                    })
                }, 1000)
            } else {
                var vm = this;
                this.axios.post('http://127.0.0.1:3333/api/login', this.user)
                .then( function(response) {
                    var data = response.data;
                    localStorage.user_id = data.user.id;
                    localStorage.token = data.token.original.access_token;
                    vm.$router.replace('/home');
                })
                .catch( function(error) {
                    var alertMessage = "Algo deu errado no seu login, tente novamente!";
                    if (error.response && error.response.status === 401 ) {
                        alertMessage = "Email ou senha incorretos"
                    } 
                    setTimeout(() => {
                        vm.$floatingAlert.error({
                            title: 'Ops!',
                            message: alertMessage,
                        })
                    }, 1000)
                });
            }
        }
    }
}
</script>
