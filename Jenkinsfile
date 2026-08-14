pipeline {
    agent any

    environment {
        GHCR_IMAGE = 'ghcr.io/g3941813-svg/next14-r3f'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    def shortCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    echo "Building image: ${GHCR_IMAGE}:${shortCommit}"
                    sh "docker build -f dockerfile -t ${GHCR_IMAGE}:${shortCommit} ."
                    sh "docker tag ${GHCR_IMAGE}:${shortCommit} ${GHCR_IMAGE}:latest"
                    sh "docker push ${GHCR_IMAGE}:${shortCommit}"
                    sh "docker push ${GHCR_IMAGE}:latest"
                }
            }
        }

        stage('Update GitOps Repo') {
            steps {
                script {
                    def shortCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    sh """
                        export GIT_TERMINAL_PROMPT=0
                        rm -rf gitops-tmp
                        git clone https://github.com/g3941813-svg/next-r3f-ops.git gitops-tmp
                        cd gitops-tmp
                        sed -i 's|image: ghcr.io/g3941813-svg/next14-r3f:.*|image: ${GHCR_IMAGE}:${shortCommit}|' next-r3f.yaml
                        git config user.name "Jenkins CI"
                        git config user.email "ci@soominlab.com"
                        git add next-r3f.yaml
                        git commit -m "chore: update image tag to ${shortCommit}"
                        git push
                        cd .. && rm -rf gitops-tmp
                    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f || true'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully! Image pushed to GHCR and GitOps repo updated.'
        }
        failure {
            echo '❌ Pipeline failed. Check Jenkins logs for details.'
        }
    }
}