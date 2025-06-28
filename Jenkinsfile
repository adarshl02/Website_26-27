pipeline {
    agent none

    environment {
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'
    }

    stages {
        stage('Checkout & Prepare') {
            agent { label 'built-in' }
            steps {
                checkout scm

                withCredentials([file(credentialsId: 'pratibimb-backend-env-file', variable: 'ENV_FILE')]) {
                    dir('Backend') {
                        sh '''
                            cp "$ENV_FILE" .env
                            chmod 600 .env
                        '''
                        stash name: 'backend-code', includes: '**/*', excludes: '.env'
                        stash name: 'env-file', includes: '.env'
                    }
                }
            }
        }

        stage('Clean Old Deployment') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                unstash 'backend-code'
                dir('Backend') {
                    sh '''
                        docker stop pratibimb-backend || true
                        docker rm pratibimb-backend || true
                        docker rmi pratibimb-backend || true
                    '''
                }
            }
        }

        stage('Build Image') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                unstash 'env-file'
                sh 'chmod 600 Backend/.env'
                dir('Backend') {
                    sh 'docker build -t pratibimb-backend .'
                }
            }
        }

        stage('Run Container') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                dir('Backend') {
                    sh '''
                        docker run -d \
                            --name pratibimb-backend \
                            -p 3000:3000 \
                            --env-file .env \
                            pratibimb-backend
                        rm -f .env
                        docker ps | grep pratibimb-backend || true
                    '''
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
                    message: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                )
            }
        }
        failure {
            node('built-in') {
                slackSend(
                    color: 'danger',
                    channel: '#pratibimb-backend-cicd',
                    tokenCredentialId: 'slack-token',
                    message: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                )
            }
        }
    }
}
