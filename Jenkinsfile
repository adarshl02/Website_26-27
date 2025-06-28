pipeline{

    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'pwd'
                sh 'mkdir -p build'
                // Add your build commands here
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // Add your test commands here
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deployment commands here
            }
        }
    }
}