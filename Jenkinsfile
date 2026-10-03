pipeline {
  agent any
  environment {
    REGISTRY = "sjc.vultrcr.com/vyoma-registry" 
  }
  stages {
    stage('Build sandboxd image') {
      when { changeset "sandboxd/**" }
      steps {
        dir('sandboxd') {
          sh "docker build -t ${REGISTRY}/sandboxd:${GIT_COMMIT} -t ${REGISTRY}/sandboxd:latest ."
        }
      }
    }
    stage('Push image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'vultr-registry-creds', usernameVariable: 'U', passwordVariable: 'P')]) {
          sh "echo $P | docker login ${REGISTRY} -u $U --password-stdin"
          sh "docker push ${REGISTRY}/sandboxd:${GIT_COMMIT}"
          sh "docker push ${REGISTRY}/sandboxd:latest"
        }
      }
    }
    stage('Deploy to VKE') {
      steps {
        withCredentials([file(credentialsId: 'vyoma-kubeconfig', variable: 'KCFG')]) {
          sh "kubectl --kubeconfig=$KCFG set image deployment/sandboxd sandboxd=${REGISTRY}/sandboxd:${GIT_COMMIT} -n vyoma-system"
          sh "kubectl --kubeconfig=$KCFG rollout status deployment/sandboxd -n vyoma-system"
        }
      }
    }
  }
}