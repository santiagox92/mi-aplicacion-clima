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
                script {
                    def branch = sh(script: "git branch --contains `git rev-parse HEAD` | sed -n '/\\* /s///p'", returnStdout: true).trim()
                    echo "La rama actual es: ${branch}"
                }
            }
        }

        stage('Deploy to QA') {
            when {
                branch 'qa'
            }
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
