pipeline {
    agent any
    environment {
        USER_NAME = "rakshitsen"
        IMAGE_NAME = "expense"
    }
    stages {
        stage('Checkout & Build') {
            when {
                allOf {
                    branch 'main'
                    not { changeset "README.md" }
                    not { changeset "helm/**" }
                    not { changeset "k8s/**" }
                }
            }
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/Rakshitsen/Expense-Node-App.git'
                )
            }
        }

        stage('Build Image') {
            steps {
                echo "Docker image creating stage"
                sh 'docker build -t $USER_NAME/$IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Scan Image') {
            steps {
                echo "Docker image scanning stage"
                sh '''
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                    aquasec/trivy image $USER_NAME/$IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Push Image') {
            steps {
                echo "Docker image push stage"
                withCredentials([usernamePassword(credentialsId: 'Docker_cred', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh '''
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        docker push $USER_NAME/$IMAGE_NAME:$BUILD_NUMBER
                        docker logout
                    '''
                }
            }
        }

        stage('Update docker-compose file') {
            steps {
                echo "Update docker-compose file"
                sh 'sed -i "s|rakshitsen/expense:.*|rakshitsen/expense:${BUILD_NUMBER}|" docker/docker-compose.yml'
                sh 'sed -i "s|rakshitsen/expense:.*|rakshitsen/expense:${BUILD_NUMBER}|" k8s/app-deployment.yml'
            }
        }

        stage('Git Push') {
            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'Git_cred', gitToolName: 'Default')]) {
                    sh '''
                        git config --global user.email "rakshitsen1@gmail.com"
                        git config --global user.name "rakshitsen"
                        git checkout main
                        git add docker/docker-compose.yml
                        git add k8s/app-deployment.yml
                        git commit -m "Update compose and k8s/ file" || echo "No changes to commit"
                        git push origin main
                    '''
                }
            }
        }
    }
}
