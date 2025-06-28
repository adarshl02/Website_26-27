pipeline {
    agent none // Start with no default agent
    
   environment {
        // Global environment variables (non-sensitive)
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'

        // Single secret file containing all credentials
        ENV_FILE = credentials('pratibimb-backend-env-file')
    }

    stages {
        stage('Checkout') {
            agent { label 'master' } // Run on Jenkins master
            steps {
                checkout scm
            }
        }

        stage('Prepare Build') {
            agent { label 'master' } // Run on Jenkins master
            steps {
                dir('Backend') {
                   // Copy the secret file to .env (it's automatically available at $ENV_FILE)
                    sh 'cp $ENV_FILE .env'
                    
                    // Archive the files to transfer to agent
                    stash includes: 'Backend/**', name: 'backend-files'
                }
            }
        }

        stage('Cleanup Old Deployment') {
            agent { label 'pratibimb-backend-deployer' } // Run on your second EC2 instance
            steps {
                script {
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                        docker rmi ${DOCKER_IMAGE} || true
                    """
                }
            }
        }

        stage('Build Docker Image') {
            agent { label 'pratibimb-backend-deployer' } // Run on your second EC2 instance
            steps {
                // Unstash the files on the agent
                unstash 'backend-files'
                
                dir('Backend') {
                    sh 'docker build -t pratibimb-backend .'
                }
            }
        }

        stage('Deploy Container') {
            agent { label 'pratibimb-backend-deployer' } // Run on your second EC2 instance
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
                }
            }
        }
    }

     post {
        success {
            slackSend color: 'good', message: "Deployed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        failure {
            slackSend color: 'danger', message: "Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        always {
            node('master') {
                // Clean workspace on master
                cleanWs()
            }
        }
    }

}