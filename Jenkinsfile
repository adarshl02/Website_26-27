pipeline {
    agent any

    environment {
        // Global environment variables (non-sensitive)
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // Checks out your GitHub repo
            }
        }

        stage('Cleanup Old Deployment') {
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
            steps {
                dir('Backend') {
                    // Write .env file using credentials
                    sh '''
                         cat <<EOF > .env
                            JWT_SECRET=asdfcjbhrfbrg
                            RAZORPAY_KEY_ID=rzp_live_jgWi5msqZ2nMVU
                            RAZORPAY_KEY_SECRET=YlHMEnETeIrokN6RAmhkuFW8
                            NODEMAILER_PASSWORD=zlsbvbbdljxxgrdv
                            NODEMAILER_PASSWORD_1=boztathibwfuuhdf
                            NODE_TLS_REJECT_UNAUTHORIZED=1
                            USER=avnadmin
                            PASSWORD=AVNS_gOyT1twqiOhbA3k0Ch_
                            HOST=pg-f13d087-teampratibimb-1cc2.f.aivencloud.com
                            PORT=21137
                            DATABASE=defaultdb
                            REJECTUNAUTHORIZED=true
                            NODE_ENV=development
                            EMAIL_USER=adarsh.landge10604@gmail.com
                            NODEMAILER_ADMIN=qgjwenhztvgqpqbo
                            EOF
                    '''

                    // Build the Docker image
                    sh 'docker build -t pratibimb-backend .'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                    // Run new container
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

            post {
                success {
                    slackSend color: 'good', message: "Deployed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                }
                failure {
                    slackSend color: 'danger', message: "Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        always {
            // Verify deployment
            sh 'docker ps | grep pratibimb-backend || true'

            // Clean workspace
            cleanWs()
        }
    }
}
