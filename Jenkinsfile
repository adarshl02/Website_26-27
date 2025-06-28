pipeline {
    agent none
    
    environment {
        // Global environment variables
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'
    }

    stages {
        stage('Checkout and Prepare') {
            agent { label 'built-in' }
            steps {
                withCredentials([file(credentialsId: 'pratibimb-backend-env-file', variable: 'ENV_FILE')]) {
                    checkout scm
                    
                    dir('Backend') {
                        // Copy the secret file to .env
                        sh 'cp $ENV_FILE .env'
                        
                        // Archive the files to transfer to agent
                        stash includes: 'Backend/**', name: 'backend-files'
                    }
                }
            }
        }

        stage('Cleanup Old Deployment') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                script {
                    sh """
                        docker stop ${env.CONTAINER_NAME} || true
                        docker rm ${env.CONTAINER_NAME} || true
                        docker rmi ${env.DOCKER_IMAGE} || true
                    """
                }
            }
        }

        stage('Build Docker Image') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                unstash 'backend-files'
                
                dir('Backend') {
                    sh 'docker build -t ${env.DOCKER_IMAGE} .'
                }
            }
        }

        stage('Deploy Container') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                dir('Backend') {
                    sh """
                        docker run -d \
                            --name ${env.CONTAINER_NAME} \
                            -p ${env.PORT}:3000 \
                            --env-file .env \
                            ${env.DOCKER_IMAGE}
                    """
                    sh 'rm -f .env || true'
                    sh 'docker ps | grep ${env.CONTAINER_NAME} || true'
                }
            }
        }
    }

    post {
        success {
            node('built-in') {
                slackSend color: 'good', 
                         channel: '#pratibimb-backend-cicd',
                         tokenCredentialId: 'slack-token',
                         message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} deployed ${env.DOCKER_IMAGE}"
                cleanWs()
            }
        }
        failure {
            node('built-in') {
                slackSend color: 'danger', 
                         channel: '#pratibimb-backend-cicd',
                         tokenCredentialId: 'slack-token',
                         message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}"
                cleanWs()
            }
        }
    }
}