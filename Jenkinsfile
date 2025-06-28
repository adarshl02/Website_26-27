pipeline {
    agent none // Start with no default agent
    
    stages {
        stage('Checkout') {
            agent { label 'built-in' }
            steps {
                withCredentials([file(credentialsId: 'pratibimb-backend-env-file', variable: 'ENV_FILE')]) {
                    checkout scm
                    
                    // Store environment variables for other stages
                    env.DOCKER_IMAGE = 'pratibimb-backend'
                    env.CONTAINER_NAME = 'pratibimb-backend'
                    env.PORT = '3000'
                    
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
                // Unstash the files on the agent
                unstash 'backend-files'
                
                dir('Backend') {
                    sh 'docker build -t pratibimb-backend .'
                }
            }
        }

        stage('Deploy Container') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                dir('Backend') {
                    sh '''
                        docker run -d \
                            --name pratibimb-backend \
                            -p 3000:3000 \
                            --env-file .env \
                            pratibimb-backend
                    '''
                    sh 'rm -f .env || true'
                    
                    // Verify deployment directly on the agent
                    sh 'docker ps | grep pratibimb-backend || true'
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
                         message: "Deployed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                cleanWs()
            }
        }
        failure {
            node('built-in') {
                slackSend color: 'danger', 
                         channel: '#pratibimb-backend-cicd',
                         tokenCredentialId: 'slack-token',
                         message: "Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                cleanWs()
            }
        }
    }
}