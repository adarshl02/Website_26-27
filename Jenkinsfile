pipeline {
    agent none
    
    environment {
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'
    }

    stages {
        stage('Checkout and Prepare') {
            agent { label 'built-in' }
            steps {
                checkout scm
                
                withCredentials([file(credentialsId: 'pratibimb-backend-env-file', variable: 'ENV_FILE')]) {
                    dir('Backend') {
                        // Simple file existence check instead of findFiles
                        sh '''
                            if [ ! -d . ]; then
                                echo "Backend directory not found!"
                                exit 1
                            fi
                            cp $ENV_FILE .env
                        '''
                        stash includes: '**/*', name: 'backend-files'
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
        always {
            node('built-in') {
                cleanWs()
            }
        }
        success {
            node('built-in') {
                slackSend(
                    color: 'good',
                    channel: '#pratibimb-backend-cicd',
                    tokenCredentialId: 'slack-token',
                    message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                )
            }
        }
        failure {
            node('built-in') {
                slackSend(
                    color: 'danger',
                    channel: '#pratibimb-backend-cicd',
                    tokenCredentialId: 'slack-token',
                    message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}"
                )
            }
        }
    }
}