pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID_QA = 'claveQA'
        SSH_CREDENTIALS_ID_PROD = 'clavePROD'
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
                echo "Código obtenido de la rama ${env.branchName}."
            }
        }

        stage('Download Changes') {
            steps {
                script {
                    if (env.branchName == 'qa') {
                        sshagent(credentials: [SSH_CREDENTIALS_ID_QA]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.34.187 "cd /var/www/html/mi-aplicacion-clima && sudo git config --global --add safe.directory /var/www/html/mi-aplicacion-clima && sudo git pull origin qa"
                            '''
                        }
                        echo "Cambios descargados de la rama qa."
                    }
                    if (env.branchName == 'main'){
                        sshagent(credentials: [SSH_CREDENTIALS_ID_PROD]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.45.186 "cd /var/www/html/mi-aplicacion-clima && sudo git config --global --add safe.directory /var/www/html/mi-aplicacion-clima && sudo git pull origin main"
                            '''
                        }
                        echo "Cambios descargados de la rama main."
                    }
                }
            }
        }

        stage('Install Dependences') {
            steps {
                script {
                    if (env.branchName == 'qa') {
                        sshagent(credentials: [SSH_CREDENTIALS_ID_QA]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.34.187 "cd /var/www/html/mi-aplicacion-clima && sudo npm install"
                            '''
                        }
                    }
                    if (env.branchName == 'main'){
                        sshagent(credentials: [SSH_CREDENTIALS_ID_PROD]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.45.186 "cd /var/www/html/mi-aplicacion-clima && sudo npm install"
                            '''
                        }
                    }
                    echo "Dependencias instaladas."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (env.branchName == 'qa') {
                        sshagent(credentials: [SSH_CREDENTIALS_ID_QA]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.34.187 "cd /var/www/html/mi-aplicacion-clima && sudo npm test -- --watchAll=false"
                            '''
                        }
                        echo "Pruebas unitarias y de integración ejecutadas en el entorno QA."
                    }
                    if (env.branchName == 'main') {
                        sshagent(credentials: [SSH_CREDENTIALS_ID_PROD]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.45.186 "cd /var/www/html/mi-aplicacion-clima && sudo npm test -- --watchAll=false"
                            '''
                        }
                        echo "Pruebas unitarias y de integración ejecutadas en el entorno de Producción."
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (env.branchName == 'qa') {
                        sshagent(credentials: [SSH_CREDENTIALS_ID_QA]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.34.187 "cd /var/www/html/mi-aplicacion-clima && sudo npm run build"
                            '''
                        }
                        echo "Despliegue en el entorno de qa completado."
                    }
                    if (env.branchName == 'main'){
                        sshagent(credentials: [SSH_CREDENTIALS_ID_PROD]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ubuntu@172.31.45.186 "cd /var/www/html/mi-aplicacion-clima && sudo npm run build"
                            '''
                        }
                        echo "Despliegue en el entorno de main completado."
                    }
                }
            }
        }
    }
    post {
        failure {
            mail to: 'santiagox2060@gmail.com',
                subject: "Fallo en el Pipeline (${env.JOB_NAME})",
                body: "El pipeline '${env.JOB_NAME}' ha fallado en la rama ${env.BRANCH_NAME}.\n" +
                    "Revisa el log para más detalles: ${env.BUILD_URL}"
        }
        //success {
        //    mail to: 'santiagox2060@gmail.com',
        //        subject: "Éxito en el Pipeline (${env.JOB_NAME})",
        //        body: "El pipeline '${env.JOB_NAME}' se ha completado exitosamente en la rama ${env.BRANCH_NAME}.\n" +
        //            "Puedes ver los detalles aquí: ${env.BUILD_URL}"
        //}
    }
}
