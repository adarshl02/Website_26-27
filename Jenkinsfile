pipeline {
    agent any

    environment {
        // Global environment variables (non-sensitive)
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'

        // Sensitive variables loaded from credentials
        JWT_SECRET = credentials('jwt-secret')
        RAZORPAY_KEY_ID = credentials('razorpay-key-id')
        RAZORPAY_KEY_SECRET = credentials('razorpay-key-secret')
        NODEMAILER_PASSWORD = credentials('nodemailer-password')
        NODEMAILER_PASSWORD_1 = credentials('nodemailer-password-1')
        DB_USER = credentials('db-user')
        DB_PASSWORD = credentials('db-password')
        DB_HOST = credentials('db-host')
        DB_PORT = credentials('db-port')
        DB_NAME = credentials('db-name')
        EMAIL_USER = credentials('email-user')
        NODEMAILER_ADMIN = credentials('nodemailer-admin')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                        JWT_SECRET=${JWT_SECRET}
                        RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID}
                        RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET}
                        NODEMAILER_PASSWORD=${NODEMAILER_PASSWORD}
                        NODEMAILER_PASSWORD_1=${NODEMAILER_PASSWORD_1}
                        NODE_TLS_REJECT_UNAUTHORIZED=1
                        USER=${DB_USER}
                        PASSWORD=${DB_PASSWORD}
                        HOST=${DB_HOST}
                        PORT=${DB_PORT}
                        DATABASE=${DB_NAME}
                        REJECTUNAUTHORIZED=true
                        NODE_ENV=development
                        EMAIL_USER=${EMAIL_USER}
                        NODEMAILER_ADMIN=${NODEMAILER_ADMIN}
                        EOF
                    '''

                    // Build the Docker image
                    sh 'docker build -t pratibimb-backend .'
                }
            }
        }

        stage('Deploy Container') {
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
