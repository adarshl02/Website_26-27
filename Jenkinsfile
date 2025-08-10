pipeline {
    agent none

    stages {
        // Stage 1 – Checkout Code: It pulls the latest code from GitHub and stores it temporarily.
        stage('Checkout Code') {
            agent { label 'built-in' }
            steps {
                checkout scm
                stash name: 'backend-code', includes: '**/*'
            }
        }
        // Stage 2 – Deployment Server Prep: Moves the code to our backend deployment server.
        stage('Unstash Code') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                unstash 'backend-code'
            }
        }
        // Stage 3 – Create .env File: Securely injects environment variables from Jenkins credentials, 
        // so no secrets are hardcoded.
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
        //Stage 4 – Build & Health Check: Builds a Docker image, runs it temporarily, 
        // and performs a quick health check using curl to ensure it’s working before deploying.
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

                        echo "Waiting up to 10s for container to start..."
                        sleep 10
                       
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
       // Stage 5 – Replace Running Container: If the health check passes, it stops the old container, 
       // replaces it with the new one, and cleans up temp files/images.
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
        // Status Report: Shows running containers/images and does a final curl check.
        stage('Show Final Status') {
            agent { label 'pratibimb-backend-deployer' }
            steps {
                sh '''
                    echo "✅ Docker containers:"
                    docker ps

                    echo "✅ Docker images:"
                    docker images

                    echo "✅ Curling http://localhost:3000/"
                    curl --fail http://localhost:3000/ || echo "❌ Backend not responding on port 3000"
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


// "I built a Jenkins CI/CD pipeline that fully automates backend deployment. 
// It pulls code from GitHub, securely injects environment variables, builds a Docker image, runs a health check, 
// and if all good, replaces the old container with the new one without downtime.
//  Finally, it cleans up and sends a Slack notification. This ensures secure, fast, and reliable deployments 
//  with minimal manual work."
