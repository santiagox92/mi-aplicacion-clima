pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = 'claveQA'
        def branchName = env.GIT_BRANCH
    }

    stages {
        stage('Checkout') {
            steps {
                // Obtiene el código de la rama actual
                checkout scm
            }
        }

        stage('Run Tests') {
            steps {
                echo "Aqui realiza test"
            }
        }

        stage('Deploy to QA') {
            steps {
                script {

                    echo "La rama es: ${branchName}"

                    // Comprobar si la rama es 'qa' y ejecutar pasos específicos
                    if (branchName == 'qa') {
                        // Pasos específicos para la rama 'qa'
                        sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.43.201 'cd /var/www/html/mi-aplicacion-clima && sudo git config --global --add safe.directory /var/www/html/mi-aplicacion-clima && sudo git pull origin qa && sudo npm install && sudo npm run build'
                            """
                        }
                    }
                }
            }
        }
    }
}
