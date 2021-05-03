pipeline {
  agent any
  stages {
    stage('Docker Build') {
      steps {
          script {
              if (env.GIT_BRANCH == 'origin/development') {
                  sh "docker build -t aguscuk/podinfo-dev:${env.BUILD_NUMBER} ."
              }
              else if (env.GIT_BRANCH == 'origin/master') {
                  sh "docker build -t aguscuk/podinfo-prd:${env.BUILD_NUMBER} ."
              }
              else if (env.GIT_BRANCH == 'origin/staging') {
                  sh "docker build -t aguscuk/podinfo-stg:${env.BUILD_NUMBER} ."
              }
              else {}
          }
        
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-aguscuk', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
            script {
                if (env.GIT_BRANCH == 'origin/development') {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh "docker push aguscuk/podinfo-dev:${env.BUILD_NUMBER}"
                }
                else if (env.GIT_BRANCH == 'origin/master') {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh "docker push aguscuk/podinfo-prd:${env.BUILD_NUMBER}"
                }
                else if (env.GIT_BRANCH == 'origin/staging') {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                    sh "docker push aguscuk/podinfo-stg:${env.BUILD_NUMBER}"
                }
                else{}
            }
        }
      }
    }
    stage('Docker Remove Image') {
      steps {
          script {
              if (env.GIT_BRANCH == 'origin/development') {
                  sh "docker rmi aguscuk/podinfo-dev:${env.BUILD_NUMBER}"
              }
              else if (env.GIT_BRANCH == 'origin/master') {
                  sh "docker rmi aguscuk/podinfo-prd:${env.BUILD_NUMBER}"
              }
              else if (env.GIT_BRANCH == 'origin/staging') {
                  sh "docker rmi aguscuk/podinfo-stg:${env.BUILD_NUMBER}"
              }
              else{}
          }
        
      }
    }
    stage('Apply Kubernetes Files') {

        steps {
            script {
            if (env.GIT_BRANCH == 'origin/development') {
                withKubeConfig([credentialsId: 'cred-km-aks-lab01'])
                {
                    sh 'cat kube/deployment.yaml | sed "s/{{STAGE}}/dev/g" | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f - -n development'
                    sh 'cat kube/service.yaml | sed "s/{{NODE_PORT}}/30005/g" | kubectl apply -f - -n development'
                }
            }
            else if (env.GIT_BRANCH == 'origin/master') {
                withKubeConfig([credentialsId: 'cred-km-aks-lab01'])
                {
                    sh 'cat kube/deployment.yaml | sed "s/{{STAGE}}/prd/g" | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f - -n production'
                    sh 'cat kube/service.yaml | sed "s/{{NODE_PORT}}/32005/g" | kubectl apply -f - -n production'
                }
            }
            else if (env.GIT_BRANCH == 'origin/staging') {
                withKubeConfig([credentialsId: 'cred-km-aks-lab01'])
                {
                    sh 'cat kube/deployment.yaml | sed "s/{{STAGE}}/stg/g" | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f - -n staging'
                    sh 'cat kube/service.yaml | sed "s/{{NODE_PORT}}/31005/g" | kubectl apply -f - -n staging'
                }
            }
            else{}
            }
        }
    }
  }
}
