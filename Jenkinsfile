pipeline {
    agent any

    environment {
        // ID de las credenciales SSH configuradas en Jenkins
        SSH_CREDENTIALS_ID = 'claveQA'
    }

    stages {
        stage('Checkout') {
            steps {
                // Obtiene el código de la rama actual
                checkout scm
            }
        }
        stage('Deploy to QA') {
            //when {
                // Ejecuta este stage solo si los cambios son en la rama 'qa'
                //branch 'qa'
            //}
            steps {
                // Utiliza las credenciales SSH para las operaciones en el servidor QA
                sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                    script {
                        // Comandos SSH para ejecutar en el servidor QA
                        def deployScript = """
                            cd /var/www/html/mi-aplicacion-clima
                            git pull origin qa
                            npm install
                            npm run build
                        """
                        // Ejecuta el script en el servidor QA
                        sshCommand remote: [name: 'ambiente-qa', user: 'ubuntu', host: '172.31.43.201'], command: deployScript
                    }
                }
            }
        }
    }
}
