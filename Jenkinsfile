pipeline {
  agent any
  stages {
    stage('Docker Build') {
      steps {
        sh "docker build -t aguscuk/podinfo-dev:${env.BUILD_NUMBER} ."
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-aguscuk', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh "docker push aguscuk/podinfo-dev:${env.BUILD_NUMBER}"
        }
      }
    }
    stage('Docker Remove Image') {
      steps {
        sh "docker rmi aguscuk/podinfo-dev:${env.BUILD_NUMBER}"
      }
    }
    stage('Apply Kubernetes Files') {

        steps {
            script {
            if (env.GIT_BRANCH == 'origin/development') {
                withKubeConfig([credentialsId: 'cred-km-aks-lab01'])
                {
                    sh 'cat kube/deployment.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f - -n development'
                    sh 'cat kube/service.yaml | sed "s/{{NODE_PORT}}/30005/g" | kubectl apply -f - -n development'
                }
            }
            else if (env.GIT_BRANCH == 'origin/staging') {
                withKubeConfig([credentialsId: 'cred-km-aks-lab01'])
                {
                    sh 'cat kube/deployment.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f - -n staging'
                    sh 'cat kube/service.yaml | sed "s/{{NODE_PORT}}/31005/g" | kubectl apply -f - -n staging'
                }
            }
            else if (env.GIT_BRANCH == 'origin/master') {
                withKubeConfig([credentialsId: 'cred-km-aks-lab01'])
                {
                    sh 'cat kube/deployment.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f - -n production'
                    sh 'cat kube/service.yaml | sed "s/{{NODE_PORT}}/32005/g" | kubectl apply -f - -n production'
                }
            }
            else{}
            }
        }
    }
  }

}
