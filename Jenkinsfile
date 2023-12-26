pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = 'claveQA'
    }

    stages {

        stage('Init') {
            steps {
                script {
                    env.branchName = sh(script: "echo ${env.GIT_BRANCH - 'origin/'}", returnStdout: true).trim()
                    echo "La rama es: ${env.branchName}"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo "Código obtenido de la rama QA."
            }
        }

        stage('Download Changes') {
            steps {
                script {
                    sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@172.31.43.201 "cd /var/www/html/mi-aplicacion-clima && sudo git config --global --add safe.directory /var/www/html/mi-aplicacion-clima && sudo git pull origin qa"
                        '''
                    }
                    echo "Cambios descargados de la rama QA."
                }
            }
        }

        stage('Install') {
            steps {
                script {
                    sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@172.31.43.201 "cd /var/www/html/mi-aplicacion-clima && sudo npm install"
                        '''
                    }
                    echo "Dependencias instaladas."
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "Aqui realiza test"
                echo "Ejecutando pruebas unitarias..."
            }
        }

        stage('Deploy to QA') {
            steps {
                script {
                    sshagent(credentials: [SSH_CREDENTIALS_ID]) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@172.31.43.201 "cd /var/www/html/mi-aplicacion-clima && sudo npm run build"
                        '''
                    }
                    echo "Despliegue en el entorno de QA completado."
                }
            }
        }
    }
}
