pipeline {
    agent none

    environment {
        DOCKER_IMAGE = 'pratibimb-backend'
        CONTAINER_NAME = 'pratibimb-backend'
        PORT = '3000'
    }

    stages {
        stage('Checkout & Stash Code') {
            agent { label 'built-in' }
            steps {
                checkout scm
                stash name: 'backend-code', includes: '**/*'
            }
        }

        stage('Build & Deploy') {
            agent { label 'pratibimb-backend-deployer' }
            environment {
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
                API_KEY = credentials('api-key')
                NODE_ENV = credentials('node-env')
            }
            steps {
                unstash 'backend-code'
                dir('Backend') {
                    sh '''
                        echo "Creating .env file"
                        cat <<EOF > .env
                        JWT_SECRET=$JWT_SECRET
                        RAZORPAY_KEY_ID=$RAZORPAY_KEY_ID
                        RAZORPAY_KEY_SECRET=$RAZORPAY_KEY_SECRET
                        NODEMAILER_PASSWORD=$NODEMAILER_PASSWORD
                        NODEMAILER_PASSWORD_1=$NODEMAILER_PASSWORD_1
                        NODE_TLS_REJECT_UNAUTHORIZED=1
                        USER=$DB_USER
                        PASSWORD=$DB_PASSWORD
                        HOST=$DB_HOST
                        PORT=$DB_PORT
                        DATABASE=$DB_NAME
                        REJECTUNAUTHORIZED=true
                        NODE_ENV=$NODE_ENV
                        EMAIL_USER=$EMAIL_USER
                        NODEMAILER_ADMIN=$NODEMAILER_ADMIN
                        API_KEY=$API_KEY
                        EOF

                        echo "Cleaning up old container/image"
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                        docker rmi $DOCKER_IMAGE || true

                        echo "Building Docker image"
                        docker build -t $DOCKER_IMAGE .

                        echo "Running container"
                        docker run -d --name $CONTAINER_NAME -p $PORT:3000 --env-file .env $DOCKER_IMAGE

                        rm -f .env
                        docker ps | grep $CONTAINER_NAME || true
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
                slackSend(color: 'good', channel: '#pratibimb-backend-cicd', tokenCredentialId: 'slack-token',
                    message: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
            }
        }
        failure {
            node('built-in') {
                slackSend(color: 'danger', channel: '#pratibimb-backend-cicd', tokenCredentialId: 'slack-token',
                    message: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
            }
        }
    }
}
