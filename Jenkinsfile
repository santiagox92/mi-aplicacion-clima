pipeline {
    agent any

    environment {
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
            steps {
                sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@172.31.43.201 'cd /var/www/html/mi-aplicacion-clima && sudo git config --global --add safe.directory /var/www/html/mi-aplicacion-clima && sudo git pull origin qa && sudo npm install && sudo npm run build'
                    """
                }
            }
        }
    }
}
