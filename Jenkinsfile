pipeline {
    agent none

    stages {
        stage('Checkout Code') {
            agent { label 'built-in' }
            steps {
                checkout scm
                stash name: 'backend-code', includes: '**/*'
            }
        }

        stage('Unstash Code') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                unstash 'backend-code'
            }
        }

        stage('Create .env File') {
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
                dir('Backend') {
                    sh '''
                        set -ex
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
                    '''
                }
            }
        }

        stage('Build & Health Check') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                dir('Backend') {
                    sh '''
                        set -ex

                        echo "Build new image"
                        docker build -t pratibimb-backend-temp .

                        echo "Start temporary test container"
                        docker run -d --name test-container -p 3001:3000 --env-file .env pratibimb-backend-temp

                        echo "Waiting up to 30s for container to start..."
                        max_wait=30
                        elapsed=0
                        while [ "$(docker inspect -f '{{.State.Running}}' test-container 2>/dev/null)" != "true" ]; do
                          sleep 1
                          elapsed=$((elapsed + 1))
                          if [ "$elapsed" -ge "$max_wait" ]; then
                            echo "❌ Container failed to start."
                            docker logs test-container || true
                            docker rm -f test-container || true
                            docker rmi pratibimb-backend-temp || true
                            rm -f .env || true
                            exit 1
                          fi
                        done

                        echo "Perform health check"
                        curl --fail http://localhost:3001/ || {
                          echo "❌ Health check failed. Cleaning up..."
                          docker rm -f test-container || true
                          docker rmi pratibimb-backend-temp || true
                          rm -f .env || true
                          exit 1
                        }
                    '''
                }
            }
        }

        stage('Replace Running Container') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                dir('Backend') {
                    sh '''
                        set -ex

                        echo "Stop & remove current running container"
                        docker stop pratibimb-backend || true
                        docker rm pratibimb-backend || true
                        docker rmi pratibimb-backend || true

                        echo "Tag new image as final"
                        docker tag pratibimb-backend-temp pratibimb-backend

                        echo "Remove test container"
                        docker rm -f test-container || true

                        echo "Run final container"
                        docker run -d --name pratibimb-backend -p 3000:3000 --env-file .env pratibimb-backend

                        echo "Cleanup temp image and .env"
                        docker rmi pratibimb-backend-temp || true
                        rm -f .env
                    '''
                }
            }
        }

        stage('Show Docker Status') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                sh '''
                    echo "✅ Docker containers:"
                    docker ps

                    echo "✅ Docker images:"
                    docker images
                '''
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
