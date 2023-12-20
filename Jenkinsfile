pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = 'claveQA'
    }

    stages {
        // ... otras etapas ...

        stage('Deploy to QA') {
            steps {
                sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@172.31.43.201 'cd /var/www/html/mi-aplicacion-clima && git pull origin qa && npm install && npm run build'
                    """
                }
            }
        }
    }
}
