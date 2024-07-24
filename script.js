new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        playerLifeBar: {
            width: this.playerLife+'%'
        },
        monsterLife: 100,
        monsterLifeBar: {
            width: this.monsterLife+'%'
        },
        gameStart: false,
        resultGame: null,
        loseGame: false,
        totalDamage: 0,
        lowLifePlayer: '',
        lowLifeMonster: '',
        logs: [],
        logResult: ''
    },
    computed: {
        // Função utilizada para resetar todos os parâmetros para o padrão
        resetParty() {
            this.playerLife = 100
            this.monsterLife = 100
            this.playerLifeBar.width = this.playerLife+'%'
            this.monsterLifeBar.width = this.monsterLife+'%'
            this.resultGame = null
            this.loseGame = false
            this.totalDamage = 0
            this.lowLifeMonster = ''
            this.lowLifePlayer = ''
            this.logs = []
        },
        // Função para verificar quem ganhou aa luta
        validateResult() {
            this.resultGame = true
            if (this.monsterLife == 0) {
                this.loseGame = false
            } else {
                this.loseGame = true
            }
        },
        validateLife() {
            if (this.monsterLife <= (100 * 0.25)) {
                this.lowLifeMonster = 'low-life'
            } else if (this.playerLife <= (100 * 0.25)) {
                this.lowLifePlayer = 'low-life'
            } else {
                this.lowLifeMonster = ''
                this.lowLifePlayer = ''
            }
        },
    },
    methods: {
        // Função para descontar pouca vida do monstro ao clicar no botão ATAQUE
        normalPlayerAtack() {
            let descount = Math.floor(Math.random()* (9 - 4)) + 4
            this.monsterLife -= descount
            this.logResult = 'O Jogador ' + 'atacou e causou ' + descount + ' de dano.'
            if (this.monsterLife <= 0) {
                this.monsterLife = 0
                this.validateResult
            }
            this.monsterLifeBar.width = this.monsterLife+'%'
            this.validateLife
            this.registerLog(this.logResult)
        },

        // Função para descontar mais vida do monstro ao clicar no botão ESPECIAL
        especialPlayerAtack() {
            let descount = Math.floor(Math.random()* (12 - 8)) + 8
            this.logResult = 'O Jogador ' + 'usou especial e causou ' + descount + ' de dano.'
            this.monsterLife -= descount
            this.totalDamage += descount
            if (this.monsterLife <= 0) {
                this.monsterLife = 0
                this.validateResult
            }
            this.monsterLifeBar.width = this.monsterLife+'%'
            this.validateLife
            this.registerLog(this.logResult)
        },

        // Função para descontar menos vida do jogador ao clicar no botão ATAQUE
        normalMonsterAtack() {
            let descount = Math.floor(Math.random()* (10 - 5)) + 5
            this.logResult = 'O Monstro ' + 'atacou e causou ' + descount + ' de dano.'
            this.playerLife -= descount
            if (this.playerLife <= 0) {
                this.playerLife = 0
                this.validateResult
            }
            this.playerLifeBar.width = this.playerLife+'%'
            this.validateLife
            this.registerLog(this.logResult)
        },

        // Função para aumentar a vida ao clicar no botão CURA
        healPlayer() {
            let heal = Math.floor(Math.random()* (11 - 6)) + 6
            this.logResult = 'O Jogador ' + 'curou ' + heal + ' de vida.'
            this.playerLife += heal
            if (this.playerLife >= 100) {
                this.playerLife = 100
            }
            if (this.playerLife <= 0) {
                this.playerLife = 0
                this.validateResult
            } else if (this.monsterLife <= 0) {
                this.monsterLife = 0
                this.validateResult
            }
            this.playerLifeBar.width = this.playerLife+'%'
            this.registerLog(this.logResult)
            this.validateLife
            
        },

        registerLog(text) {
            this.logs.unshift(text)
        
        }
    },
    watch: {
        resultGame(value) {
            if (value){
                this.gameStart = false
            }
        }
    }
})