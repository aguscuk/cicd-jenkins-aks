pipeline {
  agent any
  stages {
    stage('Docker Build') {
      steps {
        sh "docker build -t aguscuk/podinfo:${env.BUILD_NUMBER} ."
      }
    }
  }
}
