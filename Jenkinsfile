pipeline {
    agent any
    
    stages() {
        
        stage('Checkout') {
                steps {
                    checkout scmGit(branches: [[name: 'main']], 
                                    userRemoteConfigs: [[url: 'https://github.com/Lajancia/Next14-R3F']])
                }
            }

        stage('Docker Image Build') {
            steps {
                echo 'Docker building..'
                script {
                    sh 'docker build -t next14-r3f .'
                }
            }
        
        }

         stage('Run Docker Container') {
            steps {
                sh 'docker stop next-r3f || true'
                sh 'docker rm next-r3f || true'
                sh 'docker run -d --name next-r3f --network my-network next14-r3f'
            }
        }
   		// stage...
   	}
}